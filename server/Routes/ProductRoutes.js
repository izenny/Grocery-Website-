const {
  addNewProduct,
  getProductsByCategory,
  getProductsById,
  deleteProductById,
  lowStockProduct,
  searchProductByname,
} = require("../Controllers/ProductController");

const router = require("express").Router();

router.post("/addproduct", addNewProduct);
router.get("/getproductbycategory", getProductsByCategory);
router.get("/getproductbyid", getProductsById);
router.delete("/deleteproductbyid", deleteProductById);
router.get("/lowstocks", lowStockProduct);
router.get("/search", searchProductByname);


module.exports = router;