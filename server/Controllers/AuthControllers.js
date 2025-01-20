const User = require("../Modals/UserSchema");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
//register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: role || "customer",
    });
    await newUser.save();
    res.json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "Server error", error });
  }
};

//login

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({ message: "User Doesn't Exists", success: false });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({ message: "Incorrect Password", success: false });
    }
    const token = JWT.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        name: checkUser.name,
        role: checkUser.role,
      },
      process.env.JWTKEY,
      { expiresIn: "10hr" }
    );

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    res.cookie("token", token, cookieOption).json({
      message: "Login successfull",
      success: true,
      user: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
      },
    });

  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "Server error", error });
  }
};
//logout
exports.logoutUser = async (req, res) => {
    try {
      const cookieOption = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      };
      res
        .clearCookie("token", cookieOption)
        .json({ message: "Logged out successfully", success: true });
    } catch (error) {
      res.json({
        success: false,
        message: "some error occured",
        error,
      });
    }
  };

//auth middleware

// exports.authMiddleware = async (req, res, next) => {
//     const token = req.cookies.token;
//     // console.log(token);
    
//     if (!token)
//       return res.json({
//         success: false,
//         message: "Unauthorised user!",
//       });
//     try {
//       const decoded = JWT.verify(token, process.env.JWTKey);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.log(error);
      
//       res.json({
//         success: false,
//         message: "some error occured",
//         error,
//       });
//     }
//   };
  
exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    // Verify the token
    const decoded = JWT.verify(token, process.env.JWTKey);
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
