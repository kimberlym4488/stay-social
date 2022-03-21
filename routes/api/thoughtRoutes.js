const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thought
router.route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thought/:thoughtId/reaction
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
