'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Link from 'next/link';
import PostGrid from '../components/ItemsGrid';
import AddItem from '../addItem/page';
import Login from '../login/page';
import Register from '../register/page';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

import {Post} from '../types/types';


export default function LoggedInProfile() {
    const { isAuthenticated, loading, userId } = useAuth();

    /*if (loading) {
        return <></>;
    }*/

    const [items, setItems] = useState<Post[]>([]);

    useEffect(() => {
            fetch('/api/post')
                .then((res) => res.json())
                .then((data) => {
                    const itemsOwnedByUser = data.message.filter((item: Post) =>
                        item.userId == userId
                    );
                    setItems(itemsOwnedByUser);
                });
    }, [loading]);

    if (isAuthenticated == false) {
        console.log('Not authenticated');
    }


    

    return (
        <>
            <div>
                <Header loggedIn={true} />
                <br></br>
                <h1 style={{fontSize:'2em'}}>Manage your listings</h1>
                <PostGrid data={items} className="item-grid" adminMode={true} />
            </div>
        </>
    );
}
