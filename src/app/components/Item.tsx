// Item.tsx
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './Item.module.css';
import Card from './Card';
import { Post } from '../types/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ItemProps {
    item: Post;
    showAdminLinks?: boolean;
}



const Item: React.FC<ItemProps> = ({ item, showAdminLinks }) => {


    const clickHandler = useRef<HTMLDivElement>(null);

    /*clickHandler.current?.addEventListener('click', () => {
        //console.log('Item with id: ', item.postid);
        router.push(`/item/${item.postid}`);
    });*/
    return (
        <Link href={showAdminLinks ? '#' : `/item/${item.postid}`} style={showAdminLinks ? {cursor: 'inherit'} : {}}>
        <Card className={styles.card}>
            <div className={styles.title}>
                <h3>{item.title}</h3>
            </div>
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
            {showAdminLinks && <div className={styles['admin-links']}>
                <Link href={`/edit/${item.postid}`} className='text-blue-600 dark:text-blue-500 hover:underline'>Edit</Link>
                <Link href={`/delete/${item.postid}`} className='text-blue-600 dark:text-blue-500 hover:underline'>Delete</Link>
                </div>
            }
        </Card>
        </Link>)
};

export default Item;
