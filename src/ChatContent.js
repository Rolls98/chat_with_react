import React from "react";
import ContactProfile from "./ContactProfile";
import Messages from "./Messages";
export default function Content({ user, chats }) {
  const userChat =
    user !== false
      ? chats.filter((c) => c.initiator === user._id || c.peer === user._id)
      : [];
  
  return (
    <div className="content">
      <ContactProfile username={user !== false ? user.username : ""} />
      <Messages chats={userChat} _id={user._id} />
      <div className="message-input">
        <div className="wrap">
          <input type="text" id="textSend" placeholder="Tapez un message..." />
          <i className="fa fa-paperclip attachment" aria-hidden="true" />
          <button className="submit">
            <i className="fa fa-paper-plane" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
