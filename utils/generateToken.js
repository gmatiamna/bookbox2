const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "abc123"; // Fallback to default for local development
const NODE_ENV = process.env.NODE_ENV || "development"; // Default to "development" if NODE_ENV is not set

exports.generateToken = (res, userId) => {
  // Create the JWT token with the userId payload
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d', // Token expiration set to 30 days
  });

  // Set the token as an HTTP-only cookie with security features
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents access to the cookie via JavaScript (mitigates XSS)
    secure: NODE_ENV !== 'development', // Set to true in production to ensure the cookie is sent over HTTPS
    sameSite: 'strict', // Helps mitigate CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set cookie expiration to 30 days (same as JWT expiration)
  });
};
