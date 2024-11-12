// Header.tsx
import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => (
  <header className={styles.header}>
    <h1>Bulldawg Marketplace</h1>
    <nav>
      <Link href="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link href="/add-item">Add Item</Link>
          <button onClick={onLogout}>Logout</button>
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

export default Header;
