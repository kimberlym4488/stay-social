const connection = require("../config/connection");
const { User, Thought } = require("../models");
// const { getMaxListeners } = require("../models/Reaction");
const {
  getRandomName,
  getRandomThoughts,
  getFriends,
  getReactions,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users and the thoughts
  const users = [];

  const thoughts = [];

  const reactions = [];

  const usernames = [
    "Aaran",
    "Aarez",
    "Aarman",
    "Aaron",
    "Gillian",
    "Clark",
    "Jared",
    "Grace",
    "Kelsey",
    "Tamar",
  ];
  // Loop 5 times -- add users to the users array

  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];

    const email = `${username}.${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}@gmail.com`;

    const friends = getFriends();

    users.push({
      username,
      email,
      friends,
    });
  }

  // Get some random thought objects using a helper function that we imported from ./data
  for (let i = 0; i < 10; i++) {
    const thoughtsText = getRandomThoughts();
    const username = getRandomName();
    const reactions = getReactions();

    thoughts.push({
      thoughtsText,
      username,
      reactions,
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
