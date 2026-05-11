// Decode JWT token and extract user info
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};
