const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Try to get token from cookie
  const token =
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;