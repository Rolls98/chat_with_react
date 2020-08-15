import React from "react";
import ButtonInput from "./FormInput";
import Avatar from "./images/avatar-01.jpg";


function Login(props) {
  const formLogin = {
    login: [
      { type: "text", name: "login", place: "Nom d'utilisateur" },
      { type: "password", name: "login_mdp", place: "Mot de passe" },
    ],
    sign: [
      { type: "text", name: "username", place: "Nom d'utilisateur" },
      { type: "email", name: "email", place: "Email" },
      { type: "password", name: "password", place: "Mot de passe" },
      {
        type: "password",
        name: "cfpassword",
        place: "Confirmez le mot de passe",
      },
    ],
  };

  return (
    <div className="container-login100">
      <div className="wrap-login100 p-t-190 p-b-30">
        <div className="login100-form-avatar">
          <img src={Avatar} alt="AVATAR" />
        </div>
        <span className="login100-form-title p-t-20 p-b-45">FreindShip</span>
        <form className="login100-form validate-form" method="post">
          {formLogin[props.type].map((input) => (
            <ButtonInput
              key={input.name}
              type={input.type}
              name={input.name}
              changeValue={props.Change}
              placeholderText={input.place}
              error={props.errors ? props.errors[input.name] : ""}
            />
          ))}
          <div className="container-login100-form-btn p-t-10">
            <input
              type="submit"
              className="login100-form-btn"
              value="Connexion"
              onClick={props.Click}
            />
          </div>
          <div className="text-center w-full p-t-25 p-b-230">
            <a href="/" className="txt1">
              Mot de passe oublié ?
            </a>
          </div>
          <div className="text-center w-full">
            <a className="txt1" href="/" onClick={props.log}>
              {props.type === "login"?"Créer un compte":"Connectez-vous"}
              <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
