import React,{useRef,useEffect} from "react";
import Message from "./Message";
import Preview from "./PreviewImg"

import moment from "moment";

export default function Messages({ chats, _id,change }) {
  const messagesEndRef = useRef(null);
  const divRef = useRef(null);
  let date = null
  let show = true;
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [chats]);
  
  return (
    <div className="messages" ref={divRef}>
      <ul >
        {chats.length > 0 &&
          chats[0].messages.map((m,index) =>{
              if(date !== formatDate(m.date)){
                date = formatDate(m.date);
                show = true;
              }else{
                show = false;
              }
            return (
              <React.Fragment key={index}>
              {show === true && <li className="date" >{formatDate(m.date)}</li>}
              <Message
              msg = {m}
              content={m.content}
              key={m.date}
              class={m.send_by === _id ? "replies" : "sent"}
              _id={_id}
            />
            </React.Fragment>
            )
        })}
      </ul>
      <Preview change={change} />
      <div ref={messagesEndRef}/>
    </div>
  );
}


function formatDate(date) {
  let fr_date = moment(date).calendar();
  if (fr_date.includes("Today")) return "Aujourd'hui";
  if (fr_date.includes("Yesterday")) return "Hier";
  if (fr_date.includes("Monday")) return "Lundi";
  if (fr_date.includes("Tuesday")) return "Mardi";
  if (fr_date.includes("Wednesday")) return "Mercredi";
  if (fr_date.includes("Thursday")) return "Jeudi";
  if (fr_date.includes("Friday")) return "Vendredi";
  if (fr_date.includes("Saturday")) return "Samedi";
  if (fr_date.includes("Sunday")) return "Dimanche";
  let [m, j, a] = fr_date.split("/");
  return [j, m, a].join("/");
}
