import React, { useState } from 'react';
import Image from 'next/image';
import { Post } from '../types/types';
import Link from 'next/link';
import useAuth from '../hooks/useAuth'; // Import the authentication hook
import styles from './ExpandedItemView.module.css';

interface ItemProps {
    item: Post;
    classNm: string;
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
}

const ExpandedItemView: React.FC<ItemProps> = ({
    item,
    classNm,
    isView = true,
    isEdit,
    isDelete,
}) => {
    const { userId, isAuthenticated } = useAuth(); // Use the auth hook to get user ID
    const [formData, setFormData] = useState({
        title: item.title,
        description: item.description,
        price: item.price + '',
    });

    const [itemEdited, setItemEdited] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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

        // Prepare the form data with all fields
        const jsonBody = JSON.stringify({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price) || item.price, // Default to original price if input is empty
        });

        try {
            const editPost = await fetch('/api/post/' + item.postid, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }, // Add headers
                body: jsonBody,
            });

            if (editPost.status === 200) {
                setItemEdited(true);
            } else {
                console.error('Error editing item:', await editPost.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handlePurchase = async () => {
        if (!isAuthenticated) {
            setPurchaseStatus('You need to be logged in to make a purchase.');
            return;
        }

        setLoading(true);
        setPurchaseStatus(null);

        try {
            // Make a GET request to the backend with necessary query parameters
            const response = await fetch(
                `/api/post/${item.postid}/purchase?userId=${userId}`,
                {
                    method: 'GET',
                }
            );

            // Log the raw response for debugging
            // const text = await response.text();
            // console.log('Raw Response:', text);

            // // Parse the response as JSON
            // const data = JSON.parse(text);

            const data = await response.json();

            // Check if the purchase was successful
            if (data.status === 1) {
                setPurchaseStatus(`${data.message}`);
            } else {
                setPurchaseStatus(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error processing purchase:', error);
            setPurchaseStatus(
                'An error occurred while processing your purchase.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (isEdit || isDelete) {
        isView = false;
    }

    return item == undefined ? (
        <>Loading...</>
    ) : isEdit ? (
        <div>
            {itemEdited ? (
                <>
                    <span>
                        Item edited successfully. Click{' '}
                        <Link
                            href={'/profile'}
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            here
                        </Link>{' '}
                        to return to your profile
                    </span>
                </>
            ) : (
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
                </form>
            )}
        </div>
    ) : (
        <div className={styles[`two-col`] + ' ' + classNm}>
            <Image
                className={styles.image}
                src={item.pic}
                alt={item.title}
                width={500}
                height={500}
                priority
            />
            <div>
                <h1 className={styles.title}>{item.title}</h1>
                <span className={styles.price}>
                    ${(+item.price).toFixed(2)}
                </span>
                <p>{item.description}</p>
                {isView && (
                    <>
                        {item.purchased ? (
                            <p>This item has already been purchased.</p>
                        ) : (
                            <button onClick={handlePurchase} disabled={loading}>
                                {loading ? 'Processing...' : 'Purchase'}
                            </button>
                        )}
                        {purchaseStatus && <p>{purchaseStatus}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ExpandedItemView;
