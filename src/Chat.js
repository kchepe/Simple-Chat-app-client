import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = (props) => {
  const { socket, name, room } = props;
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
    setMessage("");
  };
  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div>
      <div>
        <div className="header">
          <h3>Live Chat</h3>
          <span>
            Room: <b>{room}</b>
          </span>
        </div>
        <div className="messageContainer">
          <ScrollToBottom className="scroll">
            {messageList.map((msg, i) => (
              <div
                key={i}
                className="message"
                style={{
                  display: "flex",
                  justifyContent:
                    name === msg.author ? "flex-end" : "flex-start",
                }}
              >
                <div>
                  <div
                    id={name === msg.author ? "you" : "other"}
                    className="messageContent"
                  >
                    <h3>{msg.message}</h3>
                  </div>
                  <div>
                    <p className="details">
                      {msg.author} {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="control">
          <input
            type="text"
            placeholder="Send Message here.."
            value={message}
            onChange={handleMessage}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
            className="msg"
          />
          <button onClick={sendMessage} className="sendBtn">
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
