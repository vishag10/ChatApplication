import React, { useState, useRef } from 'react';
import "./css/login.css";
import { Link } from "react-router-dom";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Loginpage() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiPath()}/loginuser`, data);
      if (res.status === 200) {
        const { token, msg } = res.data;
        if (token) {
          console.log("Token received:", token);
          localStorage.setItem("token", token);


          toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setData({ email: "", password: "" });
          setTimeout(() => navigate("/"), 3000);

        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-6">
      <ToastContainer />
      {/* Centered login form with improved mobile responsiveness */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform hover:scale-102 transition-transform duration-300">
            {/* Login Form Header - Reduced size for mobile */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-full flex items-center justify-center mb-3 animate-pulse">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <div className="text-teal-600 text-xl sm:text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-medium text-teal-600 mb-1">Welcome Back</div>
              <div className="text-base sm:text-lg text-gray-500 text-center">Log in to continue to ChatApp</div>
            </div>

            {/* Form with proper semantic structure */}
            <form onSubmit={handleSubmit}>
              {/* Email/Username Input */}
              <div className="mb-4">
                <div className="flex items-center border-b-2 border-gray-300 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="asd@gmail.com"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                    name="email" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    value={data.email}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <div className="flex items-center border-b-2 border-gray-300 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="password"
                    placeholder="• • • • • •"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-base sm:text-lg"
                    name="password" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    value={data.password}
                  />
                </div>
              </div>

              {/* Login Button - Smaller padding on mobile */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 sm:py-4 px-4 rounded-full focus:outline-none transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-base sm:text-lg"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-gray-500 text-base sm:text-lg">
              Don't have account? <Link to="/signup"><span className="text-teal-500 font-medium cursor-pointer hover:underline">Sign Up</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;