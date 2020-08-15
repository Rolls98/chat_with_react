import React from 'react'

export default function Contact(props){
    const user = props.user;
    const lastMsg = props.lastMsg; 
    console.log("props ",props);
    //const content = lastMsg.existFile && lastMsg.content ? ' ' + lastMsg.content : (lastMsg.existFile ? '<i class="fa fa-paperclip attachment" aria-hidden="true"></i> ' : lastMsg.content);
    return (
    <li className="contact" onClick={(e)=>{e.preventDefault();props.chatWith(user)}}>
    <div className="wrap">
      <span className={`contact-status ${user.online?"online":"busy"}`}></span>
      <img src={require("./images/mikeross.png")} alt="userPhoto" />
      <div className="meta">
        <p className="name">{user.username}</p>
        <p className="preview">{user.write && "écrit..."}{!user.write&&lastMsg.sendBy !== user._id ? "me: ":""}{!user.write&&lastMsg.existFile === true && <i className="fa fa-paperclip attachment" aria-hidden="true"></i>}{!user.write&&lastMsg.content !== "" ?lastMsg.content:!user.write&&lastMsg.fileName?lastMsg.fileName:""}</p>
      </div>
    </div>
  </li>)
}