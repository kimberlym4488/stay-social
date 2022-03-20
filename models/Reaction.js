const { Schema, model, Types } = require("mongoose");

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
      default: timestamp.now(),
      get: formatDate,
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
function formatDate(createdAt) {
  var date = new Date(timestamp);
  return date;
}

module.exports = reactionSchema;
