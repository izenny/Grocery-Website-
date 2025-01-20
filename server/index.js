const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const AddressRoutes = require("./Routes/AddressRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://grocerywebsites.netlify.app", // Ensure this matches your frontend URL
    // origin: "http://localhost:5174", // Ensure this matches your frontend URL

    // origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Add OPTIONS for preflight requests
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allow cookies to be sent with requests
  })
);
// app.use(cors());

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/order", OrderRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`connected to ${PORT} port`);
});
mongoose.connect(process.env.mongo_url).then(() => {
  console.log("connected to database");
});
