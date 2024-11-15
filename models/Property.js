const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  picture: String,
}, { timestamps: true });

module.exports = mongoose.models.Property || mongoose.model('Property', propertySchema);
