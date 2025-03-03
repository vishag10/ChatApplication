import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/login.css";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
    const [user, setUser] = useState({ username: "", email: "", password: "", cpassword: "", photo: [] });
    const navigate = useNavigate();

    const handleFileChange = async (e) => {
        const file = e.target.files[0]; // Get only the first file
        if (file) {
            const base64Image = await convertBase64(file);
            setUser((prev) => ({ ...prev, photo: [base64Image] })); // Replace instead of appending
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiPath()}/adduser`, user);
            if (res.status === 201) {
                toast.success(res.data.msg, { position: "top-right", autoClose: 3000, theme: "dark" });
                setUser({
                    username: "", email: "", password: "", cpassword: "", photo: ""
                });
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            if(error.response){
              alert(error.response.data.msg);
            }
            console.error(error);
          }
      };

    return (
        <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-6">
            <ToastContainer />
            {/* Centered registration form with improved mobile responsiveness */}
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform hover:scale-102 transition-transform duration-300">
                        {/* Registration Form Header - Reduced size for mobile */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-full flex items-center justify-center mb-3 animate-pulse">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center">
                                    <div className="text-teal-600 text-xl sm:text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-medium text-teal-600 mb-1">Create Account</div>
                            <div className="text-base sm:text-lg text-gray-500 text-center">Sign up to join ChatApp</div>
                        </div>

                        {/* Profile Picture Selection */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6 flex flex-col items-center">
                                <div className="relative w-24 h-24 mb-2">
                                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400">
                                        {user.photo.length > 0 ? (
                                            <img src={user.photo[0]} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <label htmlFor="photo" className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-2 cursor-pointer shadow-md hover:bg-teal-600 transition-colors">
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

                            {/* Form Inputs - More compact for mobile */}

                            {/* Username Input */}
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
                                        value={user.username}
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
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
                                        value={user.email}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="mb-4">
                                <div className="flex items-center border-b-2 border-gray-300 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="• • • • • •"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                                        name="password"
                                        onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                                        value={user.password}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="mb-6">
                                <div className="flex items-center border-b-2 border-gray-300 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                                        name="cpassword"
                                        onChange={(e) => setUser((prev) => ({ ...prev, cpassword: e.target.value }))}
                                        value={user.cpassword}
                                    />
                                </div>
                            </div>

                            {/* Register Button - Smaller padding on mobile */}
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 sm:py-4 px-4 rounded-full focus:outline-none transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-base sm:text-lg"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="text-center text-gray-500 text-base sm:text-lg">
                            Already have an account? <Link to="/login"><span className="text-teal-500 font-medium cursor-pointer hover:underline">Login</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;