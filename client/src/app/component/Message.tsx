// SocketExample.js
import React, { SetStateAction, useEffect, useState } from "react";
import io from "socket.io-client";

const BaseUrl = "http://localhost:6001";

const Message = ({ userName }: { userName: string }) => {
  const [messages, setMessages] = useState<
    { userName: string; message: string }[]
  >([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io(BaseUrl);

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (msg) => {
      console.log("received message", msg);
      setMessages([...messages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const socket = io(BaseUrl);
    socket.emit("message", {
      userName,
      message,
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-md p-5 w-full h-screen sm:h-auto sm:w-96 space-y-2 shadow-md">
      <div className="h-full sm:h-96 overflow-auto space-y-3">
        {messages.map((message, index) => (
          <div
            className={`p-2 px-4 rounded-md text-sm ${
              message.userName === userName
                ? "bg-blue-500 text-white self-en w-fit rounded-tl-none mr-auto"
                : "bg-gray-300 text-black self-start w-fit rounded-tr-none ml-auto"
            }`}
            key={index}
          >
            <p className="font-bold">{message.userName}</p>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <form className="flex items-center justify-center space-x-3">
        <input
          type="text"
          placeholder="Message"
          className="border border-gray-600 rounded-md p-2 outline-none text-black w-full"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-md p-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;
