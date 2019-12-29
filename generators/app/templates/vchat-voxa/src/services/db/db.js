const mongoose = require("mongoose");
require("dotenv").config();

const { dbConnection, db, options } = require("./utils/database-utils");

const connectToDb = () => {
  mongoose.connect(db, options, err => dbConnection(err));
};

const disconnectFromDb = () => {
  mongoose.disconnect(err => {
    if (err) {
      console.log(err);
    }
    console.log("DB disconnected.");
  });
};

module.exports = {
  connectToDb,
  disconnectFromDb,
};
