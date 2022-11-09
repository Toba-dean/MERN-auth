const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError('Invalid Authentication.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const { userId } = payload;
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid Authentication.');
  }
}


module.exports = AuthMiddleware;