
// Header.tsx
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

/*
interface HeaderProps {
  isLoggedInPrev?: boolean;
}


export function LoginInternal() {
  let isLoggedInPrev = true;
  console.log('gtfdg')
}
*/


const Header: React.FC = () => {

  function Logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  }

  function isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    // localStorage isn't defined on server so this needs to be fixed
  }

  return (<header className={styles.header}>
    <h1>Bulldawg Marketplace</h1>
    <nav>
      <Link href="/">Home</Link>
      {isLoggedIn() ? (
        <>
          <Link href="/addItem">Add Item</Link>
          <Link href="/" onClick={() => { Logout(); }}>Logout</Link>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </>
      )}
    </nav>
  </header>
);
}
  

export default Header;
