const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function authenticationMiddleware(req, res, next) {
  console.log('Cookie-based authentication middleware');
  
  const cookie = req.cookies;
  
  if (!cookie) {
    return res.status(401).json({ message: "No cookies provided" });
  }
  
  const token = cookie.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mytenomk');
    console.log("Token verified successfully:", {
      userId: decoded.user?.userId,
      role: decoded.user?.role
    });
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("JWT verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}; 