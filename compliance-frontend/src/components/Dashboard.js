import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/form">Submit Compliance Form</Link></li>
          <li><Link to="/upload">Upload PDF</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
