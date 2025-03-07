import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/login.css";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        photo: []
    });
    console.log(id);
    
    // Get user data on component mount
    useEffect(() => {
        getUser();
    }, []);
    
    const getUser = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            toast.error("Please login to continue");
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
                setUser({
                    ...res.data,
                    password: "",
                    cpassword: ""
                });
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
            if (error.response?.data?.msg === "Login time expired please login again") {
                toast.error("Login time expired, please login again");
                localStorage.removeItem("token");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("Failed to load user data");
            }
        }
    };
      
    const handleFileChange = async (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const base64Image = await convertBase64(file);
            setUser((prev) => ({ ...prev, photo: [base64Image] })); 
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${apiPath()}/updateuser/${id}`, user);
            if (res.status === 200) {
                toast.success(res.data.msg, { position: "top-right", autoClose: 3000, theme: "dark" });
                setTimeout(() => navigate("/"), 3000);
                
            }
        } catch (error) {
            if(error.response){
              alert(error.response.data.msg);
            }
            console.error(error);
        }
    };
  
    

    
  

    return (
        <>
            <div className="login-container flex items-center justify-center min-h-screen w-full relative overflow-hidden">
                
                <div className="animated-bg">
                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                </div>

                <ToastContainer />
            
                <div className="w-full max-w-xl px-4 py-6 relative z-10">
                    <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
                        
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <div className="text-indigo-600 text-xl sm:text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-medium text-indigo-600 mb-1">Update Profile</div>
                            <div className="text-base sm:text-lg text-gray-600 text-center">Manage your ChatApp account</div>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="mb-6 flex flex-col items-center">
                                <div className="relative w-24 h-24 mb-2">
                                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400">
                                        {user.photo && user.photo.length > 0 ? (
                                            <img src={user.photo[0]} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <label htmlFor="photo" className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-2 cursor-pointer shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </label>
                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="text-sm text-gray-500">Add profile picture</div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center border-b-2 border-gray-300 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                                        name="username"
                                        onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                                        value={user.username || ""}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center border-b-2 border-gray-300 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                                        name="email"
                                        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                                        value={user.email || ""}
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 sm:py-4 px-4 rounded-full focus:outline-none text-base sm:text-lg"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;