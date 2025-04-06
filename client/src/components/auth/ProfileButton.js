import React from "react";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <Link to="/profile">
      <button 
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Go to Profile</button>
    </Link>
  );
};

export default ProfileButton;
