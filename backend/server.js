import express, { json } from 'express';
import env from "dotenv"
import connection from './connection.js';
import router from './router.js';
import path from "path"
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from "cors"
import { app,server } from './socket.js';
env.config()

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);



app.use(cors())
app.use(express.static(path.join('../clientside')))
// app.get("*",(req,res)=>{
//     res.status(200).sendFile(path.join(__dirname,"../frontend/dist/index.html"))
// })
app.use(express.json({limit:"100mb"}))
app.use("/api",router)

connection().then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server started on port http://localhost:${process.env.PORT}`)
    })
})