const mongoose = require("mongoose");

const favoriteListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  favoriteList: [
    {
      productId: { type: String},
    },
  ],
});

module.exports = mongoose.model("favoriteList", favoriteListSchema);
