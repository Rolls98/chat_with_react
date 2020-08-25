import React from "react";
import { inputSet } from "./fileRecoil";
import { useRecoilState } from "recoil";
export default function Search(props) {
  const [input, setInput] = useRecoilState(inputSet);
  const handleChange = (e) => { setInput(e.target.value) }
  return (
    <div id="search">
      <label hmtlfor="">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input type="text" value={input} onChange={handleChange} placeholder="Rechercher un contact..." />
    </div>
  );
}
