// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        total: { type: Number, required: true, min: 0 },
      },
    ],
    subTotal: {
      type: Number, // Total cost of all items in the cart
      default: 0,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
