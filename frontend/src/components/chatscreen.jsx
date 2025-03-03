// Facebook Messenger UI Clone using Tailwind CSS
import React from 'react';
import "./css/chatscreen.css";

function MessengerUi() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-teal-500 text-white shadow-md">
        <div className="text-xl font-bold">LiveChat</div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-600">
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
          </div>
        </div>
        <div className="md:hidden text-2xl cursor-pointer">≡</div>
      </div>
      
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Session 1 - Friends List */}
        <div className="session1 w-full md:w-80 bg-white shadow-md flex flex-col md:relative z-10">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input 
                type="text" 
                placeholder="Search in LiveChat" 
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
          
          {/* Friends List */}
          <div className="friends-list flex-1 overflow-y-auto">
            {/* Active Friend */}
            <div className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 bg-teal-50">
              <div className="relative mr-3">
                <img src="/api/placeholder/50/50" alt="Friend" className="w-12 h-12 rounded-full object-cover border-2 border-teal-200" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-800">John Doe</div>
                <div className="text-sm text-gray-500 truncate">Hey, how are you?</div>
              </div>
              <div className="text-xs text-teal-600 min-w-[30px] text-right font-medium">2m</div>
            </div>
            
            {/* Offline Friend */}
            <div className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="relative mr-3">
                <img src="/api/placeholder/50/50" alt="Friend" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-800">Sarah Johnson</div>
                <div className="text-sm text-gray-500 truncate">See you tomorrow!</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[30px] text-right">1h</div>
            </div>
            
            {/* Online Friend */}
            <div className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="relative mr-3">
                <img src="/api/placeholder/50/50" alt="Friend" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-800">Mike Wilson</div>
                <div className="text-sm text-gray-500 truncate">Thanks for the help</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[30px] text-right">5h</div>
            </div>
            
            {/* Online Friend */}
            <div className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="relative mr-3">
                <img src="/api/placeholder/50/50" alt="Friend" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-800">Emily Brown</div>
                <div className="text-sm text-gray-500 truncate">Did you see the news?</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[30px] text-right">Tue</div>
            </div>
            
            {/* Offline Friend */}
            <div className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="relative mr-3">
                <img src="/api/placeholder/50/50" alt="Friend" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-gray-800">David Clark</div>
                <div className="text-sm text-gray-500 truncate">Let's meet on Friday</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[30px] text-right">Mon</div>
            </div>
          </div>
        </div>
        
        {/* Session 2 - Chat Section */}
        <div className="session2 hidden md:flex flex-1 flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="chat-header flex justify-between items-center p-3 border-b border-gray-200 bg-white shadow-sm">
            <div className="chat-user flex items-center">
              <div className="relative mr-3">
                <img src="/api/placeholder/40/40" alt="Current chat" className="w-10 h-10 rounded-full border-2 border-teal-200" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <div className="font-medium text-gray-800">John Doe</div>
                <div className="text-xs text-teal-600">Active now</div>
              </div>
            </div>
            <div className="chat-actions flex">
              <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="mx-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Chatbox */}
          <div className="chatbox flex-1 p-4 overflow-y-auto flex flex-col">
            {/* Date Divider */}
            <div className="text-center text-xs text-gray-500 my-2">Today</div>
            
            {/* Friend Message */}
            <div className="message self-start flex max-w-[70%] mb-4">
              <div className="mr-2">
                <img src="/api/placeholder/30/30" alt="Friend" className="w-8 h-8 rounded-full border border-teal-200" />
              </div>
              <div>
                <div className="message-bubble bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm shadow-sm">
                  Hey! How are you doing?
                </div>
                <div className="message-time text-xs text-gray-400 mt-1">10:05 AM</div>
              </div>
            </div>
            
            {/* User Message */}
            <div className="message self-end flex max-w-[70%] mb-4 justify-end">
              <div>
                <div className="message-bubble bg-teal-500 text-white px-4 py-2 rounded-2xl text-sm shadow-sm">
                  I'm good! Just working on some projects. How about you?
                </div>
                <div className="message-time text-xs text-gray-400 mt-1 text-right">10:08 AM</div>
              </div>
            </div>
            
            {/* Friend Message */}
            <div className="message self-start flex max-w-[70%] mb-4">
              <div className="mr-2">
                <img src="/api/placeholder/30/30" alt="Friend" className="w-8 h-8 rounded-full border border-teal-200" />
              </div>
              <div>
                <div className="message-bubble bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm shadow-sm">
                  Same here. Want to grab lunch later?
                </div>
                <div className="message-time text-xs text-gray-400 mt-1">10:10 AM</div>
              </div>
            </div>
            
            {/* User Message */}
            <div className="message self-end flex max-w-[70%] mb-4 justify-end">
              <div>
                <div className="message-bubble bg-teal-500 text-white px-4 py-2 rounded-2xl text-sm shadow-sm">
                  Sure, that sounds great!
                </div>
                <div className="message-time text-xs text-gray-400 mt-1 text-right">10:12 AM</div>
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
              placeholder="Type a message..." 
              className="flex-1 mx-2 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2 ml-2 transform transition-all duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessengerUi;