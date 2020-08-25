import React, { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import fileRecoil from "./fileRecoil"


export default function Preview({ change, file }) {
  const setSrc = useSetRecoilState(fileRecoil)
  let fichier = useRef(null);
  const handleClose = () => {

    setSrc({
      upload: false,
      path: ""
    })
    change({
      upload: false,
      path: ""
    })
  }

  const formatFichier = (f) => {
    let doc = f.match(/\/?\w+\//);
    let host = f.includes("data:") ? "" : "http://localhost:5000"

    if (doc) {
      if (/\/?images?\//.test(doc[0]))
        return (
          <a href={f}>
            <img src={host + f} className="apercu" alt="" width="100%" height="100%" />
          </a>
        );
      if (/\/?(musics|audio)\//.test(doc[0]))
        return (
          <a href={f}>
            <audio controls>
              <source src={host + f} type="audio/mp3" />
            </audio>
          </a>
        );
      if (/\/?(videos|video)\//.test(doc[0]))
        return (
          <video controls width="100%">
            <source src={host + f} type="video/mp4" />
          </video>
        );

      return (
        <a href={f}>
          <embed className="apercu" src={
            host + f
          }></embed>
        </a>
      );
    }
  };

  useEffect(() => {
    if (file.upload) {
      fichier.current.style = "display:block;"
    } else {
      fichier.current.style = "display:none;"
    }
  }, [file.upload])
  return (<div className="fichier"
    style={
      {
        display: "none"
      }
    }
    ref={
      fichier
    } >

    {formatFichier(file.upload ? file.path : "")}
    {/* <img src={
      src.upload ? src.path : ""
    }
      className="apercu"
      alt=""
      width="100"
      height="100" /> */}
    <i className="fa fa-close"
      onClick={
        handleClose
      } > </i> </div>
  );
}