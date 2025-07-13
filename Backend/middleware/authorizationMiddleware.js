module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    console.log('Authorization check for user:', req.user?.role);
    
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const userRole = req.user.role;
    const validRoles = ['admin', 'customer'];
    
    if (!validRoles.includes(userRole)) {
      return res.status(403).json({ message: "Invalid user role" });
    }
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied. Insufficient privileges." });
    }
    
    next();
  };
}; 