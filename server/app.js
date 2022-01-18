const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongoose, url } = require("./models");

const app = express();

const corsOptions = {
  origin: [
    process.env.NODE_APP_ORIGIN_SERVER,
    process.env.NODE_APP_ORIGIN_CLIENT
  ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    const db = mongoose;

    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the database!");
  } catch (e) {
    console.log("Cannot connect to the database!", e);
    process.exit();
  }
})();

require("./routes/article.js")(app);

// set port, listen for requests
const PORT = process.env.NODE_APP_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
