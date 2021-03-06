const { User, Thought } = require("../models");

// Aggregate function to get the number of students overall
// const headCount = async () =>
//   Student.aggregate()
//     .count('studentCount')
//     .then((numberOfStudents) => numberOfStudents);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: studentId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {
  // Get all users
  // referenced in class code for sending data back in res.
  async getUsers(req, res) {
    try {
      const users = await User.find({})
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  // referenced in class code for sending data back in res.

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        res.status(404).json({ message: "No user with that ID" });

        return;
      } else {
        res.json({
          user,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  // tried the other (project2 way) of changing to json before sending res.

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(200).json(user);
    } catch {
      (err) => res.status(500).json(err);
    }
  },

  // Delete a user and delete their thoughts, remove them from their friends lists, and delete theirreactions
  async deleteUser(req, res) {
    // Delete user from DB
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      // Now we need to remove them from any other connections, mongoDB does not cascade/auto delete like mySQL. We can use a conditional ternary operator, same as an if else statement. If no user, respond with no user, else find one thought and pull that user id from it.
      if (!user) {
        res.status(404).json({ message: "No such user exists" });
      } else {
        // delete user from friends array.s
        User.updateMany(
          { _id: { $in: user.friend } },
          { $pull: { friend: req.params.userId } },
          { new: true }
        );
        // now lets try and remove thoughts from deleted user.

        Thought.deleteMany({
          username: user.username,
        });
        res.json({ message: "User and thoughts and friends deleted!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a user by its _id; can update username or email or both.
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // find the user by the id passed through in the params.
        { _id: req.params.userId },

        // replace username or email in the user schema with the new value from the req.body we are passing in
        { $set: { username: req.body.username, email: req.body.email } },
        { new: true }
      );
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add a friend to a user.

  async addFriend(req, res) {
    try {
      console.log("You are adding a friend");
      console.log(req.params);
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!newFriend) {
        res
          .status(404)
          .json({ message: "No friend or user found with that ID :(" });
      }
      console.log(newFriend);
      res.json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove friend from a user
  async deleteFriend(req, res) {
    try {
      console.log("You are deleting a friend");
      console.log(req.params.userId);

      const deleteFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends:  req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!deleteFriend) {
        res
          .status(404)
          .json({ message: "No friend or user found with that ID :(" });
      }

      res.json(deleteFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
