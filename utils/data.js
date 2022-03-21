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

const reactions = [
  "I like that",
  "That really stinks",
  "What is wrong with people?",
  "Why would you say that?",
  "You're my favorite!",
  "Games are the best",
  "I love dogs",
  "Let's agree to disagree",
  "Social media is not good for humanity",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () => {
  return getRandomArrItem(names);
};

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = () => {
  return getRandomArrItem(thoughtStrings);
};

const getFriends = () => {
  return getRandomArrItem(names);
};

const getReactions = () => {
  return getRandomArrItem(reactions);
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getFriends, getReactions };
