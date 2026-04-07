const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check token presence
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4️⃣ Attach user info to request
    // request updated
    req.user = decoded;

    // 5️⃣ Proceed to next middleware or route
    next();

  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
