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

const sampleItems: Post[] = [
    {
        postid: crypto.randomUUID(),
        title: 'Notebook',
        description: 'A lined notebook for taking notes',
        price: 3.5,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Pen Set',
        description: 'A set of 5 black ink pens',
        price: 4.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Stapler',
        description: 'A basic office stapler',
        price: 7.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Paper Clips',
        description: 'Pack of 100 paper clips',
        price: 1.5,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Sticky Notes',
        description: 'A pack of sticky notes for reminders',
        price: 2.5,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Highlighters',
        description: 'Set of 4 assorted color highlighters',
        price: 5.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Scissors',
        description: 'Pair of scissors for office use',
        price: 3.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Tape Dispenser',
        description: 'A tape dispenser with one roll of tape',
        price: 6.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Binder',
        description: '1-inch binder for organizing documents',
        price: 4.5,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Envelope Pack',
        description: 'Pack of 25 envelopes',
        price: 3.75,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Calculator',
        description: 'Basic office calculator',
        price: 9.0,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
    {
        postid: crypto.randomUUID(),
        title: 'Ruler',
        description: '12-inch ruler with both metric and imperial units',
        price: 2.25,
        pic: 'http://placecats.com/200/300',
        purchased:false
    },
];

export default function Home() {
    const { isAuthenticated, loading } = useAuth();

    /*if (loading) {
        return <></>;
    }*/

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
                <Link href="/">
                    <PostGrid data={items} className="item-grid" />
                </Link>
            </div>
        </>
    );
}
