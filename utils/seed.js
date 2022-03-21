const connection = require("../config/connection");
const { User, Thought } = require("../models");
// const { getMaxListeners } = require("../models/Reaction");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Get some random thought objects using a helper function that we imported from ./data
  const thoughts = getRandomThoughts(20);

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    console.log(username);
    const email = `${username}.${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}@gmail.com`;
    console.log(email);

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
