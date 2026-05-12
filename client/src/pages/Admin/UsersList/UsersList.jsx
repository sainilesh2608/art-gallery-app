import { useState, useEffect } from "react";
import api from "../../../api/axios";
import "./UsersList.css";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/list/users");
      setUsers(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Delete this user account?")) {
      try {
        const res = await api.post("/admin/delete-user", { userId });
        setSuccessMsg(res.data.message);
        fetchUsers();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete user");
      }
    }
  };

  const filteredUsers =
    filter === "active"
      ? users.filter((u) => !u.isDeleted)
      : users.filter((u) => u.isDeleted);

  return (
    <div className="users-list">
      <h2>👤 Users List</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active Users ({users.filter((u) => !u.isDeleted).length})
        </button>
        <button
          className={`filter-btn ${filter === "deleted" ? "active" : ""}`}
          onClick={() => setFilter("deleted")}
        >
          Deleted Users ({users.filter((u) => u.isDeleted).length})
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>
                    {filter === "active" ? (
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button className="btn-restore">Restore</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="no-data">No {filter} users found</p>
          )}
        </div>
      )}
    </div>
  );
}
