// middleware/auth.js
const { getUser } = require('../service/auth');

function restrictToLoggedinUserOnly(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = authHeader.split(' ')[1];
  const user = getUser(token);
  
  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  
  req.user = user;
  next();
}

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const user = getUser(token);
    req.user = user;
  }
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};