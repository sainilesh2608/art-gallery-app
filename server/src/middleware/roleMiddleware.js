import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if role is required and if user has the role
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export const adminOnly = protect(["ADMIN"]);
export const userOnly = protect(["USER"]);
