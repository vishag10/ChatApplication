import React, { useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Loginpage from "./components/login";
import RegistrationPage from "./components/register";
import ChatScreen from "./components/chatscreen";


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>

       <Route path="/" element={<ChatScreen />} />
       <Route path="/login" element={<Loginpage />} />
       <Route path="/signup" element={<RegistrationPage />} />
     </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
