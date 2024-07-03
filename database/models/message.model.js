import { Schema, Types, model } from "mongoose";


let schema = new Schema({
content:String,
receiverId:{
    type:Types.ObjectId,
    ref:"User"
}
},{
    timestamps:{
        updatedAt:false
    },
    versionKey:false
})

export let Message = model("Message" , schema)