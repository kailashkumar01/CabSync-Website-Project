require('dotenv').config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // User model
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/newDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cookieParser());
app.use(express.json()); // Parse JSON body
app.use(
  cors({
    origin: "http://localhost:3001", // React frontend URL
    credentials: true, // Allow cookies
  })
);

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({ googleId: profile.id, name: profile.displayName });
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// 🔹 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: "30m" });
};

// 🔹 Google Login Route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google Callback
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }), 
  (req, res) => {
    const token = generateToken(req.user);

    // Store JWT in an HTTP-Only cookie (secure)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production (with HTTPS)
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    res.redirect("http://localhost:3001/authenticate"); // Redirect to frontend
  }
);

// 🔹 Verify JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded; // Attach user data
    next();
  });
};

// 🔹 Protected Route (Only if logged in)
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to Dashboard", user: req.user });
});

// 🔹 Logout (Clear JWT Cookie)
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
