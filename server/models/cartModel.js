const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      product: {
          company: { type: String, required: true },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          images: [{ type: String, required: true }],
          description: [{ type: Object }],
          category: { type: String, required: true },
          id: { type: String, required: true },
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
