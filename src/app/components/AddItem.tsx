// AddItem.tsx
import React, { useState } from 'react';

const AddItem: React.FC = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', image: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Logging form data, can be used to submit to backend in the future
    setFormData({ title: '', description: '', price: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
