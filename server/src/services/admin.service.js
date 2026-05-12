import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

// Get all admins
export const getAllAdmins = async () => {
  return await prisma.user.findMany({
    where: { role: "ADMIN", isDeleted: false },
    select: { id: true, name: true, email: true, createdAt: true },
  });
};

// Get all users (non-admin)
export const getAllUsers = async (filter = {}) => {
  return await prisma.user.findMany({
    where: { role: "USER", isDeleted: false, ...filter },
    select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
  });
};

// Promote user to admin
export const promoteUserToAdmin = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  if (user.role === "ADMIN") throw new Error("User is already an admin");

  return await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
    select: { id: true, name: true, email: true, role: true },
  });
};

// Demote admin to user
export const demoteAdminToUser = async (adminId) => {
  const admin = await prisma.user.findUnique({ where: { id: adminId } });
  if (!admin) throw new Error("Admin not found");
  if (admin.role === "USER") throw new Error("User is not an admin");

  return await prisma.user.update({
    where: { id: adminId },
    data: { role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  });
};

// Soft delete user
export const deleteUserAccount = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
    select: { id: true, name: true, email: true, isDeleted: true },
  });
};

// Restore user
export const restoreUserAccount = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: false },
    select: { id: true, name: true, email: true, isDeleted: true },
  });
};

// Get admin profile
export const getAdminProfile = async (adminId) => {
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!admin) throw new Error("Admin not found");
  return admin;
};

// Update admin profile
export const updateAdminProfile = async (adminId, data) => {
  const { name, email } = data;
  return await prisma.user.update({
    where: { id: adminId },
    data: { ...(name && { name }), ...(email && { email }) },
    select: { id: true, name: true, email: true, role: true },
  });
};

// Change admin password
export const changeAdminPassword = async (adminId, oldPassword, newPassword) => {
  const admin = await prisma.user.findUnique({ where: { id: adminId } });
  if (!admin) throw new Error("Admin not found");

  const match = await bcrypt.compare(oldPassword, admin.password);
  if (!match) throw new Error("Current password is incorrect");

  const hashed = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: { id: adminId },
    data: { password: hashed },
    select: { id: true, name: true, email: true },
  });
};
