const { Schema, model, Types } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },

    email: {
      type: String,
      required: "E-mail address is required",
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
        "Please enter a valid email address",
      ],
    },
    // Array of _id values referencing the *thought* model.
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    //  Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
// Create a virtual property `friendCount` that retrieves the length of the friends array field on query.

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return friends.length();
  });

const User = model("user", userSchema);

module.exports = User;
