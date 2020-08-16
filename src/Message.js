import React from "react";
import moment from "moment"

export default function Message(props) {
  let myStyle = {
    width: "25px",
    height: "25px",
    display: "inline",
    "borderRadius": "inherit",
  };
  let styleIcon = {
        /* color: white; */
        display: "inline",
        float: "right",
        width: "1.5rem",
        /* border: 1px solid red, */
        margin: "0",
        marginLeft: "4px",
        marginTop: "3px",
        /* fill: red, */
        filter: "invert(100%) sepia(0%) saturate(7499%) hue-rotate(184deg) brightness(111%) contrast(92%)",
        /* padding-top: 5px, */
        boxSizing: "border-box",
  }

  const formatFichier = (f, id, n = "") => {
    let doc = f.match(/\/?\w+\//);
    let host = f.includes("data:")?"":"http://localhost:5000"

    if (doc) {
      if (/\/?images?\//.test(doc[0]))
        return (
          <a href={f}>
            <img src={host+f} className="file" alt="" width="100%" height="100%" />
          </a>
        );
      if (/\/?(musics|audio)\//.test(doc[0]))
        return (
          <a href={f}>
            <audio controls>
              <source src={host+f} type="audio/mp3" />
            </audio>
          </a>
        );
      if (/\/?(videos|video)\//.test(doc[0]))
        return (
          <video controls width="100%">
            <source src={host+f} type="video/mp4" />
          </video>
        );

      return (
        <a href={f}>
          <img
            src={
              id !== props._id
                ? "http://localhost:5000/images/document-download-outline2.png"
                : "http://localhost:5000/images/document-download-outline.png"
            }
            alt=""
            style={myStyle}
          />
          <span>{n}</span>
        </a>
      );
    }
  };
  const icon = ( props.msg.see === true)?<img src="http://localhost:5000/images/icons/double-tick-indicator.svg" alt="" style={styleIcon}/>:<i className=" fa fa-check"></i>
  return (
    <li className={props.class}>
      <img src={require("./images/mikeross.png")} alt="" />
      <p>
        {props.msg.existFile === true &&
          formatFichier(
            props.msg.filePath,
            props.msg.send_by,
            props.msg.fileName
          )}
        {props.content}
        {props.msg.send_by !== props._id && icon}
      </p>
      <p className="time">{format_time(props.msg.date)}</p>
    </li>
  );
}

function format_time(date) {
  if (moment(date).isValid()) {
    return `${
      moment(date).hour() <= 9 ? "0" + moment(date).hour() : moment(date).hour()
      }:${
      moment(date).minute() <= 9
        ? "0" + moment(date).minute()
        : moment(date).minute()
      }:${
        moment(date).seconds() <= 9
          ? "0" + moment(date).seconds()
          : moment(date).seconds()
        }`;
  }
}
