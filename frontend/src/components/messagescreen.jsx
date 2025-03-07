import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import apiPath from "./apipath/apipath";
import axios from "axios";
import io from 'socket.io-client';

function MessageScreen({ selectedFriend, currentUserId }) {
    const [messageInput, setMessageInput] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const chatBoxRef = useRef(null);
    
    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(apiPath().replace('/api', ''));
        setSocket(newSocket);
        
        // Let the server know this user is online
        newSocket.emit('user_connected', currentUserId);
        
        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [currentUserId]);
    
    // Handle socket events for receiving messages and typing indicators
    useEffect(() => {
        if (!socket) return;
        
        // Listen for new messages
        socket.on('new message', (data) => {
            const newMessage = data.message;
            
            // Only add to chat if the message is relevant to this conversation
            if ((newMessage.userfrom === currentUserId && newMessage.userto === selectedFriend._id) ||
                (newMessage.userfrom === selectedFriend._id && newMessage.userto === currentUserId)) {
                setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
                // If we receive a message, the other user is no longer typing
                setIsTyping(false);
            }
        });
        
        // Listen for typing indicators
        socket.on('typing', (data) => {
            if (data.userId === selectedFriend._id && data.receiverId === currentUserId) {
                setIsTyping(data.isTyping);
            }
        });
        
        return () => {
            socket.off('new message');
            socket.off('typing');
        };
    }, [socket, currentUserId, selectedFriend._id]);
    
    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [receivedMessages, isTyping]);
    
    // Handle typing event
    const handleTyping = (e) => {
        setMessageInput(e.target.value);
        
        // Send typing indicator to server
        if (socket) {
            socket.emit('typing', {
                userId: currentUserId,
                receiverId: selectedFriend._id,
                isTyping: true
            });
            
            // Clear previous timeout
            if (typingTimeout) clearTimeout(typingTimeout);
            
            // Set a new timeout to stop the typing indicator after 2 seconds of inactivity
            const timeout = setTimeout(() => {
                socket.emit('typing', {
                    userId: currentUserId,
                    receiverId: selectedFriend._id,
                    isTyping: false
                });
            }, 2000);
            
            setTypingTimeout(timeout);
        }
    };
    
    // Function to send a message
    const handleMessageSend = async () => {
        try {
            if (!messageInput.trim()) return; // Don't send empty messages
            
            // Clear typing indicator when sending a message
            if (socket && typingTimeout) {
                clearTimeout(typingTimeout);
                socket.emit('typing', {
                    userId: currentUserId,
                    receiverId: selectedFriend._id,
                    isTyping: false
                });
            }
            
            const messageData = {
                userfrom: currentUserId,
                userto: selectedFriend._id,
                message: messageInput,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            const res = await axios.post(`${apiPath()}/sendmessage`, messageData);
            
            if (res.status === 201) {
                // Clear the input field after successful send
                setMessageInput("");
            }
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };
    
    // Function to get messages
    const getMessages = async () => {
        try {
            // Create proper request body object
            const requestData = {
                userfrom: currentUserId,
                userto: selectedFriend._id
            };
            
            const res = await axios.post(`${apiPath()}/getmessage`, requestData);
            
            if (res.status === 201) {
                setReceivedMessages(res.data);
            }
        } catch (error) {
            console.log("Error fetching messages:", error);
        }
    };
    
    // Fetch messages when component mounts or selectedFriend changes
    useEffect(() => {
        if (selectedFriend && selectedFriend._id) {
            getMessages();
        }
    }, [currentUserId, selectedFriend._id]);
    
    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="chat-header flex items-center p-4 border-b border-gray-200 bg-white">
                <img 
                    src={selectedFriend.photo && selectedFriend.photo[0] ? selectedFriend.photo[0] : "/api/placeholder/50/50"}
                    alt={selectedFriend.username}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <div className="font-semibold text-gray-800">{selectedFriend.username}</div>
                    <div className="text-xs text-gray-500">
                        {isTyping ? (
                            <span className="text-teal-500 animate-pulse">typing...</span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

            <div ref={chatBoxRef} className="chatbox flex-1 p-4 overflow-y-auto flex flex-col">
                {receivedMessages.map((msg, index) => (
                    <div 
                        key={index}
                        className={`message ${msg.userfrom === currentUserId ? 'self-end' : 'self-start'} flex max-w-[70%] mb-4`}
                    >
                        {msg.userfrom !== currentUserId && (
                            <div className="mr-2">
                                <img 
                                    src={selectedFriend.photo && selectedFriend.photo[0] ? selectedFriend.photo[0] : "/api/placeholder/30/30"} 
                                    alt="Friend" 
                                    className="w-8 h-8 rounded-full border border-teal-200" 
                                />
                            </div>
                        )}
                        <div>
                            <div 
                                className={`message-bubble px-4 py-2 rounded-2xl text-sm shadow-sm ${
                                    msg.userfrom === currentUserId 
                                        ? 'bg-teal-500 text-white' 
                                        : 'bg-white text-gray-800'
                                }`}
                            >
                                {msg.message}
                            </div>
                            <div className={`message-time text-xs text-gray-400 mt-1 ${
                                msg.userfrom === currentUserId ? 'text-right' : ''
                            }`}>
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Typing indicator in the chat */}
                {isTyping && (
                    <div className="message self-start flex max-w-[70%] mb-4">
                        <div className="mr-2">
                            <img 
                                src={selectedFriend.photo && selectedFriend.photo[0] ? selectedFriend.photo[0] : "/api/placeholder/30/30"} 
                                alt="Friend" 
                                className="w-8 h-8 rounded-full border border-teal-200" 
                            />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm shadow-sm">
                            <div className="typing-indicator flex space-x-1">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Message Input */}
            <div className="message-input flex items-center p-3 bg-white border-t border-gray-200">
                <div className="input-actions flex">
                    <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <input 
                    type="text"
                    value={messageInput}
                    onChange={handleTyping}
                    onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
                    placeholder="Type a message..."
                    className="flex-1 mx-2 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <button 
                    onClick={handleMessageSend}
                    className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2 ml-2 transform transition-all duration-300 hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default MessageScreen;