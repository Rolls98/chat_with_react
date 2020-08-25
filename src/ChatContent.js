import React, { useEffect, useRef, useState } from "react";
import ContactProfile from "./ContactProfile";
import Messages from "./Messages";
import InputMsg from "./InputMsg"
export default function Content({ user, chats, sendMsg, changeFile, write, setWrite, file }) {
  const [chatsUser, setChatsUser] = useState([]);
  let limit = useRef(0)
  console.log("chats with parent ", chats);
  const userChat =
    user !== false
      ? chats.filter((c) => c.initiator === user._id || c.peer === user._id)
      : [];
  useEffect(() => {
    if (userChat.length > 0) {
      limit.current = 40;
      if (chatsUser.length === 0) {
        let chatsUser = [{ ...userChat[0] }];

        chatsUser[0].messages = chatsUser[0].messages.reverse().slice(0, 20);
        console.log("xchat : ", [{ ...userChat[0] }].reverse())
        setChatsUser(() => chatsUser);
      }
    }
  }, [userChat, chatsUser])

  useEffect(() => {
    console.log("client change....");
    setChatsUser([])
  }, [user]);

  const handleChargeMsg = (index) => {
    // let nsChat = userChat[0].messages.reverse().slice(index, 20).reverse();
    // console.log("index ", index);
    // console.log("new chat", nsChat);
    // if (userChat[0].messages.reverse().slice(index, 20).reverse().length > 0) {
    //   chatsUser[0].messages.push(...nsChat);
    // }
    console.log("chargement....")
    return new Promise((resolve, reject) => {
      let chatsUser = [{ ...userChat[0] }];

      let chatReverse = chatsUser[0]?.messages.reverse();
      console.log("chatuser ", chatReverse);
      let nsChat = chatReverse.slice(index, limit.current);
      console.log("index ", index);
      console.log("limit ", limit.current);
      console.log("new chat", nsChat);
      limit.current += 20;
      if (nsChat?.length > 0 && index <= chatsUser[0]?.messages?.length) {
        setChatsUser((chat) => {
          if (chat.length > 0) {
            let x = [{ ...chat[0] }]
            x[0].messages.unshift(...nsChat);
            console.log("chat set ", x);
            return x;
          }
        })

      }
    })

  }

  return (
    <div className="content">
      <ContactProfile username={user !== false ? user.username : ""} />
      <Messages chats={chatsUser} _id={user._id} change={changeFile} file={file} updateChat={handleChargeMsg} />
      {user._id !== undefined && <InputMsg sendMsg={sendMsg} change={changeFile} write={write}
        setWrite={setWrite} />}
    </div>
  );
}
