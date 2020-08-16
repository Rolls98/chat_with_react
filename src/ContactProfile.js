import React from "react";

export default function ContactProfile(props) {
  return (
    <div className="contact-profile">
      <img src={require("./images/mikeross.png")} alt="" />
      <p>{props.username}</p>
      <div className="social-media">
        <i className="fa fa-facebook" aria-hidden="true" />
        <i className="fa fa-twitter" aria-hidden="true" />
        <i className="fa fa-instagram" aria-hidden="true" />
      </div>
    </div>
  );
}
