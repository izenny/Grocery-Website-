const User = require("../Modals/UserSchema");

// User update
exports.updateUser = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const { id } = req.params;

  try {
    const checkUser = await User.findByIdAndUpdate(
      id, // ID is the first argument
      { name, email, phone, address }, // Fields to update
      { new: true } // Options to return the updated document
    );

    if (!checkUser) {
      return res.json({ message: "User not found", success: false });
    }

    res.json({
      message: "User updated successfully",
      success: true,
      user: checkUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

// fetch user

exports.fetchUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

//fetch all users

exports.fetchAllUsers = async (req, res) => {
  try {
    // Fetch all users, excluding the 'password' field
    const users = await User.find().select("-password");

    if (!users) {
      return res.json({ message: "No users found", success: false });
    }

    // Return the users list without passwords
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

//fetch address
exports.fetchUserAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("address phone"); // Only fetch the address field

    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    res.json({ success: true, address: user.address, phone: user.phone });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};

// password update

//delete user by id

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.json({
        message: "user not found",
        success: false,
      });
    }
    res.json({
      message: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error.message,
    });
  }
};
