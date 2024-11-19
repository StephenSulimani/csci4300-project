// Item.tsx
import React from 'react';
import Image from 'next/image';
import styles from './Item.module.css';
import Card from './Card';
import { Post } from '../types/types';

interface ItemProps {
  item: Post;
}

const Item: React.FC<ItemProps> = ({ item }) => (
  <Card className={styles.card}>
    <div className={styles.title}>
      <h3>{item.title}</h3>
    </div>
    <Image className={styles.image} 
    
    //src={item.pic}
    src = {'http://placecats.com/200/300'}
    
    alt={item.title} width={100} height={100} priority />
    <span className={styles.price}>${(+item.price).toFixed(2)}</span>
  </Card>
);

export default Item;
