// Item.tsx
import React, { useRef } from 'react';
import Image from 'next/image';
import Card from './Card';
import { Post } from '../types/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './ExpandedItemView.module.css';

interface ItemProps {
    item?: Post;
    classNm: string;
}



const ExpandedItemView: React.FC<ItemProps> = ({ item, classNm }) => {

    /*clickHandler.current?.addEventListener('click', () => {
        //console.log('Item with id: ', item.postid);
        router.push(`/item/${item.postid}`);
    });*/
    return (
        (item == undefined) ? <>Loading...</> :
            <div className={styles[`two-col`] + ' ' + classNm}>
                <Image
                    className={styles.image}
                    //src={item.pic}
                    src={item.pic}
                    alt={item.title}
                    width={500}
                    height={500}
                    priority
                />
                <div><h1 className={styles.title}>{item.title}</h1>
                <span className={styles.price}>${(+item.price).toFixed(2)}</span>
                    <p>{item.description}</p>

                    Purchase this item


                </div>
            </div>
    )
};

export default ExpandedItemView;
