import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>
      <div>
        {roomUsers && <h5 className={styles.usersTitle}>Users:</h5>}
        {roomUsers && (
          <ul className={styles.usersList}>
            {roomUsers.map((user) => (
              <li
                style={{
                  fontWeight: `${user.name === username ? "bold" : "normal"}`,
                }}
                key={user.id}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
