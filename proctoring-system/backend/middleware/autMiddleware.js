// Example: Basic auth (replace with proper token-based auth)
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer admin-token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };