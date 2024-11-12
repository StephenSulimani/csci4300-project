'use client'

import Image from 'next/image';
import styles from './style.module.css';
import Header from './components/Header';
import Link from 'next/link';
import ItemGrid from './components/ItemsGrid';
import AddItem from './components/AddItem';
import Login from './login/page';
import Register from './register/page';
import { useState } from 'react';

type Item = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const sampleItems: Item[] = [
    {
        id: 1,
        title: 'Notebook',
        description: 'A lined notebook for taking notes',
        price: 3.50,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 2,
        title: 'Pen Set',
        description: 'A set of 5 black ink pens',
        price: 4.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 3,
        title: 'Stapler',
        description: 'A basic office stapler',
        price: 7.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 4,
        title: 'Paper Clips',
        description: 'Pack of 100 paper clips',
        price: 1.50,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 5,
        title: 'Sticky Notes',
        description: 'A pack of sticky notes for reminders',
        price: 2.50,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 6,
        title: 'Highlighters',
        description: 'Set of 4 assorted color highlighters',
        price: 5.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 7,
        title: 'Scissors',
        description: 'Pair of scissors for office use',
        price: 3.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 8,
        title: 'Tape Dispenser',
        description: 'A tape dispenser with one roll of tape',
        price: 6.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 9,
        title: 'Binder',
        description: '1-inch binder for organizing documents',
        price: 4.50,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 10,
        title: 'Envelope Pack',
        description: 'Pack of 25 envelopes',
        price: 3.75,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 11,
        title: 'Calculator',
        description: 'Basic office calculator',
        price: 9.00,
        image: 'http://placecats.com/200/300'
    },
    {
        id: 12,
        title: 'Ruler',
        description: '12-inch ruler with both metric and imperial units',
        price: 2.25,
        image: 'http://placecats.com/200/300'
    }
];


export default function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => setIsLoggedIn(false);
    
    return (
        <div className={styles.container}>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Link href="/">
        <ItemGrid data={sampleItems} className='item-grid' />
        </Link>
        <Link href="/login">
        <Login onLogin={() => setIsLoggedIn(true)} />
        </Link>
        <Link href="/register">
        <Register />
        </Link>
        <Link href="/add-item">
        {isLoggedIn ? <AddItem /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </Link>
            
        </div>
    );
}
