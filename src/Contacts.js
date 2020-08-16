import React from "react";
import Contact from "./Contact";

export default function Contacts(props) {
    const users = props.users;
  return (
    <div id="contacts">
      <ul>
        {users.map((user,index)=>{
            const msgUser = props.chats.filter(c=>c.initiator === user._id || c.peer === user._id);
            const lastMsg = msgUser.length>0?msgUser[0].messages[msgUser[0].messages.length - 1 ]:null;
            return <Contact user={user} key={""+index} lastMsg={lastMsg !== null?lastMsg:""} chatWith={props.runChat}/>
        })}
      </ul>
    </div>
  );
}
