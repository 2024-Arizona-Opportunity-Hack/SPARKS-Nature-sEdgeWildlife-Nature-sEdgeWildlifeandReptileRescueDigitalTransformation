import React from 'react';
import DynamicForm from './DynamicForm';
import '../Adoption.css'

const AdoptionFormPopup = ({ isOpen, onClose, animal }) => {
  if (!isOpen) return null;

  const adoptionQuestions = [
    { name: 'full_name', label: 'Full Name', type: 'text', required: true },
    { name: 'contact_address', label: 'Contact Address', type: 'text', required: true },
    { name: 'contact_phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'contact_email', label: 'Email', type: 'email', required: true },
    { name: 'facility_type', label: 'Facility Type', type: 'text', required: true },
    { name: 'facility_license', label: 'Facility License', type: 'number', required: true },
    { name: 'license_number', label: 'License Number', type: 'number', required: true },
    { name: 'experience_with_species', label: 'Experience with Species', type: 'text', required: true },
    { name: 'reason_for_adoption', label: 'Reason For Adoption', type: 'text', required: true },
    { name: 'animal_id', label: 'Animal ID', type: 'number', required: true },
    { name: 'government_id', label: 'Government ID', type: 'file', required: true },
    ...(animal.exotic === "true" ? [{ name: 'special_requirements', label: 'Exotic Animal License', type: 'text', required: true }] : []),
  ]

  const handleSubmit = (formData) => {
    console.log('Adoption form submitted:', formData);
    // Here you would typically send this data to your backend
    onClose();
  };

  return (
    <div className="popupOverlay">
    <div className="popupContent" >
      <button className="closeButton" onClick={onClose}>&times;</button>
      <img 
        src={animal.photoUrl} 
        alt={`${animal.name}`} 
        className="animal-thumbnail" 
      />
      <h2 className="formTitle">Adopt {animal.name}</h2>
      <DynamicForm  
        onSubmit={handleSubmit} 
        questions={adoptionQuestions}
        />
    </div>
  </div>
  );
};

export default AdoptionFormPopup;