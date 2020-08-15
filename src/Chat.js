import React from "react";
import Profile from "./Profile";
import Search from "./Search";
import Contacts from "./Contacts";
import Axios from "axios";
import "./css/reset.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./css/styles.css";
import ChatContent from "./ChatContent";
import {
  RecoilRoot
} from 'recoil';

class Chat extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      chatUser: true,
      chats: [],
      users: [
        { username: "Rolls", id: "1", online: true },
        { username: "Roys", id: "2", online: false },
        { username: "Fabrice", id: "3", online: true },
      ],
      chatWith: false,
      file:{}
    };
  }

  componentDidMount() {
    console.log("Chat mounted");
    Axios("http://localhost:5000/api/users", { method: "GET" }).then((r) => {
      console.log("users ", r);
      if (r.status === 200) {
        let users = r.data.filter((u) => u._id !== this.props.me.id);

        Axios("http://localhost:5000/api/allChats", { method: "GET" }).then(
          (r) => {
            if (r.status === 200) {
              let chats = r.data.filter(
                (c) =>
                  c.initiator === this.props.me.id ||
                  c.peer === this.props.me.id
              );
              this.setState({ chats });
              users = users.sort(this.orderUserWithMsgTime);
              this.setState({ users });
            }
          }
        );
      }
    });
  }

  handleChangeFile = (file)=>{
    this.setState({file})
  }

  handleSend = (content)=>{
    let chats = this.state.chats.slice();
    let fileInfo = {existFile:false,filePath:"",fileName:""};
    let chatUser = this.chatFilterForUser(this.state.chatWith._id,chats)
    if(this.state.file.fileInfo && this.state.file.fileInfo.name){
      fileInfo = {existFile:true,filePath:this.state.file.path,fileName:this.state.file.fileInfo.name}
    }
    let data = {
      send_by:this.props.me.id,
      content,
      date: new Date(),
      see:false,
      ...fileInfo
    }
    if(chatUser.length>0){  
      chatUser.push(data)
      
      this.updateUser();
    }else{
      chats.push({
        initiator:this.props.me.id,
        peer:this.state.chatWith._id,
        messages:[{...data}]
      })
    }
    console.log("new chats ",chats)
    this.setState({chats})
  }

  updateUser = ()=>{
    let users = this.state.users;
    users = users.sort(this.orderUserWithMsgTime)
    this.setState({users});
  }
  findIndexUser = (idUser) => {
    return this.state.chats.findIndex(filterChat(idUser));
  };

  chatFilterForUser = (idUser,chats=this.state.chats) => {
    if (this.findIndexUser(idUser) !== -1) {
      let msg = chats.filter(filterChat(idUser));

      return msg[0].messages;
    }
    return [];
  };

  orderUserWithMsgTime = (a, b) => {
    let chatA = this.chatFilterForUser(a._id);
    let chatB = this.chatFilterForUser(b._id);

    if (chatA.length > 0 && chatB.length > 0) {
      return new Date(chatA[chatA.length - 1].date) <
        new Date(chatB[chatB.length - 1].date)
        ? 1
        : -1;
    } else if (chatA.length > 0 && chatB.length === 0) {
      return 1;
    } else if (chatA.length === 0 && chatB.length > 0) {
      return -1;
    }
    return 0;
  };

  handleChatWith = (user) => {
    console.log("chat for ", user);
    this.setState({ chatWith: user });
  };
  render() {
    const { chatUser, users } = this.state;
    let user_s =
      chatUser === true
        ? users.filter((u) => this.findIndexUser(u._id))
        : users.filter((u) => this.findIndexUser(u._id) === -1);
    return (
      <RecoilRoot >
      <div id="frame">
        <div id="sidepanel">
          <Profile
            avatar={require("./images/mikeross.png")}
            username={this.props.me.username}
          />
          <Search />
          <Contacts
            users={user_s}
            chats={this.state.chats}
            runChat={this.handleChatWith}
          />
          <div id="bottom-bar">
            <button id="addcontact">
              <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
              <span>Ajouter un contact</span>
            </button>
            <button id="settings">
              <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
              <span>Paramètres</span>
            </button>
          </div>
        </div>
        <ChatContent user={this.state.chatWith} changeFile={this.handleChangeFile} chats={this.state.chats} sendMsg={this.handleSend}/>
      </div>
      </RecoilRoot>
    );
  }
}

function filterChat(idUser) {
  return (c) => c.peer === idUser || c.initiator === idUser;
}

export default Chat;
