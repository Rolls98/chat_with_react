import React, { useEffect,useRef } from "react";
import {useRecoilState} from "recoil";
import fileRecoil from "./fileRecoil"

export default function Preview({change}) {
    const [src,setSrc] = useRecoilState(fileRecoil)
    let fichier = useRef(null);
    const handleClose = ()=>{
        setSrc({upload:false,path:""})
        change({upload:false,path:""})
    }
    useEffect(()=>{
        if(src.upload){
            fichier.current.style = "display:block;"
        }else{
            fichier.current.style = "display:none;"
        }
    },[src,fichier])
  return (
    <div className="fichier" style={{ display: "none" }} ref={fichier}>
        
      <img src={src.upload?src.path:""} className="apercu" alt="" width="100" height="100" />
      <i className="fa fa-close" onClick={handleClose}></i>
    </div>
  );
}
