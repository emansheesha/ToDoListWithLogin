
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './Components/Auth';
import LoginForm from './Components/loginForm/loginForm';
import Home from './Components/home/home';
import Profile from './Components/profile/profile';
import './App.css';
function App() {
  const auth = useAuth();
  console.log(auth)
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/profile" element={auth.user ? <Profile /> : <Navigate to='/login' />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
