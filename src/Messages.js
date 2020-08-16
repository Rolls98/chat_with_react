import React from "react";
import Message from "./Message";

export default function Messages({ chats, _id }) {
  console.log("chats User ", chats);
  return (
    <div className="messages">
      <ul>
        {chats.length > 0 &&
          chats[0].messages.map((m) => (
            <Message
              content={m.content}
              key={m._id}
              class={m.send_by === _id ? "replies" : "sent"}
            />
          ))}
      </ul>
    </div>
  );
}
