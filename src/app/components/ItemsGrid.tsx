import { ReactNode, useEffect } from 'react';
import './ItemsGrid.css';
import Item from './Item';

type Item = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

interface ItemsGridProps {
    data: Item[]
    className?: string;
  }

const ItemsGrid: React.FC<ItemsGridProps> = ({ className = '', data }) => {
  //const classes = `card ${className}`; // Combine card class with additional classes

//  useEffect(() => {
//    console.log("users changed inside users")
//  }, [data])
  return <div className={className}>
    {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
  </div>;
};
export default ItemsGrid;