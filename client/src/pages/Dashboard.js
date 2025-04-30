import React, { useEffect, useState } from 'react';
import API from '../api'
import ListingCard from '../components/ListingCard';

const Dashboard = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/listings/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(response.data.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h2 className="listings-header">Your Listings</h2>
      <div className="listings-cards">
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))
      )}
      </div>
      
    </div>
  );
};

export default Dashboard;
