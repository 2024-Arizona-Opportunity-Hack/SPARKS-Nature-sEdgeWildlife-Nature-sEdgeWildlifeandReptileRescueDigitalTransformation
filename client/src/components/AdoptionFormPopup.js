import React from 'react';
import DynamicForm from './DynamicForm';
import '../Adoption.css'

const AdoptionFormPopup = ({ isOpen, onClose, animal, formId }) => {
  if (!isOpen) return null;

  const handleSubmit = (formData) => {
    console.log('Adoption form submitted:', formData);
    // Here you would typically send this data to your backend
    onClose();
  };

  return (
    <div className="popupOverlay">
    <div className="popupContent">
      <button className="closeButton" onClick={onClose}>&times;</button>
      <h2 className="formTitle">Adopt {animal.name}</h2>
      <DynamicForm formId={formId} onSubmit={handleSubmit} />
    </div>
  </div>
  );
};

export default AdoptionFormPopup;