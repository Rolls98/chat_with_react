import React from "react";

function ButtonInput(props) {
    const handleChange = (e)=>{
        props.changeValue(e.target.value,props.name)
    }
    
  return (
    <div className="wrap-input100 validate-input m-b-10">
      <input
        className="input100"
        name={props.name}
        type={props.type}
        onChange={handleChange}
        placeholder={props.placeholderText}
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
