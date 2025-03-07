import React, { useState } from "react";
import "./css/login.css";
import apiPath from "./apipath/apipath";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function UserResetPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${apiPath()}/userpasswordchange`, data);
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
                setData({ email: "", password: "", cpassword: "" });
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.msg);
            }
        }
    }

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
                            <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-3">Reset password</h2>
                            <p className="text-gray-600 text-sm">See what is going on with your business</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    name="email" 
                                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    value={data.email}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    name="password" 
                                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    value={data.password}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    name="cpassword" 
                                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    value={data.cpassword}
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-purple-800 text-white text-base py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserResetPassword;