const {
  registerUser,
  loginUser,
  authMiddleware,
  logoutUser,
} = require("../Controllers/AuthControllers");
const User = require("../Modals/UserSchema");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Auth check route with middleware
router.get("/authcheck", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name role email _id"); // Fetching user data by ID
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Authenticated User",
      user, // Return user data to the frontend
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

// router.get("/authcheck", authMiddleware, async (req, res) => {
//   try {
//     // Fetch the user from the database
//     const user = await User.findById(req.user.id).select("name role email _id");
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Authenticated User",
//       user, // Return user data to the frontend
//     });
//   } catch (error) {
//     console.error("Error in authcheck route:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while verifying the user",
//       error: error.message,
//     });
//   }
// });

router.post("/logout", logoutUser);

module.exports = router;
