import styles from "./styles.module.css";
import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send-message", { username, room, text, __createdtime__ });
      setText("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
