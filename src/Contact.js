import React from 'react'

export default function Contact(props) {
  const user = props.user;
  const lastMsg = props.lastMsg;
  //const content = lastMsg.existFile && lastMsg.content ? ' ' + lastMsg.content : (lastMsg.existFile ? '<i class="fa fa-paperclip attachment" aria-hidden="true"></i> ' : lastMsg.content);
  return (
    <li className="contact" onClick={(e) => { e.preventDefault(); props.chatWith(user) }}>
      <div className="wrap">
        <span className={`contact-status ${user.online ? "online" : "busy"}`}></span>
        <img src={require("./images/mikeross.png")} alt="userPhoto" />
        <div className="meta">
          <p className="name">{user.username}</p>
          <p className="preview">{user.write === true && "écrit..."}{!user.write && lastMsg.send_by !== user._id && lastMsg !== "veuillez cliquer pour commencer un chat avec lui" ? "me: " : ""}{!user.write && lastMsg.existFile === true && <i className="fa fa-paperclip attachment" aria-hidden="true"></i>}{!user.write && lastMsg.content !== "" ? lastMsg.content || lastMsg : !user.write && lastMsg.fileName ? lastMsg.fileName : ""}</p>
          {props.msgNotSee.length > 0 && <p className="notif">{props.msgNotSee.length}</p>}
        </div>
      </div>
    </li>)
}