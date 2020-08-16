import React from "react";

export default function Search() {
  return (
    <div id="search">
      <label hmtlfor="">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input type="text" placeholder="Rechercher un contact..." />
    </div>
  );
}
