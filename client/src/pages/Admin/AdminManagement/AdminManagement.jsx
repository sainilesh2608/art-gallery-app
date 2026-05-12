import { useState, useEffect } from "react";
import api from "../../../api/axios";
import "./AdminManagement.css";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAdmins();
    fetchUsers();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/list/admins");
      setAdmins(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/list/users");
      setUsers(res.data.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      setLoading(true);
      const res = await api.post("/admin/promote-to-admin", { userId });
      setSuccessMsg(res.data.message);
      fetchAdmins();
      fetchUsers();
      setShowPromoteModal(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to promote user");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoteAdmin = async (adminId) => {
    if (window.confirm("Demote this admin to user?")) {
      try {
        setLoading(true);
        const res = await api.post("/admin/demote-to-user", { adminId });
        setSuccessMsg(res.data.message);
        fetchAdmins();
        fetchUsers();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to demote admin");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-management">
      <h2>👥 Admin Management</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Current Admins */}
      <section className="admins-section">
        <h3>Current Admins ({admins.length})</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-demote"
                        onClick={() => handleDemoteAdmin(admin.id)}
                      >
                        Demote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Promote User Button */}
      <section className="promote-section">
        <button
          className="btn-promote"
          onClick={() => setShowPromoteModal(true)}
        >
          + Promote User to Admin
        </button>
      </section>

      {/* Promote Modal */}
      {showPromoteModal && (
        <div className="modal-overlay" onClick={() => setShowPromoteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select User to Promote</h3>
            <div className="users-list">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="user-item">
                    <div>
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <button
                      className="btn-select"
                      onClick={() => handlePromoteUser(user.id)}
                    >
                      Promote
                    </button>
                  </div>
                ))
              ) : (
                <p>No users available to promote</p>
              )}
            </div>
            <button
              className="btn-close"
              onClick={() => setShowPromoteModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
