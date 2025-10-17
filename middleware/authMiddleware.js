const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"
      if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use env var
      req.user = decoded;

      
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = auth;
