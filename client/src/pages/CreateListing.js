import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/listings/create', { title, location, price, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to create listing');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Listing</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateListing;
