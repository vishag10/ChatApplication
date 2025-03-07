import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

// Track online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    
    // Handle user login
    socket.on("user_connected", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit("user_status_changed", {
            userId: userId,
            status: "online"
        });
    });
    
    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        
        // Find and remove the disconnected user
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                io.emit("user_status_changed", {
                    userId: userId,
                    status: "offline"
                });
                break;
            }
        }
    });
    
    // The existing chat message handler
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
    
    // Handle typing indicator events
    socket.on("typing", (data) => {
        console.log("typing event:", data);
        
        // Broadcast typing status to the specific receiver
        if (data.receiverId && onlineUsers.has(data.receiverId)) {
            const receiverSocket = onlineUsers.get(data.receiverId);
            io.to(receiverSocket).emit("typing", data);
        } else {
            // If specific user not found, broadcast to all users
            // (in a real app you might want to be more selective)
            io.emit("typing", data);
        }
    });
});

export { io, app, server };