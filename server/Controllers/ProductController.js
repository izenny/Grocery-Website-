const Product = require("../Modals/ProductSchema");
const multer = require("multer");
const path = require("path");
// const p = require("../../client/public");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public"));
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
}).single("image");
exports.addNewProduct = async (req, res) => {
  console.log("Create Product API called");
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image" });
    }
    const { productname, productcode, description, price, category, stock } =
      req.body;
    let imageFilename = null;
    if (req.file) {
      imageFilename = req.file.filename;
    }
    const product = new Product({
      productname,
      productcode,
      description,
      price,
      category,
      stock,
      image: imageFilename,
    });
    try {
      const newProduct = await product.save();
      console.log("Product created successfully");
      res.status(201).json(newProduct);
    } catch (error) {
      console.log("Error in creating product:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

//get product by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { type } = req.query;
    // console.log(type);
    
    const products =
      type === "all"
        ? await Product.find()
        : await Product.find({ category: type });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get product by id

exports.getProductsById = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete product by id

exports.deleteProductById = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    res.json({
      message: "product deleted successfully",
      succes: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to delete Product", success: false });
  }
};

// fetch low stock products
// $gt: Greater than
// $lte: Less than or equal to
// $gte: Greater than or equal to
// $eq: Equal to
// $ne: Not equal to
exports.lowStockProduct = async (req, res) => {
  const lowStockThreshold = 15;
  try {
    const lowStockProducts = await Product.find({
      stock: { $lt: lowStockThreshold },
    });
    if (!lowStockProducts || lowStockProducts.length === 0) {
      return res.status(404).json({
        message: "No products with low stock",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Low stock products fetched successfully",
      success: true,
      data: lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch low stock products",
      success: false,
      error: error.message,
    });
  }
};

//search product by name

exports.searchProductByname = async (req, res) => {
  const { search } = req.body;
  try {
    const products = await Product.find({
      $or: [
        { productname: { $regex: search, $options: "i" } },
        { productname: { $regex: search, $options: "i" } },
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No Products Found",
        succes: false,
      });
    }
    res.status(200).json({
      message: "Products found successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search for products",
      success: false,
      error: error.message,
    });
  }
};



// 1. Comparison Operators
// These operators allow you to filter documents based on comparisons.

// $eq: Matches values that are equal to a specified value.
// $ne: Matches values that are not equal to a specified value.
// $gt: Matches values that are greater than a specified value.
// $gte: Matches values that are greater than or equal to a specified value.
// $lt: Matches values that are less than a specified value.
// $lte: Matches values that are less than or equal to a specified value.
// $in: Matches any of the values specified in an array.
// $nin: Matches none of the values specified in an array.
// 2. Logical Operators
// These operators allow you to combine or negate conditions.

// $and: Joins query clauses with a logical AND. All conditions must be true.
// $or: Joins query clauses with a logical OR. Any condition can be true.
// $not: Inverts the effect of a query expression.
// $nor: Matches documents that fail all given conditions.
// 3. Element Operators
// These operators are used to check the existence of fields or the type of data in fields.

// $exists: Checks if a field exists or not.
// $type: Matches documents where the field is of a specified BSON type.
// 4. Evaluation Operators
// These operators provide advanced filtering options, including regular expressions and custom JavaScript expressions.

// $regex: Matches strings using regular expressions.
// $expr: Allows the use of aggregation expressions within the find query.
// $mod: Performs modulo operation and matches documents where a field's value matches the specified modulus.
// $text: Performs text search for text indexes.
// $where: Allows using JavaScript expressions to match documents.
// 5. Array Operators
// These operators help you work with arrays within documents.

// $all: Matches arrays that contain all specified elements.
// $elemMatch: Matches documents that contain an array field with at least one element that matches all conditions.
// $size: Matches arrays with a specified number of elements.
// 6. Bitwise Operators
// These operators match documents based on bitwise comparison of integers.

// $bitsAllClear: Matches if a specified bit position is clear in all positions.
// $bitsAllSet: Matches if a specified bit position is set in all positions.
// $bitsAnyClear: Matches if any bit positions are clear.
// $bitsAnySet: Matches if any bit positions are set.
// 7. Projection Operators
// Used to control which fields are returned in a query.

// $slice: Limits the number of elements in an array returned.
// $elemMatch: Projects only the first matching element in an array.
// 8. Update Operators
// These are used to modify documents.

// $set: Sets the value of a field.
// $unset: Removes a field.
// $inc: Increments the value of a field by a specified amount.
// $min and $max: Updates the field to a specified value if the specified value is less/greater.
// $rename: Renames a field.
// $push: Appends a value to an array.
// $pull: Removes values from an array that match a specified condition.
// $addToSet: Adds a value to an array only if it doesn’t already exist.
// 9. Aggregation Pipeline Operators
// Used within aggregation pipelines for complex data transformations.

// $match: Filters documents in a pipeline.
// $group: Groups documents by a specified expression.
// $project: Reshapes documents in a pipeline.
// $sort: Sorts documents in a pipeline.
// $limit: Limits the number of documents in a pipeline.
// Each operator serves a specific function in MongoDB and can often be combined to perform complex queries and modifications on documents.
