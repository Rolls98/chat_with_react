import React from "react";
import moment from "moment"

export default function Message(props) {
  let myStyle = {
    width: "25px",
    height: "25px",
    display: "inline",
    "borderRadius": "inherit",
  };

  const formatFichier = (f, id, n = "") => {
    let doc = f.match(/\/?\w+\//);

    if (doc) {
      if (/\/?images?\//.test(doc[0]))
        return (
          <a href={f}>
            <img src={f} className="file" alt="" width="100%" height="100%" />
          </a>
        );
      if (/\/?(musics|audio)\//.test(doc[0]))
        return (
          <a href={f}>
            <audio controls>
              <source src={f} type="audio/mp3" />
            </audio>
          </a>
        );
      if (/\/?(videos|video)\//.test(doc[0]))
        return (
          <video controls width="100%">
            <source src={f} type="video/mp4" />
          </video>
        );

      return (
        <a href={f}>
          <img
            src={
              id !== props._id
                ? "http://localhost:5000/images/document-download-outline2.png"
                : "/images/document-download-outline.png"
            }
            alt=""
            style={myStyle}
          />
          <span>{n}</span>
        </a>
      );
    }
  };
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
