import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    photo:{type:Array, required:true}
    

})
export default mongoose.model.USER||mongoose.model("USER",userSchema)
