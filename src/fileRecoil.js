import { atom,
    } from "recoil";

const fileState = atom({
    key:"file_id",
    default:{upload:false,path:"",fileInfo:{}}
})

export const inputSet = atom({
    key:"input_id",
    default:""
})

export const dateState = atom({
    key:"date_id",
    default:null
})

export default fileState;