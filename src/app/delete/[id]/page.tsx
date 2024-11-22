'use client'

interface DeletePageProps {
    params: {
        id: string;
    };
}

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import MainContainer from '@/app/components/MainContainer';
import { Post } from '../../types/types';
import ExpandedItemView from '@/app/components/ExpandedItemView';
import Link from 'next/link';


const DeletePage = ({ params: { id } }: DeletePageProps) => {

    /*const router = useRouter();*/
    const { isAuthenticated, loading } = useAuth();

    /*if (!isAuthenticated) {
      router.push('/');
    }*/

    const [item, setItem] = useState<Post>();
    const [itemDeleted, setItemDeleted] = useState(false);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        fetch('/api/post/' + id)
            .then((res) => res.json())
            .then((data) => {
                setItem(data.message as Post);
            }).then(() => {
                setReady(true);
            });
    }, [loading]);


    return (
        <>
            <Header loggedIn={isAuthenticated} />
            <MainContainer>
                <div>
                {itemDeleted ? (<><span>Item deleted successfully. Click <Link href={'/profile'} className='text-blue-600 dark:text-blue-500 hover:underline'>here</Link> to return to your profile</span></>) : (
                    ready == false ? (<>Loading... </>) : <><div className='delete-warning-container'>
                        <span>Are you sure you want to delete this item? If so, click the delete button.&nbsp; </span>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => {
                            fetch('/api/post/' + id, {
                                method: 'DELETE'
                            }).then((res) => res.json()).then((data) => {
                                if (data.message) {
                                    setItemDeleted(true);
                                    //router.push('/');
                                } else {
                                    alert('An error occurred while deleting the item');
                                }
                            })
                        }}>Delete</button>
                        <br></br>
                        Please verify that you want to delete the following item:
                    </div>
                    <div>        <ExpandedItemView item={item!!} classNm={'item-view'} isDelete />
                    </div></>)}

                </div>
            </MainContainer>
        </>)
    
}

export default DeletePage;
