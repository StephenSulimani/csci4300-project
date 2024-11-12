'use client'

// Register.tsx
import React from 'react';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';

const isLoggedIn = process.env.NEXT_PUBLIC_IS_LOGGED_IN === 'true';

const Register: React.FC = () => (
  <>
  <Header />
  <MainContainer>
  <form>
    <input type="text" placeholder="Username" required />
    <input type="password" placeholder="Password" required />
    <button type="submit">Sign Up</button>
  </form>
  </MainContainer>
  </>
);

export default Register;
