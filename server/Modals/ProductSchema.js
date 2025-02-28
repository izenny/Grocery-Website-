const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productname: { type: String, required: true },
    productcode: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
