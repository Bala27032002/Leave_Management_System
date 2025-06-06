// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'abcd'); // secret key must match
//     req.user = decoded; // Attach decoded user info to request
//     next();
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authMiddleware;
