// two separate schemas to help us build reactions into thoughts. I've split Reactions off from this into it's own schema and imported it here on line 3.
const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    // need to add in a getter method to format the timestamp on query.
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp),
    },
    // do I want username referencing the User.js model or just a string?
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// calling this getter function from createdAt inside this model Thought. Passing in the timestamp to convert it to standard JS Date type.
function formatDate(timestamp) {
  var date = new Date(timestamp);
  console.log(date.getTime());
  return date;
}

// export the data from this model into a variable, Thought. Import into models -> index.js
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
