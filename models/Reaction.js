const { Schema, model, Types } = require("mongoose");
// separated out the reaction subdocument of thoughts. Could have put it inside the Thought.js file but this is more modular.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 500,
      minlength: 1,
      default: "Love this",
    },

    username: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    // need to add in a getter method to format the timestamp on query.
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// calling this function from createdAt inside this model Thought. Passing in the timestamp to convert it to standard JS Date type.
function formatDate(timestamp) {
  var date = new Date(timestamp);
  return date;
}

module.exports = reactionSchema;
