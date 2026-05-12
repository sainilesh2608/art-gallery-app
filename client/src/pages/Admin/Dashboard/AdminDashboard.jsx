import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminManagement from "../AdminManagement/AdminManagement";
import UsersList from "../UsersList/UsersList";
import AdminProfile from "../AdminProfile/AdminProfile";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>✦ Abhigna Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "admins" ? "active" : ""}`}
            onClick={() => setActiveTab("admins")}
          >
            👥 Admin Management
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👤 Users List
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            ⚙️ My Profile
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "admins" && <AdminManagement />}
        {activeTab === "users" && <UsersList />}
        {activeTab === "profile" && <AdminProfile />}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard-section">
      <h1>Welcome to Admin Dashboard</h1>
      <p>Manage admins, users, and your profile from the sidebar.</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>👥 Admins</h3>
          <p>Manage admin accounts</p>
        </div>
        <div className="stat-card">
          <h3>👤 Users</h3>
          <p>View and manage user accounts</p>
        </div>
        <div className="stat-card">
          <h3>⚙️ Profile</h3>
          <p>Update your settings</p>
        </div>
      </div>
    </div>
  );
}
