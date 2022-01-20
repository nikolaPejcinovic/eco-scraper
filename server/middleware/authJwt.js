// Utils
const jwt = require("jsonwebtoken");

// Config
const config = require("../config/auth.config.js");

// Constants
const { messages } = require("../constants/messages");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: messages.NO_TOKEN_MESSAGE });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: messages.UNAUTHORIZED_MESSAGE });
    }

    req.userId = decoded.id;

    next();
  });
}

module.exports = {
  verifyToken,
};
