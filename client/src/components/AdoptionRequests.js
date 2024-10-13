import React, { useState, useEffect, useCallback } from 'react';
import '../AdoptionRequests.css'

const MessageBox = ({ message, type, onClose }) => {
  const [width, setWidth] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setWidth((prevWidth) => {
          if (prevWidth <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prevWidth - 1;
        });
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isPaused, onClose]);

  return (
    <div 
      className={`message-box ${type}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p>{message}</p>
      <div className="progress-bar" style={{ width: `${width}%` }} />
    </div>
  );
};

const EditPopupForm = ({ isOpen, onClose, listingData, onSave, onSuccessfulUpdate }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (listingData) {
      setFormData(listingData);
    }
  }, [listingData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/adoptionForm`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onSave(formData);
        setMessage({ text: 'Listing updated successfully!', type: 'success' });
        onSuccessfulUpdate();
      } else {
        setMessage({ text: 'Failed to update listing. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Adoption Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="full_name">Adopter Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact_address">Contact Address</label>
            <input
              type="text"
              id="contact_address"
              name="contact_address"
              value={formData.contact_address || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact_phone">Phone Number</label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact_email">Email</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="reason_for_adoption">Reason for Adoption</label>
            <textarea
              id="reason_for_adoption"
              name="reason_for_adoption"
              value={formData.reason_for_adoption || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {message && (
          <MessageBox 
            message={message.text} 
            type={message.type} 
            onClose={() => setMessage(null)} 
          />
        )}
      </div>
    </div>
  );
};

const ConfirmationPopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <div className="form-actions">
          <button onClick={onConfirm}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const AdoptionRequests = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/adoptionForm');
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        console.error('Failed to fetch adoption listings');
      }
    } catch (error) {
      console.error('Error fetching adoption listings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setIsEditFormOpen(true);
  };

  const handleDeleteClick = (listing) => {
    setSelectedListing(listing);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/adoptionForm`, {
        method: 'DELETE',
        body: JSON.stringify({ animal_id: selectedListing.animal_id })
      });

      if (response.ok) {
        setMessage({ text: 'Listing deleted successfully!', type: 'success' });
        await fetchListings(); // Refresh the listings after successful deletion
      } else {
        setMessage({ text: 'Failed to delete listing. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      setMessage({ text: 'An error occurred while deleting. Please try again.', type: 'error' });
    } finally {
      setIsDeleteConfirmOpen(false);
      setSelectedListing(null);
    }
  };

  const handleSave = (updatedListing) => {
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === updatedListing.id ? { ...listing, ...updatedListing } : listing
      )
    );
  };

  const handleSuccessfulUpdate = () => {
    fetchListings(); // Refresh the listings after successful update
  };

  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <div className="adoption-listings">
      <h1>Adoption Listings</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(listing => (
            <div key={listing.id} className="listing-note">
              <h3>{listing.full_name}</h3>
              <p><strong>Contact Address:</strong> {listing.contact_address}</p>
              <p><strong>Phone Number:</strong> {listing.contact_phone}</p>
              <p><strong>Email:</strong> {listing.contact_email}</p>
              <p>{listing.description}</p>
              <div className="listing-actions">
                <button onClick={() => handleEditClick(listing)}>Edit</button>
                <button onClick={() => handleDeleteClick(listing)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedListing && (
        <EditPopupForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedListing(null);
          }}
          listingData={selectedListing}
          onSave={handleSave}
          onSuccessfulUpdate={handleSuccessfulUpdate}
        />
      )}
      <ConfirmationPopup
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this adoption listing? This action cannot be undone."
      />
      {message && (
        <MessageBox 
          message={message.text} 
          type={message.type} 
          onClose={handleCloseMessage} 
        />
      )}
    </div>
  );
};

export default AdoptionRequests;