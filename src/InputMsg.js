import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Input from "./Input";
import fileRecoil, { inputSet } from "./fileRecoil";

export default function InputMsg(props) {
  const [input, setInput] = useState("");
  const setSearch = useSetRecoilState(inputSet);
  let time = useRef(null);
  const form = useRef(null);
  const numNoKeys = [3, 8, 9, 12, 13, 16, 17, 18, 19, 20];
  const [fileContent, setFile] = useRecoilState(fileRecoil);
  const inputRef = useRef(null);
  let file = useRef(null);
  const handleChange = (v) => {
    setInput(v);
  };

  const handleOpenFile = () => {
    file.current.click();
  };

  const handleFileChange = useCallback(
    (e) => {
      console.log("fileContent ", fileContent);
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        console.log(reader.result);
        setFile({
          upload: true,
          path: reader.result,
          fileInfo: e.target.files[0],
        });
        props.change({
          upload: true,
          path: reader.result,
          fileInfo: e.target.files[0],
          form: form,
        });
      });

      reader.readAsDataURL(e.target.files[0]);
    },
    [fileContent, setFile, props]
  );

  useEffect(() => {
    file.current.addEventListener("change", handleFileChange);
  }, [handleFileChange, file]);

  const handleKeyUp = useCallback(
    ({ keyCode }) => {
      clearInterval(time.current);
      time.current = setTimeout(() => {
        if (props.write) {
          props.setWrite(false);
          console.log("no write...");
        }
      }, 500);
    },
    [time, props]
  );

  useEffect(() => {
    inputRef.current.addEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, inputRef, props.write]);

  const handleSend = useCallback(
    (e) => {
      e.preventDefault();
      if (input.trim() || fileContent.upload) {
        props.sendMsg(input);
        inputRef.current.focus();
        setFile({ upload: false, path: "" });
        props.change({ upload: false, path: "" });
        setInput("");
        setSearch("");
      }
    },
    [input, props, fileContent, setFile, setInput, setSearch]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const { keyCode } = event;
      if (!props.write && !numNoKeys.includes(keyCode)) {
        props.setWrite(true);
        console.log("write...");
      }
      if (keyCode === 13) {
        handleSend(event);
      }
    },
    [handleSend, props, numNoKeys]
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
          <form
            id="form"
            method="post"
            encType="multipart/form-data"
            ref={form}
          >
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              name="fichier"
              ref={file}
            />

            <i
              className="fa fa-paperclip attachment"
              aria-hidden="true"
              onClick={handleOpenFile}
            />
            <button className="submit" onClick={handleSend}>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
