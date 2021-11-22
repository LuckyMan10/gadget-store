const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  company: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  description: [{ type: Object }],
  category: { type: String, required: true },
  id: { type: String, required: true },
}, {collection: "gadgets"});

module.exports = mongoose.model("product", productSchema);
