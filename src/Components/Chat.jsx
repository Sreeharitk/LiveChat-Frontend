/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./chat.css"
import ScrollToBottom from "react-scroll-to-bottom";

// eslint-disable-next-line react/prop-types
function Chat({ socket, room, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // eslint-disable-next-line react/prop-types
      await socket.emit("send_message", messageData);
      setMessageList((List) => [...List, messageData]);
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "96svb",
        flexDirection: "column",
      }}
      className="chat-main"
    >
      <div className="chat-secondary p-3">
        <div className="bg-success text-center text-light rounded">
          <h2>Live Chat</h2>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="msg-container">
              {messageList.map((messageContent) => {
                return <div key={messageContent.author}> 
                    <div className="msg" id={username === messageContent.author?"you":"other"}>
                        <div className="msg-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="msg-meta">
                            <p>{messageContent.time}</p>
                            <p style={{marginLeft:"10px",fontWeight:"bold"}}>{messageContent.author}</p>
                        </div>
                    </div>
                    </div>;
              })}
          </ScrollToBottom>
        </div>
        <div className="mt-3">
          <div className="d-flex">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type here"
              className="form-control me-2"
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e)=>{e.key === "Enter" && sendMessage()}}
            />
            <button className="btn btn-warning" onClick={sendMessage}>
              &#9658;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
