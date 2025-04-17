import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { getLocalStorageItem } from "../../../contexts/ChatsContext";
import { useParams } from "react-router-dom";

const pusher = new Pusher("0910daad885705576961", {
  cluster: "ap2",
  encrypted: true,
});
  const token = getLocalStorageItem("auth-token");

  function FirstPusher() {
    const [messages, setMessages] = useState([]);
    const {workspaceId}   = useParams()
    const channel = pusher.subscribe(`user-${workspaceId}`);

  useEffect(() => {
  
    console.log({ token });
    channel.bind(`message`, (data) => {
      console.log({ data });
      // setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = (message) => {
    fetch("message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueName: channel.name, message, token: getLocalStorageItem('auth-token') }),
    })
  };

  return (
    <div>
      <h2 className="text-xl font-bold">First Pusher</h2>
      {/* {messages?.length > 0 && <h2 className='my-2'>Messages: </h2>} */}
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <input
        type="text"
        onKeyDown={(e) => e.key === "Enter" && sendMessage(e.target.value)}
        className="border-2 h-10 border-black "
      />
    </div>
  );
}

export default FirstPusher;


// // React component
// import axios from 'axios';
// import Pusher from 'pusher-js';
// import { useEffect, useState } from 'react';

// const pusher = new Pusher("0910daad885705576961", {
//   cluster: "ap2",
//   encrypted: true,
// });
// const FirstPusher = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const chatId = localStorage.getItem("chatId");

//     const channel = pusher.subscribe(`chat-${chatId}`);
//     channel.bind("new-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       pusher.unsubscribe(`chat-${chatId}`);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     const chatId = localStorage.getItem("chatId");

//     try {
//       await axios.post("http://localhost:8888/api/messages", {
//         message: newMessage,
//         userId,
//         chatId,
//       });
//       setNewMessage("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.text}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };
// export default FirstPusher;
