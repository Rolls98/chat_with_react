import React from "react"

export default function Input(props){
    const handleChange = (e)=>{
        props.onChange(e.target.value,props.name)
    }
    
    return <input
    className={props.className}
    name={props.name}
    type={props.type}
    onChange={handleChange}
    placeholder={props.placeholderText}
    id={props.id}
    value={props.value}
    ref={props.inputRef}
  />
}