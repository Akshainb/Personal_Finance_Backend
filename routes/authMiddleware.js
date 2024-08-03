const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    req.userId = verify.userId;
    next();
  } catch (e) {
    return res.status(403).json({ msg: "Auth error" });
  }
}
module.exports = { authMiddleware };
