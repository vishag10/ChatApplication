import React, { useState } from "react";
import "./css/login.css";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UserForgot() {
  const [data, setData] = useState({ email: "" });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiPath()}/forgot`, data);
      if (res.status === 200) {
        const { msg } = res.data; 
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
      }
    } catch (error) {
      if(error.response){
        alert(error.response.data.msg);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
      <ToastContainer />
      <div className="w-full max-w-md rounded-xl shadow-lg bg-white overflow-hidden">
        <div className="w-full bg-white p-6 md:p-14">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 border-2 border-purple-800 rounded flex items-center justify-center">
                  <div className="w-5 h-5 text-purple-800 text-xl">+</div>
                </div>
              </div>
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-3">Forgot password</h2>
              <p className="text-gray-600 text-sm">See what is going on with your business</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="mail@example.com"
                  name="email" 
                  onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                  value={data.email}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-800 text-white text-base py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForgot;