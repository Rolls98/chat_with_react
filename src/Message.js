import React from "react";

export default function Message(props){

    return (
        <li className={props.class}>
          <img src={require("./images/mikeross.png")} alt="" />
          <p>
            {props.content}
          </p>
        </li>
    )
}