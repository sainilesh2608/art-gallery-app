import { useState, useEffect } from "react";
import api from "../../../api/axios";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/profile");
      setProfile(res.data.data);
      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setError("");
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put("/admin/profile/update", { name, email });
      setProfile(res.data.data);
      setSuccessMsg(res.data.message);
      setEditMode(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/admin/profile/change-password", {
        oldPassword,
        newPassword,
      });
      setSuccessMsg(res.data.message);
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (!profile && loading) return <p>Loading profile...</p>;

  return (
    <div className="admin-profile">
      <h2>⚙️ My Profile</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {profile && (
        <div className="profile-container">
          {/* Profile Info */}
          <div className="profile-section">
            <h3>Profile Information</h3>
            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Role:</strong> {profile.role}
                </p>
                <p>
                  <strong>Member Since:</strong>{" "}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
                <button
                  className="btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="profile-section">
            <h3>Security Settings</h3>
            <button
              className="btn-change-password"
              onClick={() => setShowPasswordModal(true)}
            >
              🔐 Change Password
            </button>
          </div>

          {/* Password Modal */}
          {showPasswordModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowPasswordModal(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword} className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-save"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setShowPasswordModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
