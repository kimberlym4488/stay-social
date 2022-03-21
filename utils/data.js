const { User } = require("../models");

const names = [
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

const thoughtStrings = [
  "Decision Tracker",
  "Find My Phone",
  "Learn Piano",
  "Starbase Defender",
  "Tower Defense",
  "Monopoly Money Manager",
  "Movie trailers",
  "Hello world",
  "Stupid Social Media App",
  "Notes",
  "Messages",
  "Email",
  "Compass",
  "Firefox",
  "Running app",
  "Cooking app",
  "Poker",
  "Deliveries",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () => `${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtStrings),
      username: getRandomArrItem(names),
    });
  }
  return results;
};

const getFriend = (int) => {
  const friend = [];
  for (let i = 0; i < int; i++) {
    friend.push({
      username: getRandomArrItem(names),
    });
  }
  return friend;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getFriend };
