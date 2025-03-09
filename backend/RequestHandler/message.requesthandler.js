import userSchema from "../models/user.model.js"
import messageSchema from "../models/message.model.js"
import { io } from "../socket.js"
import { encrypt, decrypt } from "../utils/encryption.js" 

export async function getUserSidebar(req, res) {
    try {
        const logedUser_id = req.body._id;
        const filterdusers = await userSchema.find({ _id: { $ne: logedUser_id } });
        res.status(200).send(filterdusers);
    } catch (error) {
        console.log(error);
    }
}

export async function getMessage(req, res) {
    try {
        const { userfrom, userto } = req.body;
        const messages = await messageSchema.find({
            $or: [
                { userfrom: userfrom, userto: userto },
                { userfrom: userto, userto: userfrom }
            ]
        });

        
        const decryptedMessages = messages.map(msg => {
            return {
                ...msg._doc,
                message: decrypt(msg.message)
            };
        });

        res.status(201).send(decryptedMessages);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
}

export async function sendMessage(req, res) {
    try {
        const { time } = req.body;
        const { userfrom, userto } = req.body;
        
        
        const encryptedMessage = encrypt(req.body.message);
        
        const newMessage = await messageSchema.create({ 
            message: encryptedMessage,
            time, 
            userfrom, 
            userto 
        });
        
       
        const messageForSocket = {
            ...newMessage._doc,
            message: decrypt(newMessage.message)
        };
        
        io.emit('new message', {
            message: messageForSocket
        });
        
        res.status(201).send({ msg: "sended message" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
}