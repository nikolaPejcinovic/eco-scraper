// DB
const db = require("../models");

// Model
const User = db.user;

// Constants
const { messages } = require("../constants/messages");

function checkDuplicate(req, res, next) {
  User.findOne({
    username: req.body.username,
  }).exec((e, user) => {
    if (e) {
      return res.status(500).send({ message: e });
    }

    if (user) {
      return res.status(400).send({ message: messages.DUPLICATE_USER_MESSAGE });
    }

    next();
  });
}

module.exports = {
  checkDuplicate,
};
