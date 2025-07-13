const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  console.log('Authenticating request:', {
    path: req.path,
    method: req.method,
    headers: {
      authorization: req.headers.authorization ? 'Bearer token present' : 'No bearer token',
      contentType: req.headers['content-type']
    }
  });

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header found');
    return res.status(401).json({ message: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token found in authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'knotty');
    console.log('Token verified successfully:', {
      userId: decoded.user?.userId,
      role: decoded.user?.role
    });
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Token verification failed:', {
      error: error.message,
      name: error.name,
      stack: error.stack
    });
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  console.log('Authorizing admin access:', {
    userId: req.user?.userId,
    role: req.user?.role
  });

  if (!req.user) {
    console.log('No user object found in request');
    return res.status(403).json({ message: 'No user information found' });
  }

  if (req.user.role !== 'admin') {
    console.log('Non-admin user attempted to access admin route');
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }

  console.log('Admin access granted');
  next();
};

const authorizeCustomer = (req, res, next) => {
  console.log('Checking customer authorization for user:', req.user.role);
  if (req.user.role !== 'customer') {
    return res.status(403).json({ message: 'Access denied. Customer privileges required.' });
  }
  next();
};

const authorizeAdminOrCustomer = (req, res, next) => {
  console.log('Checking admin/customer authorization for user:', req.user.role);
  if (req.user.role !== 'admin' && req.user.role !== 'customer') {
    return res.status(403).json({ message: 'Access denied. Admin or customer privileges required.' });
  }
  next();
};

const authenticatedUser = (req, res, next) => {
  console.log('Checking authenticated user role:', req.user.role);
  const validRoles = ['admin', 'customer'];
  if (!validRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Valid user role required.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeCustomer,
  authorizeAdminOrCustomer,
  authenticatedUser
}; 