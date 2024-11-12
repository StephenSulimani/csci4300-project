'use client'

// Register.tsx
import React from 'react';

const Register: React.FC = () => (
  <form>
    <input type="text" placeholder="Username" required />
    <input type="password" placeholder="Password" required />
    <button type="submit">Sign Up</button>
  </form>
);

export default Register;
