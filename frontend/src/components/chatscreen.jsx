import React, { useState, useEffect } from 'react';
import "./css/chatscreen.css";
import { useNavigate } from "react-router-dom";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import MessageScreen from './messagescreen'; 

function MessengerUi() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sideuser, setSideuser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); 
  const [showAllUsers, setShowAllUsers] = useState(false);
  
  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      const res = await axios.get(`${apiPath()}/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      if (error.response?.data?.msg === "Login time expired please login again") {
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 3000);
      }
    }
  };

  const getusersidebar = async () => {
    try {
      if (!user?._id) return;
      
      // This will be used to get only friends
      const res = await axios.post(`${apiPath()}/getsidebar`, { _id: user._id });
      if (res.status === 200) {
        // Filter only friends from the user object
        const friendsList = user.friends ? res.data.filter(u => user.friends.includes(u._id)) : [];
        setSideuser(friendsList || []);
      }
    } catch (error) {
      console.error("Error fetching sidebar users:", error);
      setSideuser([]);
    }
  };
  
  const getAllUsers = async () => {
    try {
      if (!user?._id) return;
      
      const res = await axios.post(`${apiPath()}/getsidebar`, { _id: user._id });
      if (res.status === 200) {
        // Filter out users who are already friends
        const nonFriends = res.data.filter(u => !user.friends || !user.friends.includes(u._id));
        setAllUsers(nonFriends || []);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
      setAllUsers([]);
    }
  };
  
  const addFriend = async (friendId) => {
    try {
        const res = await axios.put(`${apiPath()}/addfriend/${user._id}`, { friendId });

        if (res.status === 200) {
            setUser({
                ...user,
                friends: [...(user.friends || []), friendId]
            });

            // Move the user from allUsers to sideuser
            const friendToAdd = allUsers.find(u => u._id === friendId);
            if (friendToAdd) {
                setSideuser([...sideuser, friendToAdd]);
                setAllUsers(allUsers.filter(u => u._id !== friendId));
            }

            toast.success("Friend added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    } catch (error) {
        console.error("Error adding friend:", error);
        toast.error("Failed to add friend. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }
};

  
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getusersidebar();
      getAllUsers();
    }
  }, [user]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.error("Logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    setTimeout(() => navigate("/login"), 3000);
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    // Close all users panel when a friend is selected
    setShowAllUsers(false);
  };
  
  const toggleAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100">
      <ToastContainer />
      
      <div className="flex justify-between items-center px-4 py-3 bg-teal-500 text-white shadow-md">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-600">
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
          </div>
          <div className="text-xl font-bold mr-3">LiveChat</div>
        </div>
        
        <div className="relative">
          <div 
            className="w-10 h-10 bg-teal-50 rounded-full cursor-pointer border-2 border-teal-200 overflow-hidden flex items-center justify-center"
            onClick={toggleDropdown}
          >
            {user?.photo && user.photo[0] ? (
              <img 
                src={user.photo[0]} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-teal-600">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {showDropdown && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <div className="font-semibold text-gray-800">{user.username}</div>
                <div className="text-gray-500 text-xs truncate">{user.email}</div>
              </div>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                onClick={() => {
                  setShowDropdown(false);
                  navigate(`/profile/${user._id}`);
                }}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile
                </div>
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 3a1 1 0 11-2 0 1 1 0 012 0zm-8.707 8.707a1 1 0 001.414 0L10 11.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z" clipRule="evenodd" />
                  </svg>
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
        
        <div className="md:hidden text-2xl cursor-pointer">≡</div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="session1 w-80 bg-white shadow-md flex flex-col md:relative z-10">
          {/* Search Bar */}
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
          
          {/* Friends Section Header */}
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Friends</h3>
            <button 
              onClick={toggleAllUsers}
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Friends List or All Users List based on state */}
          <div className="friends-list flex-1 overflow-y-auto">
            {!showAllUsers ? (
              // Show Friends List
              sideuser.length > 0 ? (
                sideuser.map((friend) => (
                  <div 
                    key={friend._id} 
                    className="friend flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    onClick={() => handleFriendSelect(friend)} 
                  >
                    <div className="relative mr-3">
                      <img 
                        src={friend.photo && friend.photo[0] ? friend.photo[0] : "/api/placeholder/50/50"} 
                        alt={friend.username} 
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium text-gray-800">{friend.username}</div>
                      <div className="text-sm text-gray-500 truncate">{friend.email}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No friends yet. Click the + button to add friends.
                </div>
              )
            ) : (
              // Show All Users List for adding friends
              <>
                <div className="bg-teal-50 p-2 border-b border-teal-100">
                  <h4 className="text-teal-700 font-medium text-center">Add New Friends</h4>
                </div>
                {allUsers.length > 0 ? (
                  allUsers.map((user) => (
                    <div 
                      key={user._id} 
                      className="friend flex items-center p-3 hover:bg-gray-50 border-b border-gray-100"
                    >
                      <div className="relative mr-3">
                        <img 
                          src={user.photo && user.photo[0] ? user.photo[0] : "/api/placeholder/50/50"} 
                          alt={user.username} 
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium text-gray-800">{user.username}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>
                      <button 
                        onClick={() => addFriend(user._id)}
                        className="ml-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No users available to add.
                  </div>
                )}
                <div className="p-3 flex justify-center">
                  <button 
                    onClick={toggleAllUsers}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 text-sm"
                  >
                    Back to Friends
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Message screen section */}
        {selectedFriend ? (
          <MessageScreen selectedFriend={selectedFriend} currentUserId={user?._id} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
            Select a friend to start chatting
          </div>
        )}
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
}

export default MessengerUi;