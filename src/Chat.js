import React from "react";
import Profile from "./Profile";
import Search from "./Search";
import Contacts from "./Contacts";
import Axios from "axios";
import "./css/reset.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./css/styles.css";
import ChatContent from "./ChatContent";
import { RecoilRoot } from "recoil";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.ws = new WebSocket(`ws://localhost:5000/`)

    this.state = {

      chatUser: true,
      chats: [],
      usersOn: [],
      users: [],
      chatWith: false,
      file: {},
      write: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chats !== this.state.chats) {
      console.log("chat .............................")
      this.updateUser();
      this.handleSee(this.state.chatWith)
    }

  }

  componentDidMount() {
    this.ws.addEventListener("open", () => {
      console.log("socket connecté");
    });

    this.ws.addEventListener("message", ({ data }) => {
      let info = JSON.parse(data);
      let users = this.state.users.slice();
      let chats = this.state.chats.slice();

      console.log(info);
      switch (info.type) {
        case "users":
          console.log("user .............................")
          if (Array.isArray(info.users)) {
            this.setState({ usersOn: info.users });
          } else if (info.users) {
            let users = this.state.usersOn.slice();
            users.push(info.users);
            this.setState({ usersOn: users });
          }

          for (let user of users) {
            user.online = this.state.usersOn.includes(user._id) ? true : false;
            if (user.online === false) {
              if (user.write) delete user.write;
            }
          }
          this.setState({ users });

          break;
        case "typing":
          {
            let user = users.filter((u) => u._id === info.writer);
            user[0].write = true;
            this.setState({ users });
          }
          break;
        case "notyping":
          {
            let user = users.filter((u) => u._id === info.writer);
            delete user[0].write;
            this.setState({ users });
          }
          break;
        case "recv_message":
          {
            let chatUser = this.chatFilterForUser(info.msg.send_id, chats)
            if (chatUser.length > 0) {
              chatUser.push(info.msg.message);
            } else {
              chats.push({
                initiator: info.msg.send_id,
                peer: info.msg.recv_id,
                messages: [info.msg.message]
              })
            }

            this.setState({ chats });
          }
          break;
        case "seeMsg":
          let chatUser = this.chatFilterForUser(info.user, chats)
          for (let m of chatUser) {
            if (!m.see) {
              m.see = m.send_by === this.props.me.id ? true : m.see;
            }
          }
          this.setState({ chats });
          break;
        default:
      }
    });

    Axios("http://localhost:5000/api/users", { method: "GET" }).then((r) => {
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
              console.log("chats ", chats);
              this.setState({ chats });
              users = users.sort(this.orderUserWithMsgTime);
              console.log("users ", users);
              this.setState({ users });
              this.ws.send(
                JSON.stringify({ type: "connect", ...this.props.me })
              );
            }
          }
        );
      }
    });
  }

  handleChangeFile = (file) => {
    this.setState({ file });
  };
  handleWriter = (v) => {
    if (!this.state.write) {
      this.ws.send(
        JSON.stringify({
          type: "typing",
          data: { recv_id: this.state.chatWith._id, send_id: this.props.me.id },
        })
      );

    } else {
      this.ws.send(
        JSON.stringify({
          type: "notyping",
          data: { recv_id: this.state.chatWith._id, send_id: this.props.me.id },
        })
      );
    }
    this.setState({ write: v });
  };
  handleSend = async (content) => {
    let chats = this.state.chats.slice();
    let fileInfo = { existFile: false, filePath: "", fileName: "" };
    let chatUser = this.chatFilterForUser(this.state.chatWith._id, chats);
    if (this.state.file.fileInfo && this.state.file.fileInfo.name) {
      let file = await this.sendImage();
      fileInfo = {
        existFile: true,
        filePath: file.path,
        fileName: file.name,
      };

    }
    let data = {
      send_by: this.props.me.id,
      content,
      date: new Date(),
      see: false,
      ...fileInfo,
    };
    if (chatUser.length > 0) {
      chatUser.push(data);
    } else {
      chats.push({
        initiator: this.props.me.id,
        peer: this.state.chatWith._id,
        messages: [{ ...data }],
      });
    }
    this.ws.send(
      JSON.stringify({
        type: "send_message",
        data: {
          send_id: this.props.me.id,
          recv_id: this.state.chatWith._id,
          message: { ...data },
        },
      })
    );
    this.setState({ chats });
    if (!this.state.chatUser) {
      this.setState({ chatUser: !this.state.chatUser });
    }
  };

  sendImage = () => {
    return new Promise((next, reject) => {
      Axios("http://localhost:5000/api/uploadImage", {
        headers: {
          contentType: false,
          cache: false,
          processData: false,
        }, data: new FormData(this.state.file.form.current), method: "post"
      }).then(({ data }) => {

        data.file.path = data.file.path.replace("public", "")
        next(data.file);
      }).catch((err) => {
        reject(err);
      })
      /*
    $.ajax({
      method: "post",
      url: "/api/uploadImage",
      data: new FormData($("#form")[0]),
      contentType: false,
      cache: false,
      processData: false,
      success: ({ file }) => {
        file.path = file.path.replace("public", "")
        next(file);
      },
      error: (err) => {
        reject(err);
      }
    })*/
    })
  }

  updateUser = () => {
    let users = this.state.users;
    users = users.sort(this.orderUserWithMsgTime);
    this.setState({ users });
  };
  findIndexUser = (idUser, chats = this.state.chats) => {

    return chats.findIndex(filterChat(idUser));
  };

  chatFilterForUser = (idUser, chats = this.state.chats) => {
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

  handleSee = (user) => {
    let chats = this.state.chats.slice();
    let chatsForUser = this.chatFilterForUser(user._id, chats).filter(m => m.see === false && m.send_by === user._id)

    if (chatsForUser.length > 0) {
      for (let m of chatsForUser) {
        m.see = true;
      }
      this.setState({ chats })
      this.ws.send(JSON.stringify({ type: "seeMsg", data: { send_id: this.props.me.id, recv_id: user._id } }))
    }
  }

  handleAddUser = () => {

    this.setState({ chatUser: !this.state.chatUser });
  }

  handleChatWith = (user) => {
    this.setState({ chatWith: user });
    this.handleSee(user)
    console.log("this file ", this.state.file.upload)
    if (this.state.file.upload) {
      this.handleChangeFile({ upload: false, path: "" })
    }
  };
  render() {
    const { chatUser, users } = this.state;
    let chats = this.state.chats.slice();
    let user_s =
      chatUser === true
        ? users.filter((u) => this.findIndexUser(u._id, chats) > -1)
        : users.filter((u) => this.findIndexUser(u._id, chats) === -1);
    return (
      <RecoilRoot>
        <div id="frame">
          <div id="sidepanel">
            <Profile
              avatar={require("./images/mikeross.png")}
              username={this.props.me.username}
            />
            <Search addUser={this.handleAddUser} />
            <Contacts
              users={user_s}
              chats={this.state.chats}
              runChat={this.handleChatWith}
            />
            <div id="bottom-bar">
              <button id="addcontact" onClick={this.handleAddUser}>
                <i className="fa fa-user-plus fa-fw" aria-hidden="true" />{" "}
                <span>Ajouter un contact</span>
              </button>
              <button id="settings">
                <i className="fa fa-cog fa-fw" aria-hidden="true" />
                <span>Paramètres</span>
              </button>
            </div>
          </div>
          <ChatContent
            user={this.state.chatWith}
            write={this.state.write}
            setWrite={this.handleWriter}
            changeFile={this.handleChangeFile}
            chats={chats}
            sendMsg={this.handleSend}
            file={this.state.file}
          />
        </div>
      </RecoilRoot>
    );
  }
}

function filterChat(idUser) {
  return (c) => c.peer === idUser || c.initiator === idUser;
}



export default Chat;
