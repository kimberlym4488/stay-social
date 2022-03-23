const connection = require("../config/connection");
const { Thought, User } = require("../models");

const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("You're connected!");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Add users to the collection and await the results
  await User.insertMany(users);

  // Add thoughts to the collection and await the results
  // await Thought.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  // await User.collection.findOneAndUpdate({ id: users[0]._id });
  console.log("Users seeded")
  process.exit(0);
});
