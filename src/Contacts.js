import React from "react";
import Contact from "./Contact";
import {inputSet} from "./fileRecoil";
import { useRecoilValue } from "recoil";

export default function Contacts(props) {
  const input = useRecoilValue(inputSet)
  const users = props.users.map((user, index) => {
    const msgUser = props.chats.filter(
      (c) => c.initiator === user._id || c.peer === user._id
    );
    const msgNotSee = msgUser.length > 0?msgUser[0].messages.filter(m=>m.send_by === user._id && m.see === false):[];
    
    const lastMsg =
      msgUser.length > 0
        ? msgUser[0].messages[msgUser[0].messages.length - 1]
        : null;

    return (lastMsg && (input.trim() === "" || user.username.toLowerCase().includes(input.toLowerCase())) )? (
      <Contact
        user={user}
        key={"" + index}
        lastMsg={lastMsg !== null ? lastMsg : ""}
        chatWith={props.runChat}
        msgNotSee={msgNotSee}
      />
    ) : (
      ""
    );
  });
  return (
    <div id="contacts">
      <ul>
        {users.length === 0 && <p style={{textAlign:"center",marginTop:"80px"}}>Chargement...</p>}
        {users}
      </ul>
    </div>
  );
}
