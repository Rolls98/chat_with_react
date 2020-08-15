import React from "react";
import ContactProfile from "./ContactProfile";
import Messages from "./Messages";
import InputMsg from "./InputMsg"
export default function Content({ user, chats,sendMsg,changeFile,write,setWrite}) {
  const userChat =
    user !== false
      ? chats.filter((c) => c.initiator === user._id || c.peer === user._id)
      : [];
  
  return (
    <div className="content">
      <ContactProfile username={user !== false ? user.username : ""} />
      <Messages chats={userChat} _id={user._id} change={changeFile}  />
      {user._id !== undefined && <InputMsg sendMsg={sendMsg} change={changeFile}write={write}
            setWrite = {setWrite} />}
      </div>
  );
}
