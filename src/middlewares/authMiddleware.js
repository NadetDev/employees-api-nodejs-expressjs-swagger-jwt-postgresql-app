const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { unauthorized, unauthorizedRole } = require('../utils/apiResponse');

// Protect routes - verify JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return unauthorized('Not authorized to access this route');  
  }

  try {
    const decoded = await User.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return unauthorized('Not authorized to access this route');  
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return unauthorizedRole(`User role ${req.user.role} is not authorized`)
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};
