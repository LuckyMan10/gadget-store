const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  slider: { type: String, required: true },
  slides: [
    {type: String, required: true},
  ],
}, {collection: "gadgets"});

module.exports = mongoose.model("carousel", carouselSchema);
