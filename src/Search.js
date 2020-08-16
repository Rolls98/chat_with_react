import React from "react";
import {inputSet} from "./fileRecoil";
import { useRecoilState } from "recoil";
export default function Search() {
  const [input,setInput] = useRecoilState(inputSet);
  return (
    <div id="search">
      <label hmtlfor="">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input type="text" value={input}  onChange={(e)=>{setInput(e.target.value)}} placeholder="Rechercher un contact..." />
    </div>
  );
}
