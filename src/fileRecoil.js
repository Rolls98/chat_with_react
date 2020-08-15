import { atom,
    } from "recoil";

const fileState = atom({
    key:"file_id",
    default:{upload:false,path:"",fileInfo:{}}
})

export const dateState = atom({
    key:"date_id",
    default:null
})

export default fileState;