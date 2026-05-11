import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // optional stylesheet

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/signup");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/admin/signup");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/signup");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>CMS Admin Dashboard</h1>
        {user && (
          <p className="admin-welcome">
            Welcome, <strong>{user.role}</strong> (User ID: {user.id})
          </p>
        )}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-main">
        <section className="admin-section">
          <h2>Overview</h2>
          <p>This is your protected admin dashboard. Only users with role <code>ADMIN</code> can access this page.</p>
        </section>

        <section className="admin-section">
          <h2>Quick Actions</h2>
          <ul>
            <li>Manage Users</li>
            <li>View Orders</li>
            <li>Update Products</li>
            <li>Site Settings</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
