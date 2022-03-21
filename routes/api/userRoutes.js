const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUser);

// /api/user/:userId
router
  .route("/:userId")
  .get(getSingleUser)
  .delete(deleteUser)
  .update(updateUser);

// /api/user/:userId/friend/:friendId
router.route("/:userId").post(addFriend).delete(deleteFriend);

module.exports = router;
