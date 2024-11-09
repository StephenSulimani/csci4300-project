import Image from 'next/image';
import styles from './Item.module.css';
import Card from './Card';


type ItemProps = {
    item: {
        id: number;
        title: string;
        description: string;
        price: number;
        image: string;
    }
}

const Item = ({ item }: ItemProps) => {
  return (
    <Card className={styles.item}>
    <div className={styles.title}>
        <h3>{item.title}</h3>
      </div>
      <Image className={styles.image}
        src={item.image} 
        alt={item.title} 
        width={100} 
        height={100}
        priority
      />
      <span className={styles.price}>{item.price}</span>
     
    </Card>
  );
}

export default Item;