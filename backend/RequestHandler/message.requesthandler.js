import userSchema from "../models/user.model.js"
import messageSchema from "../models/message.model.js"

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
        const message = await messageSchema.find({
            $or: [
                { userfrom: userfrom, userto: userto },
                { userfrom: userto, userto: userfrom }
            ]
        })

        res.status(201).send(message)

    } catch (error) {
        console.log(error);

    }
}

export async function sendMessage(req, res) {
    try {
        const { message, time } = req.body;
        const { userfrom, userto } = req.body;
        await messageSchema.create({ message, time, userfrom, userto }).then(() => {
            res.status(201).send({ msg: "sended message" })
        }).catch((err) => {
            res.status(500).send({ msg: err })
        })


    } catch (error) {
        console.log(error);

    }
}