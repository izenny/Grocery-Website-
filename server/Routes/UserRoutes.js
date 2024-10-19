const {
  updateUser,
  fetchUserbyId,
  fetchAllUsers,
  fetchUserAddress,
  deleteUser,
} = require("../Controllers/UserController");

const router = require("express").Router();

router.put("/updateuser", updateUser);
router.get("/fetchuser/:id", fetchUserbyId);
router.get("/fetchusers", fetchAllUsers);
router.get("/fetchaddress/:id", fetchUserAddress);
router.delete("/deleteuser/:id", deleteUser);


module.exports = router;
