import React, { useState } from 'react';

function MessageScreen({ selectedFriend }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        
        if (message.trim()) {
            console.log('Sending message:', message);
            setMessage(''); 
        }
    };

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
                    <div className="text-xs text-gray-500">Online</div>
                </div>
            </div>

            
            <div className="chatbox flex-1 p-4 overflow-y-auto flex flex-col">
                {/* Placeholder messages */}
                <div className="message self-start flex max-w-[70%] mb-4">
                    <div className="mr-2">
                        <img 
                            src={selectedFriend.photo && selectedFriend.photo[0] ? selectedFriend.photo[0] : "/api/placeholder/30/30"} 
                            alt="Friend" 
                            className="w-8 h-8 rounded-full border border-teal-200" 
                        />
                    </div>
                    <div>
                        <div className="message-bubble bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm shadow-sm">
                            Hey! How are you?
                        </div>
                        <div className="message-time text-xs text-gray-400 mt-1">10:05 AM</div>
                    </div>
                </div>
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 mx-2 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <button 
                    onClick={handleSendMessage}
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