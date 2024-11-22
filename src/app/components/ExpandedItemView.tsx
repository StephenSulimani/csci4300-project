// Item.tsx
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Card from './Card';
import { Post } from '../types/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './ExpandedItemView.module.css';

interface ItemProps {
    item: Post;
    classNm: string;
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
}



const ExpandedItemView: React.FC<ItemProps> = ({ item, classNm, isView = true, isEdit, isDelete }) => {

    /*clickHandler.current?.addEventListener('click', () => {
        //console.log('Item with id: ', item.postid);
        router.push(`/item/${item.postid}`);
    });*/

    const [formData, setFormData] = useState({
        title: item.title,
        description: item.description,
        price: item.price + '',
        //image: '',
    });

    const [itemEdited, setItemEdited] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const jsonBody = JSON.stringify({
            title: formData.title,
            description: formData.description,
            price: formData.price,
        });

        const editPost = await fetch('/api/post/' + item.postid, {
            method: 'PATCH',
            body: jsonBody,
        });

        if (editPost.status == 200) {
            setItemEdited(true);
        }
    };

    if (isEdit || isDelete) {
        isView = false;
    }
    return (
        (item == undefined) ? <>Loading...</> : (isEdit ? <div>
            {itemEdited ? <><span>Item edited successfully. Click <Link href={'/profile'} className='text-blue-600 dark:text-blue-500 hover:underline'>here</Link> to return to your profile</span></> :
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <input
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        type={'number'}
                        step={'.01'}
                    />
                    <button type="submit">Submit Changes</button>
                </form>}


        </div> : <>

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

                    {isView && (<>Purchase this item</>)}


                </div>
            </div>
        </>)
    );

};

export default ExpandedItemView;
