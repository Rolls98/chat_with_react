import React from "react";

function Profile(props) {
  return (
    <div id="profile">
      <div className="wrap">
        <img
          id="profile-img"
          src={props.avatar}
          className="online"
          alt=""
        />
        <p id="me">{props.username}</p>
        <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
        <div id="expanded">
          <label hmtlfor="twitter">
            <i className="fa fa-facebook fa-fw" aria-hidden="true"></i>
          </label>
          <input name="twitter" type="text" />
          <label hmtlfor="twitter">
            <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
          </label>
          <input name="twitter" type="text" />
          <label hmtlfor="twitter">
            <i className="fa fa-instagram fa-fw" aria-hidden="true"></i>
          </label>
          <input name="twitter" type="text" />
        </div>
      </div>
    </div>
  );
}

export default Profile;