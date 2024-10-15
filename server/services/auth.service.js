const { verify } = require("jsonwebtoken");
const Message = require("../models/Message");

function handleLogin(context, username, room) {
  context.room = room;

  Message.findOne({ room: room }).then((msg) => {
    if (msg) {
      msg.user.push({ name: username });
      msg.save().then(() => {
        context.socket.emit("chatroom_users", msg.user);
        context.socket.broadcast.emit("chatroom_users", msg.user);
      });
    } else {
      const newMessage = new Message({
        room: room,
        user: [{ name: username }],
        message: [],
      });
      newMessage
        .save()
        .then(() => {
          context.socket.emit("chatroom_users", [{ name: username }]);
          context.socket.broadcast.emit("chatroom_users", [{ name: username }]);
        })
        .catch((err) => console.log(err));
    }
  });
}

module.exports = {
  handleLogin,
};
