const {
  addToCart,
  fetchCart,
  deleteItemFromCart,
  deleteCart,
} = require("../Controllers/CartContoller");

const router = require("express").Router();

router.post("/addtocart/:id", addToCart);
router.get("/fetchcart/:id", fetchCart);
router.delete("/deletecartitem/:id", deleteItemFromCart);
router.delete("/deletecart/:id", deleteCart);


module.exports = router;