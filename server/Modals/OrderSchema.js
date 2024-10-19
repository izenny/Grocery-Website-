const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        _id: false  ,// Disable _id for each item in the items array
      },
     
    ],
    totalPrice: { type: Number },
    deliveryCharge: { type: Number },
    orderStatus: { type: String, enum: ["pending", "placed"], default: "pending" },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    shippingAddress: { type: mongoose.Schema.ObjectId,ref: "Address"},
    paymentMethod: { type: String , enum:["Cash on Delivery","Credit Card","Debit Card"] ,default:"Cash on Delivery"},
    paymentId: { type: String },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
