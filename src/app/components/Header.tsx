// Header.tsx
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';
import { useRouter } from 'next/navigation';

/*
interface HeaderProps {
  isLoggedInPrev?: boolean;
}


export function LoginInternal() {
  let isLoggedInPrev = true;
  console.log('gtfdg')
}
*/

export interface HeaderProps {
    loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedIn }: HeaderProps) => {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <h1>Bulldawg Marketplace</h1>
            <nav>
                <Link href="/">Home</Link>
                {loggedIn ? (
                    <>
                        <Link href="/addItem">Add Item</Link>
                        <Link href="/profile">Profile</Link>
                        <LogoutBtn router={router} />
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
};

export default Header;
