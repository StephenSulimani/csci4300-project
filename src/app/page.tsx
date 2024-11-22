'use client';

import Image from 'next/image';
import styles from './style.module.css';
import Header from './components/Header';
import Link from 'next/link';
import PostGrid from './components/ItemsGrid';
import AddItem from './addItem/page';
import Login from './login/page';
import Register from './register/page';
import { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';

import {Post} from './types/types';

export default function Home() {
    const { isAuthenticated, loading } = useAuth();

    const [items, setItems] = useState<Post[]>([]);

    useEffect(() => {
            fetch('/api/post')
                .then((res) => res.json())
                .then((data) => {
                    setItems(data.message as Post[]);
                });
    }, [loading]);


    

    return (
        <>
            <div className={styles.container}>
                <Header loggedIn={isAuthenticated} />
                <PostGrid data={items} className="item-grid" />
            </div>
        </>
    );
}
