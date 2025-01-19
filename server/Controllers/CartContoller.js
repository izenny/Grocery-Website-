const User = require("../Modals/UserSchema");
const Cart = require("../Modals/CartSchema");
const Product = require("../Modals/ProductSchema");

// create cart
exports.createCart = async (req, res) => {
  const { id } = req.params; // User ID
  const { product, price, quantity } = req.body;

  if (!id || !product || !price || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const productData = await Product.findById(product);
    if (!productData) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: id }); // Look for an existing cart
    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        user:id,
        items: [{ product, quantity, price, total: price * quantity }],
        subTotal: price * quantity, // Initialize subTotal
      });
    } else {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex((item) => item.product == product);
      if (itemIndex > -1) {
        // Update quantity and total if the product exists
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].total = cart.items[itemIndex].quantity * price;
      } else {
        // Add new product to the cart
        cart.items.push({ product, quantity, price, total: price * quantity });
      }

      // Recalculate the subtotal
      cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);
    }

    // Save the cart to the database
    await cart.save();
    await cart.populate("items.product");
    res.status(201).json({ success: true, message: "Cart created", cart });
  } catch (error) {
    console.error("Error in createCart:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.updateCart = async (req, res) => {
  const { id } = req.params; // User ID
  const { product, price, quantity } = req.body.cartData;
// console.log('cart update', id,product, price, quantity);


  if (!id || !product || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide valid inputs" });
  }

  try {
    // Fetch the cart for the user
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Find the product in the cart items
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === product);
    if (itemIndex > -1) {
      // Update quantity and total for the found item
      cart.items[itemIndex].quantity = quantity;

      // Optionally update the price if provided and different
      if (price && cart.items[itemIndex].price !== price) {
        cart.items[itemIndex].price = price;
      }

      // Update the total for the item
      cart.items[itemIndex].total = cart.items[itemIndex].quantity * cart.items[itemIndex].price;

      // Recalculate the cart subtotal
      cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);

      // Save the updated cart to the database
      await cart.save();
      await cart.populate("items.product");

      return res.status(200).json({ success: true, message: "Cart updated successfully", cart });
    } else {
      // Product not found in the cart
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error in updateCart:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.deleteCart = async (req, res) => {
  const { id } = req.params; // User ID

  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    cart.items = []; // Clear all items
    cart.subTotal = 0; // Reset subtotal

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({
      message: "An error occurred while clearing the cart",
      success: false,
      error: error.message,
    });
  }
};


exports.deleteItemFromCart = async (req, res) => {
  const { id } = req.params; // User ID
  const { productId } = req.body; // Product ID

  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1); // Remove item
      cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0); // Recalculate subtotal

      await cart.save();
      await cart.populate("items.product"); // Populate products
      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        cart,
      });
    } else {
      return res.status(404).json({
        message: "Item not found in cart",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error.message);
    res.status(500).json({
      message: "An error occurred while deleting the item",
      success: false,
      error: error.message,
    });
  }
};


exports.fetchCart = async (req, res) => {
  const { id } = req.params; // User ID
console.log("idd",id);

  try {
    const cart = await Cart.findOne({ user: id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        message: "Cart is empty",
        success: true,
        cart: { items: [], subTotal: 0 },
      });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching the cart",
      success: false,
      error: error.message,
    });
  }
};
