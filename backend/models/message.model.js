import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    userfrom:{type:String, required:true},
    userto:{type:String, required:true},
    message:{type:String, required:true},
    time:{type:String, required:true},
    
})
export default mongoose.model.MESSAGE||mongoose.model("MESSAGE",messageSchema)
