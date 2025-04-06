import React from "react";
import { Link } from "react-router-dom";

const UserDashboardButton = () => {
  return (
    <Link to="/user-dashboard">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to User Dashboard
      </button>
    </Link>
  );
};

export default UserDashboardButton;
