const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 8018;

const app = express();

const mongoUtil = require("./config/db/mongodb.connection");

mongoUtil.connectToMongo((err, connection) => {
  if (err) {
    console.log("Connection error:", err);
  } else {
    console.log("DB Connection Success");
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    require("./routes/health/index.js")({ app: app });
    require("./routes/login/index.js")({ app: app });

    app.use(function (req, res, next) {
      next(createError(404));
    });

    app.use(function (err, req, res, next) {
      res.status(err.status || 500).json({ status: false });
    });

    app.listen(PORT, () => {
      console.log(`server is running under port ${PORT}`);
    });
    module.exports = app;
  }
});
