const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    console.log("You've reached the getThoughts");
    try {
      const thoughts = await Thought.find();
      console.log(thoughts);
      return res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      console.log(req.params.thoughtId);

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought, tie it to a user
  // tried the other (project2 way) of changing to json before sending res.

  async createThought(req, res) {
    try {
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });
      // create a thought._id
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch {
      (err) => res.status(500).json(err);
    }
  },
  // Delete a thought and reactions to it.
  async deleteThought(req, res) {
    // Delete user from DB
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      // Now we need to remove thought from any other connection, like reactions associated with it. mongoDB does not cascade/auto delete like mySQL. We can use a conditional ternary operator, same as an if else statement. If no thought respond with no thought, else find one thought and pull it.
      if (!thought) {
        res
          .status(404)
          .json({ message: "Someone already deleted this. Phew!" });
      } else {
        // delete reactions to the thought
        // PROBABLY WRONG
        Thought.updateMany(
          { _id: { $in: thought.reaction } },
          { $pull: { reaction: req.params.thoughtId } },
          { new: true }
        );

        // now lets try and delete this thought id from the user record.
        User.deleteOne({
          thought: req.params.thoughtId,
        });

        res.json({
          message:
            "Thought deleted from user and Reactions to thought deleted.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a thought by its _id;
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // find the thought by the id passed through in the params.
        { _id: req.params.thoughtId },
        // replace thoughtText in the user schema with the new value from the req.body we are passing in
        { thoughtText: req.body.thoughtText }
        // add the thought to that specific user ID.
      );
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      // new:true -- show the new thoughtText after completion
      res.status(200).json(thought);
      console.log(`Updated: ${thought}`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  // /api/thoughts/:thoughtId/reactions
  async addReaction(req, res) {
    try {
      console.log("You are adding a reaction");
      console.log(req.body, req.params.thoughtId);
      // working, provides ReactionBody and thought Id. Don't have reaction Id yet as it is created when the reaction body is added to this Thought.
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // we need to add the subdocument properties of thoughts, reaction. It has a reactionId, reactionBody, username, created at
        { $addToSet: { reactionBody: req.body } },
        { runValidators: true, new: true }
      );

      if (!newReaction) {
        res
          .status(404)
          .json({ message: "My bad... I'm not able to post your reaction :(" });
      }
      const reaction = newReaction.toJSON();
      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove reaction from a thought
  async deleteReaction(req, res) {
    try {
      console.log("You are deleting a reaction");
      console.log(req.body, req.params.thoughtId);

      const deleteReaction = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        // might be wrong, not sure how to pull in the reaction ID here.
        { $pull: { reactions: { reactionId: req.body.reactions.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!deleteReaction) {
        res
          .status(404)
          .json({ message: "We weren't able to delete your reaction :(" });
      }

      res.json(deleteReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
