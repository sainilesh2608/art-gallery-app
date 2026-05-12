// Decode JWT token and extract user info
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Validate JWT format (should have 3 parts separated by dots)
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (err) {
    console.error("Failed to decode token:", err.message);
    // Clear invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    
    // Try to decode to verify it's valid
    JSON.parse(atob(parts[1]));
    return true;
  } catch (err) {
    console.error("Invalid stored token:", err.message);
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    return false;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
