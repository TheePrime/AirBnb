import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const res = await API.get(`/listings/find/${id}`);
      setListing(res.data.data);
    };
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/listings/delete/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div>
      <h2>{listing.title}</h2>
      <p>Location: {listing.location}</p>
      <p>Price: {listing.price}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ListingDetails;
