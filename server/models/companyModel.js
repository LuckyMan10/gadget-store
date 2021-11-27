const mongoose = require("mongoose");

const Companies = new mongoose.Schema({
  company: {type: String, required: true},
  category: {type: String, required: true},
  logo: {type: String, required: true},
}, {collection: "companiesData"});

module.exports = mongoose.model("Companies", Companies);
