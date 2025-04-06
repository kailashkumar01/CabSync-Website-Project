import React, { useEffect, useState } from "react";

const Authenticate = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check session on page load
    fetch("http://localhost:5000/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <a href="http://localhost:5000/auth/google">Login with Google</a>
      )}
    </div>
  );
};

export default Authenticate;
