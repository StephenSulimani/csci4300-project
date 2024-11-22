import { ReactNode, useEffect } from 'react';
import './ItemsGrid.css';
import Item from './Item';
import { Post } from '../types/types';

interface ItemsGridProps {
    data: Post[]
    className?: string;
    adminMode?: boolean;
  }

const ItemsGrid: React.FC<ItemsGridProps> = ({ className = '', data , adminMode}) => {
  //const classes = `card ${className}`; // Combine card class with additional classes

//  useEffect(() => {
//    console.log("users changed inside users")
//  }, [data])
  return <div className={className}>
    {data.map((item) => (
        <Item key={item.postid} item={item} showAdminLinks={adminMode} />
      ))}
  </div>;
};
export default ItemsGrid;