import {
  getAllAdmins,
  getAllUsers,
  promoteUserToAdmin,
  demoteAdminToUser,
  deleteUserAccount,
  restoreUserAccount,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../services/admin.service.js";

// Admin Management - Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Users Management - Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Promote user to admin
export const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: "userId is required" });

    const result = await promoteUserToAdmin(userId);
    res.status(200).json({ success: true, message: "User promoted to admin", data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Demote admin to user
export const demoteToUser = async (req, res) => {
  try {
    const { adminId } = req.body;
    if (!adminId) return res.status(400).json({ success: false, error: "adminId is required" });

    const result = await demoteAdminToUser(adminId);
    res.status(200).json({ success: true, message: "Admin demoted to user", data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete user (soft delete)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: "userId is required" });

    const result = await deleteUserAccount(userId);
    res.status(200).json({ success: true, message: "User account deleted", data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Restore user
export const restoreUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: "userId is required" });

    const result = await restoreUserAccount(userId);
    res.status(200).json({ success: true, message: "User account restored", data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get admin profile
export const getProfile = async (req, res) => {
  try {
    const profile = await getAdminProfile(req.user.id);
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Update admin profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await updateAdminProfile(req.user.id, { name, email });
    res.status(200).json({ success: true, message: "Profile updated", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, error: "Old and new password are required" });
    }

    const result = await changeAdminPassword(req.user.id, oldPassword, newPassword);
    res.status(200).json({ success: true, message: "Password changed successfully", data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
