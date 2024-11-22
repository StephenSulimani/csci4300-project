'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Link from 'next/link';
import PostGrid from '../components/ItemsGrid';
import AddItem from '../addItem/page';
import Login from '../login/page';
import Register from '../register/page';
import { use, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

import {Post} from '../types/types';
import {useRouter} from 'next/navigation';


export default function LoggedInProfile() {
    const { isAuthenticated, loading, userId } = useAuth();
    const router = useRouter();

    const [items, setItems] = useState<Post[]>([]);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
            fetch('/api/post')
                .then((res) => res.json())
                .then((data) => {
                    const itemsOwnedByUser = data.message.filter((item: Post) =>
                        item.userId == userId
                    );
                    setItems(itemsOwnedByUser);
                    setHasFetched(true);
                });
    }, [loading]);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            router.push('/');
        }
    }, [loading])


    

    return (
        <>
            <div>
                <Header loggedIn={true} />
                <br></br>
                <h1 style={{fontSize:'2em'}}>Manage your listings</h1>
                {items.length == 0 && hasFetched ? (<p>You have no listings. Why don't you <Link href="/addItem" className='text-blue-600 dark:text-blue-500 hover:underline'>add one?</Link></p>) :
                 (<><PostGrid data={items} className="item-grid" adminMode={true} /></>)}
            </div>
        </>
    );
}
