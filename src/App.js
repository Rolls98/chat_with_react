import React, { Component } from "react";
import Login from "./Login";
import Index from "./Chat";
import Axios from "axios";


// import "./vendor/bootstrap/css/bootstrap.min.css";
// import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
// import "./vendor/animate/animate.css";
// import "./vendor/css-hamburgers/hamburgers.min.css";
// import "./vendor/select2/select2.min.css";
// import "./css/util.css";
// import "./css/main.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "login",
      formsInputs: {
        login: { login: "", login_mdp: "" },
        sign: { username: "", email: "", password: "", cfpassword: "" },
      },
      formError: { login: {}, sign: {} },
      me: {}
    };
  }

  handleChange = (v, t) => {
    let type = this.state.type;
    let forms = { ...this.state.formsInputs[type] };
    forms[t] = v;
    this.setState({ formsInputs: { [type]: forms } });
  };

  handleLog = (e) => {
    e.preventDefault();
    let type = this.state.type === "login" ? "sign" : "login";
    console.log("type here ", type);
    this.setState({ type });
  };

  handleClick = (e) => {
    e.preventDefault();
    let ok = true;
    let type = this.state.type;
    let forms = { ...this.state.formsInputs[type] };
    let errors = {};



    for (let el in forms) {
      if (forms[el].trim() === "") {
        ok = false;
        errors[el] = "ce champs ne doit pas etre vide";
      } else {
        errors[el] = "";
      }
    }
    if (type === "sign" && forms["password"] !== forms["cfpassword"]) {
      ok = false;
      errors["cfpassword"] = "le mot de passe ne correspond pas au premier";
    }

    this.setState({ formError: { [type]: errors } });

    if (ok) {
      // let t = type === "sign"?"login":"index"
      console.log(forms);

      Axios("http://localhost:5000/connexion", { method: "POST", data: { ...forms } })
        .then(r => {
          console.log(r)
          if (r.status === 200) {
            let data = r.data;
            console.log(data[type]);
            if (!data.success) {
              for (let el in data[type]) {
                errors[el] = data[type][el];
              }
              this.setState({ formError: { [type]: errors } });
            } else if (data.success === true) {
              this.setState({ me: data.user, type: "index" });
            }
          }

        }).catch((e) => {
          if (e.message === "Network Error") {
            console.log("Erreur: probleme de reseau\nconsigne:Veuillez verifier si le serveur est connecté")
          }
        })
    }


  };

  render() {
    const { formError, type } = this.state;
    return (
      <>
        {type === "index" ? (
          <Index me={this.state.me} />
        ) : (
            <div className="limiter">
              <Login
                Change={this.handleChange}
                errors={formError[type]}
                Click={this.handleClick}
                log={this.handleLog}
                type={type}
              />
            </div>
          )}
      </>
    );
  }
}

export default App;
