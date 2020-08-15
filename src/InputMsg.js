import React, { useState, useEffect, useCallback, useRef } from "react";
import {useRecoilState} from "recoil"
import Input from "./Input";
import fileRecoil from "./fileRecoil"

export default function InputMsg(props) {
  const [input, setInput] = useState("");
  const [fileContent,setFile] = useRecoilState(fileRecoil);
  const inputRef = useRef(null);
  let file = useRef(null);
  const handleChange = (v) => {
    setInput(v);
    
  };

  const handleOpenFile = ()=>{
      file.current.click();
  }

  const handleFileChange = useCallback((e)=>{
    console.log("fileContent ",fileContent);
    let reader = new FileReader()

    reader.addEventListener("load",()=>{
        console.log(reader.result);
        setFile({upload:true,path:reader.result,fileInfo:e.target.files[0]});
        props.change({upload:true,path:reader.result,fileInfo:e.target.files[0]});
    })

    reader.readAsDataURL(e.target.files[0])
  },[fileContent, setFile,props])

  useEffect(()=>{
      file.current.addEventListener("change",handleFileChange)
  },[handleFileChange,file])

  const handleSend = useCallback((e) => {
      e.preventDefault()
    if (input.trim()||fileContent.upload) {
      props.sendMsg(input);
      inputRef.current.focus();
      setFile({upload:false,path:""})
      props.change({upload:false,path:""})
      setInput("");
    }
  }, [input, props,fileContent,setFile,setInput]);

  const handleKeyDown = useCallback(
    (event) => {
      const { keyCode } = event;
      if (keyCode === 13) {
        handleSend(event);
      }
    },
    [handleSend]
  );

  useEffect(() => {
    let input = inputRef.current;
    input.addEventListener("keydown", handleKeyDown);
    return () => {
      input.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, inputRef]);

  return (
    <React.Fragment>
      <div className="message-input">
        <div className="wrap">
          <Input
            type="text"
            id="textSend"
            placeholderText="Tapez un message..."
            onChange={handleChange}
            value={input}
            inputRef={inputRef}
          />
          <form id="form" method="post" encType="multipart/form-data">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              name="fichier"
              ref={file}
            />

            <i className="fa fa-paperclip attachment" aria-hidden="true" onClick={handleOpenFile} />
            <button className="submit" onClick={handleSend}>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
