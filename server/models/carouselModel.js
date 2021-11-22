const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  slider: { type: String, required: true },
  slides: {type: Array}
}, {collection: "carouselData"});

module.exports = mongoose.model("Carousel", carouselSchema);
