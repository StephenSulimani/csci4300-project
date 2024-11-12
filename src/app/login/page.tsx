// Login.tsx

'use client'

import React from 'react';
import MainContainer from '../components/MainContainer';
import { default as Header} from '../components/Header';


const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //LoginInternal(); idk
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    window.location.href = '/';
  };


  return (
    <>
    <Header />
    <MainContainer>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    </MainContainer>
    </>
   


  );
};

export default Login;
