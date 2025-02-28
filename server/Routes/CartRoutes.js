const {
  fetchCart,
  deleteItemFromCart,
  deleteCart,
  createCart,
  updateCart,
} = require("../Controllers/CartContoller");

const router = require("express").Router();

router.post("/addtocart/:id", createCart);
router.patch("/update/:id",updateCart)
router.get("/fetchcart/:id", fetchCart);
router.delete("/deletecartitem/:id", deleteItemFromCart);
router.delete("/deletecart/:id", deleteCart);


module.exports = router;