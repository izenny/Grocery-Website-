const User = require("../Modals/UserSchema");
const Product = require("../Modals/ProductSchema");
const Order = require("../Modals/OrderSchema");
const Address = require("../Modals/AddressSchema");
const Cart = require("../Modals/CartSchema");
// Helper function to calculate total price
const calculateTotalPrice = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += item.quantity * product.price;
  }
  return total;
};

// Add to order from cart
exports.addToOrder = async (req, res) => {
  const { id } = req.params; // User ID from URL
  const { items, totalPrice } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Find the product by its ID

    const order = new Order({
      user: id,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
    });

    // Save the order
    await order.save();
    await order.populate("items.product");

    // Return a success response
    res.json({
      success: true,
      message: "Order products added",
      order,
    });
  } catch (error) {
    // Return an error response
    res.json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};
//place order
exports.placeOrder = async (req, res) => {
  const { orderId } = req.params;
  const { shippingAddress, paymentMethod } = req.body; // Removed orderStatus from req.body since you're setting it to 'placed' directly
  console.log(shippingAddress, paymentMethod, orderId);

  // Validate required fields
  if (!shippingAddress || !paymentMethod) {
    return res.json({
      message: "All fields are required: shippingAddress and paymentMethod",
      success: false,
    });
  }

  try {
    const order = await Order.findById(orderId); // Fetch order by ID

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    const address = await Address.findById(shippingAddress);
    if (!address) {
      return res.json({
        success: false,
        message: "address not found",
      });
    }
    // Update the order details
    order.orderStatus = "placed"; // Set the order status to 'placed'
    order.shippingAddress = shippingAddress; // Update shipping address
    order.paymentMethod = paymentMethod; // Update payment method

    await order.save(); // Save the updated order
    // empty cart
    await Cart.findOneAndUpdate(
      { user: order.user }, // Find the user's cart
      { items: [] } // Empty the cart items
    );
    res.json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    // Handle errors
    res.json({
      message: "An error occurred while placing the order",
      success: false,
      error: error.message, // Send error message in the response
    });
  }
};

exports.fetchPlacedOrders = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch orders with status 'placed' for the user
    const orders = await Order.find({
      user: id,
      orderStatus: "placed",
    }).populate("items.product");

    // Return the orders if found
    res.json({
      message: "Placed orders fetched successfully",
      success: true,
      orders, // Return the orders in the response
    });
  } catch (error) {
    res.json({
      message: "An error occurred while fetching the orders",
      success: false,
      error: error.message, // Send error message in the response
    });
  }
};
