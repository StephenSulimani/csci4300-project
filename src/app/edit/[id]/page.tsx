'use client'

interface EditPageProps {
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


const EditPage = ({ params: { id } }: EditPageProps) => {

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
            })
    }, [loading]);


    return (
        <>
            <Header loggedIn={isAuthenticated} />
            <MainContainer>
                {ready == false ? <><p>Loading...</p></> : <div>
                <div>
                <ExpandedItemView item={item!!} classNm={'item-view'} isEdit />

                </div>
                </div>}
            </MainContainer>
        </>)
    
}

export default EditPage;
