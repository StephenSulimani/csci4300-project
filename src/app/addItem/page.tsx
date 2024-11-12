// AddItem.tsx
'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';

const AddItem: React.FC = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', image: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, 
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Logging form data, can be used to submit to backend in the future
    alert('Form data received: \n\n' + JSON.stringify(formData));
    setFormData({ title: '', description: '', price: '', image: '' });
  };


  return (
    <>
    <Header />
    <MainContainer>
     <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required type={'number'} step={'.01'}/>
      <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <button type="submit">Add Item</button>
    </form>
    </MainContainer>
    
    </>
   
  );
};

export default AddItem;
