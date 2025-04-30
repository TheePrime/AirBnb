import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const UpdateListing = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description,setDescription] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const res = await API.get(`/listings/find/${id}`);
      const { title, location, price ,description} = res.data.data;
      setTitle(title);
      setLocation(location);
      setPrice(price);
      setDescription(description);
    };
    fetchListing();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/listings/update/${id}`, { title, location, price });
      navigate('/');
    } catch (err) {
      alert('Failed to update listing');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Listing</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateListing;
