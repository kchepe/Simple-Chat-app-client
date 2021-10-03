import React from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [showRoom, setShowRoom] = React.useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ name, room });
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowRoom((prevState) => !prevState);
    }
  };

  return (
    <div className="App">
      {!showRoom ? (
        <div className="login">
          <h2>CHAT SINGLE GIRLS IN YOUR AREA</h2>
          <div className="component">
            <input
              type="text"
              placeholder="Name here.."
              value={name}
              onChange={handleName}
              className="txt"
            />
          </div>
          <div className="component">
            <input
              type="text"
              placeholder="Room ID.."
              value={room}
              onChange={handleRoom}
              className="txt"
            />
          </div>
          <div>
            <button onClick={handleSubmit} className="btn">
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="chatContainer">
          <Chat socket={socket} name={name} room={room} />
        </div>
      )}
    </div>
  );
}

export default App;
