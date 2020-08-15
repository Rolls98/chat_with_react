import React from "react";
import Input from "./Input"

function ButtonInput(props) {
   
    
  return (
    <div className="wrap-input100 validate-input m-b-10">
      <Input
        className="input100"
        name={props.name}
        type={props.type}
        onChange={props.changeValue}
        placeholderText={props.placeholderText}
      />
      <span className="focus-input100"></span>
      <span className="symbol-input100">
        <i className={props.type!=="password"?"fa fa-user":"fa fa-lock"}></i>
      </span>
      <p className="erreur" style={{color:"red"}}>
        {props.error}
      </p>
    </div>
  );
}

export default ButtonInput;
