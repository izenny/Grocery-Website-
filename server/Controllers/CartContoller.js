const User = require("../Modals/UserSchema");
const Cart = require("../Modals/CartSchema");
const Product = require("../Modals/ProductSchema");

// Helper function to calculate total price
const calculateTotalPrice = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += item.quantity * product.price;
  }
  return total;
};

//add to cart and update cart quantity
// exports.addToCart = async (req, res) => {
//   const { id } = req.params;
//   const { productId, quantity  } = req.body;

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//     let cart = await Cart.findOne({ user: id });
//     if (!cart) {
//       cart = new Cart({
//         user: id,
//         items: [],
//         totalPrice: 0,
//       });
//     }
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         message: "product not found",
//         status: false,
//       });
//     }
//     const itemIndex = cart.items.findIndex(
//       (item) => item.product.toString() === productId
//     );
//     if (itemIndex > -1) {
//       const newQuantity = cart.items[itemIndex].quantity + quantity;
//       cart.items[itemIndex].quantity = Math.max(newQuantity, 0);
//       if (cart.items[itemIndex].quantity === 0) {
//         cart.items.splice(itemIndex, 1);
//       }
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     cart.totalPrice = await calculateTotalPrice(cart.items);

//     await cart.save();
//     await cart.populate('items.product')
//     res.json({
//       success: true,
//       message: "Cart updated succefully",
//       cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred",
//       success: false,
//       error: error.message,
//     });
//   }
// };
exports.addToCart = async (req, res) => {
  const { id } = req.params; // User ID
  const { productId, quantity } = req.body; // Product ID and quantity change

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({
        user: id,
        items: [],
        totalPrice: 0,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: false,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    // Check if the quantity after addition would exceed 10
    if (itemIndex > -1) {
      const newQuantity = cart.items[itemIndex].quantity + quantity;

      // Limit the quantity to a maximum of 10
      if (newQuantity > 10) {
        return res.json({
          message: "Cannot add more than 10 units of this product",
          success: false,
        });
      }

      cart.items[itemIndex].quantity = Math.max(newQuantity, 0);
      if (cart.items[itemIndex].quantity === 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      // New item
      if (quantity > 10) {
        return res.json({
          message: "Cannot add more than 10 units of this product",
          success: false,
        });
      }

      cart.items.push({ product: productId, quantity });
    }

    // Calculate total price after modifying cart items
    cart.totalPrice = await calculateTotalPrice(cart.items);

    await cart.save();
    await cart.populate("items.product"); // Populate products in cart
    res.json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

// UPDATE QUANTITY

// exports.updateCartQuantity = async (req, res) => {
//   const { id } = req.params;
//   const { productId, quantity } = req.body;
//   try {
//     const cart = await Cart.findOne({ user: id })
//     if (!cart) {
//       return res.status(404).json({
//         message: "Cart not found",
//         status: false,
//       });
//     }
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         message: "product not found",
//         status: false,
//       });
//     }
//     const itemIndex = cart.items.findIndex(
//       (item) => item.product.toString() === productId
//     );
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     cart.totalPrice = await calculateTotalPrice(cart.items);
//     await cart.save();

//     res.json({
//       message:"Cart Updated successfully",
//       success:true,
//       cart
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred",
//       success: false,
//       error: error,
//     });
//   }
// };

//fetch cart

exports.fetchCart = async (req, res) => {
  const { id } = req.params;
  // console.log("idd", id);

  try {
    const cart = await Cart.findOne({ user: id }).populate("items.product");
    if (!cart) {
      return res.status(404).json({
        message: "Empty Cart",
        success: true,
      });
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

// Delete item from cart
exports.deleteItemFromCart = async (req, res) => {
  const { id } = req.params; // User ID
  const { productId } = req.body;
  // console.log("idd", id);
  // console.log(productId);
  
  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      const product = await Product.findById(productId);

      cart.items.splice(itemIndex, 1);
      cart.totalPrice = await calculateTotalPrice(cart.items);

      await cart.save();
      await cart.populate("items.product"); // Populate products in cart
      return res
        .status(200)
        .json({ success: true, message: "Item removed from cart", cart });
    } else {
      return res
        .status(404)
        .json({ message: "Item not found in cart", success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

// Delete all items in the cart
exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.json({ message: "Cart not found" });
    }
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    await cart.populate("items.product"); // Populate products in cart
    res.status(200).json({ message: "cart deleted", cart });
  } catch (err) {
    console.log("Error deleting cart", err);
    res.json({ message: "Server error", err });
  }
};
