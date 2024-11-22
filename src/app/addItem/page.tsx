// AddItem.tsx
'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const AddItem: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0]);
    };

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
        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('description', formData.description);
        formDataObj.append('price', formData.price);
        formDataObj.append('pic', file!);

        const newPost = await fetch('api/post/create', {
            method: 'POST',
            body: formDataObj,
        });

        if (newPost.status == 201) {
            router.push('/');
        }
    };

    if (loading) {
        return <><Header loggedIn={true} />
            <MainContainer><p>Loading...</p></MainContainer></>;
    }

    if (!isAuthenticated) {
        router.push('/');
    }

    return (
        <>
            <Header loggedIn={isAuthenticated} />
            <MainContainer>
                <form onSubmit={handleSubmit}>
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
                    <input type="file" onChange={handleFileChange} required />
                    <button type="submit">Add Item</button>
                </form>
            </MainContainer>
        </>
    );
};

export default AddItem;
