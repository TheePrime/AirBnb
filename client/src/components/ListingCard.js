import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-box">
      <h3>{listing.title}</h3>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Price:</strong> ${listing.price}</p>
      <div className="actions">
        <Link to={`/listings/${listing._id}`}>
          <button>View</button>
        </Link>
        <Link to={`/listings/edit/${listing._id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
