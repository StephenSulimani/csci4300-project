'use client'

interface ItemPageProps {
  params: {
    id: string;
  };
}

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import MainContainer from '@/app/components/MainContainer';
import {Post} from '../../types/types';
import ExpandedItemView from '@/app/components/ExpandedItemView';


const ItemPage = ({params: {id}}: ItemPageProps) => {

  /*const router = useRouter();*/
  const { isAuthenticated, loading } = useAuth();

  /*if (!isAuthenticated) {
    router.push('/');
  }*/

  const [item, setItem] = useState<Post>();
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


  return(
    <>
      <Header loggedIn={isAuthenticated} />
      <MainContainer>
        {ready == false ? <><p>Loading...</p></> : <ExpandedItemView item={item!!} classNm={'item-view'}/>}
      </MainContainer>
    
    
    </>
  )
}

export default ItemPage;
