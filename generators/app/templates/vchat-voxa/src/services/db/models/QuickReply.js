const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuickReplySchema = new Schema({
  text: { type: String },
  payload: { type: String },
  link: { type: String },
  reactLink: { type: String },
  intent: { type: String },
});

const QuickReply = new mongoose.model("QuickReply", QuickReplySchema);

module.exports = QuickReply;
