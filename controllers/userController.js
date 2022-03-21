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
      const users = await User.find();
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  // referenced in class code for sending data back in res.

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
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
      const user = await User.create({ ...req.body });
      const newUser = user.toJSON();
      res.status(200).json(newUser);
    } catch {
      (err) => res.status(500).json(err);
    }
  },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    // Delete user from DB
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId })(
        // Now we need to remove them from any other connections, mongoDB does not cascade/auto delete like mySQL. We can use a conditional ternary operator, same as an if else statement. If no user, respond with no user, else find one thought and pull that user id from it.
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              // check lingo, may need to be 'user' or uppercase 'User'
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
        // may have to use if else here. Will test.
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: "User deleted, but no thoughts found",
              })
            : res.json({ message: "User and thourhgts successfully deleted" })
        );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a user by its _id;
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // find the user by the id passed through in the params.
        { _id: req.params.userId },
        // replace username or email in the user schema with the new value from the req.body we are passing in

        [{ username: req.body.username }, { email: req.body.email }],
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Updated: ${result}`);
          } else {
            console.log("Uh Oh, something went wrong");
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

// // Add an assignment to a student - Example from class project if I need it for other routes.

// addAssignment(req, res) {
//   console.log("You are adding an assignment");
//   console.log(req.body);
//   Student.findOneAndUpdate(
//     { _id: req.params.studentId },
//     { $addToSet: { assignments: req.body } },
//     { runValidators: true, new: true }
//   )
//     .then((student) =>
//       !student
//         ? res
//             .status(404)
//             .json({ message: "No student found with that ID :(" })
//         : res.json(student)
//     )
//     .catch((err) => res.status(500).json(err));
// },
// // Remove assignment from a student
// removeAssignment(req, res) {
//   Student.findOneAndUpdate(
//     { _id: req.params.studentId },
//     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//     { runValidators: true, new: true }
//   )
//     .then((student) =>
//       !student
//         ? res
//             .status(404)
//             .json({ message: "No student found with that ID :(" })
//         : res.json(student)
//     )
//     .catch((err) => res.status(500).json(err));
// },
