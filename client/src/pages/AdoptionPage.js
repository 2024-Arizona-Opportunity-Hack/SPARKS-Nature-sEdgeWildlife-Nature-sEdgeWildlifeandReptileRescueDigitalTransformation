import React from 'react';
import DynamicForm from '../components/DynamicForm';

const AdoptionPage = () => {
  const adoptionFormFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'animalType', label: 'Animal Type', type: 'select', required: true, options: ['Dog', 'Cat', 'Other'] },
    { name: 'reason', label: 'Reason for Adoption', type: 'textarea', required: true },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/submit-adoption-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Adoption form submitted successfully!');
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="adoption-page">
      <h1>Adopt a Pet</h1>
      <p>Thank you for considering adoption! Please fill out the form below to begin the adoption process.</p>
      <DynamicForm
        formFields={adoptionFormFields}
        onSubmit={handleSubmit}
        formTitle="Animal Adoption Application"
      />
    </div>
  );
};

export default AdoptionPage;