const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MessageSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  user: [
    {
      name: {
        type: String,
        required: true,
      }
    }
  ],
  message: [
    {
      username: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      __createtime__: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  __createtime__: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
