import userSchema from "../models/user.model.js"

export async function getUserSidebar(req, res) {
    try {
        const logedUser_id=req.body._id;
        const filterdusers= await userSchema.find({_id:{$ne:logedUser_id}});
        res.status(200).send(filterdusers);
    } catch (error) {
        console.log(error);
        
    }
}