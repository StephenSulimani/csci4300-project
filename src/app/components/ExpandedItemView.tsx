// Item.tsx
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './Item.module.css';
import Card from './Card';
import { Post } from '../types/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ItemProps {
    item?: Post;
}



const ExpandedItemView: React.FC<ItemProps> = ({ item }) => {

    /*clickHandler.current?.addEventListener('click', () => {
        //console.log('Item with id: ', item.postid);
        router.push(`/item/${item.postid}`);
    });*/
    return (
        (item ==  undefined) ? <>Loading...</> :
            <div style={{width: '100%'}}> 
                <h2>{item.title}</h2>
            <Image
                className={styles.image}
                //src={item.pic}
                src={item.pic}
                alt={item.title}
                width={100}
                height={100}
                priority
            />
            <span className={styles.price}>${(+item.price).toFixed(2)}</span>
            </div>
        )
};

export default ExpandedItemView;
