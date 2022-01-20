const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = require("./article.js")(mongoose);
db.user = require("./user.js")(mongoose);

module.exports = db;
