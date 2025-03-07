import React, { useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Loginpage from "./components/login";
import RegistrationPage from "./components/register";
import ChatScreen from "./components/chatscreen";
import ProfilePage from "./components/profile";
import UserForgot from "./components/userforgotPassword";
import UserResetPassword from "./components/resetpassword";


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>

       <Route path="/" element={<ChatScreen />} />
       <Route path="/login" element={<Loginpage />} />
       <Route path="/signup" element={<RegistrationPage />} />
       <Route path="/profile/:id" element={<ProfilePage/>} />
       <Route path="/login/userforgot" element={<UserForgot/>} />
       <Route path="/userresetpassword" element={<UserResetPassword/>} />
     </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
