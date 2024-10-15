const Message = require("../models/Message");

function handlePeerMessage(context, username, room, text, __createtime__) {
  const socket = context.socket;
  Message.findOne({ room: room }).then((msg) => {
    if (msg) {
      msg.message.push({
        username: username,
        text: text,
        __createtime__: __createtime__,
      });
      msg
        .save()
        .then((room) => {
          socket.emit("chatroom_users", room.user);
          socket.broadcast.emit("chatroom_users", room.user);
          socket.emit("receiveMessage", room.message);
          socket.broadcast.emit("receiveMessage", room.message);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Error");
    }
  });
}

module.exports = {
  handlePeerMessage,
};
