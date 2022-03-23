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
router
  .route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thought/:thoughtId/reactions
router
  .route("/:thoughtId/reactions").post(addReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;
