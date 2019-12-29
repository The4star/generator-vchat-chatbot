const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  header: { type: String },
  image: { type: String },
  description: { type: String },
  link: { type: String },
  price: { type: String },
  entity: { type: String },
});

const Card = new mongoose.model("Card", CardSchema);

module.exports = Card;
