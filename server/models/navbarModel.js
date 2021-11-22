const mongoose = require("mongoose");

const navbarSchema = new mongoose.Schema({
  id: {type: String, required: true},
  category: {type: String, required: true},
  name: {type: String, required: true},
  companies: [
      {type: String, required: true}
  ]
}, {collection: "navbarData"});

module.exports = mongoose.model("navBar", navbarSchema);
