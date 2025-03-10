import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Layout from "../Layout/Layout";
import "./Dashboard.css";

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-buttons">
          <button onClick={() => history.push("/menu")}>Manage Menu</button>
          <button onClick={() => history.push("/viewOrders")}>
            View Orders
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
