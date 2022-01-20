// Config
const config = require("../config/auth.config");

// DB
const db = require("../models");

// Model
const User = db.user;

// Utils
const jwt = require("jsonwebtoken");

// Constants
const { messages } = require("../constants/messages");

exports.signup = (req, res) => {
  const user = new User({ username: req.body.username });

  user.save((e) =>
    e
      ? res.status(500).send({ message: e })
      : res.send({ message: messages.USER_REGISTRATION_MESSAGE_SUCCESS })
  );
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username }).exec((e, user) => {
    if (e) {
      return res.status(500).send({ message: e });
    }

    if (!user) {
      return res.status(404).send({ message: messages.USER_NOT_FOUND_MESSAGE });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  });
};
