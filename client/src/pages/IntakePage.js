import React from 'react';
import DynamicForm from '../components/DynamicForm';

const IntakePage = () => {
  const adoptionFormFields = [
    { name: 'species', label: 'Species', type: 'select', required: true, options: ['Dog', 'Cat', 'Other'] },
    { name: 'breed', label: 'Breed', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'text', required: true },
    { name: 'estimated_age', label: 'Age', type: 'number', required: true },
    { name: 'weight', label: 'Weight', type: 'number', required: true },
    { name: 'pickup_location', label: 'Pickup Location', type: 'text', required: true },
    { name: 'pickup_contact_name', label: 'Pickup Contact Name', type: 'text', required: true },
    { name: 'pickup_contact_phone', label: 'Pickup Contact Contact', type: 'tel', required: true },
    { name: 'assigned_team_member', label: 'Assigned Team Member', type: 'text', required: true },
    { name: 'pickup_date', label: 'Pickup Date', type: 'date', required: true },
    { name: 'condition_upon_arrival', label: 'Condition Upon Arrival', type: 'select', required: true, options: ['Healthy', 'Injured', 'Sick', 'Malnourished'] },
    { name: 'injuries_or_health_issues', label: 'Injuries or Health Issues', type: 'text', required: true },
    { name: 'behavioral_conditions', label: 'Behavioral Conditions', type: 'text', required: true, options: ['Calm', 'Aggressive', 'Scared'] },
    { name: 'photos_pickup', label: 'Photos at Pickup', type: 'file', required: false, multiple: true },
    { name: 'transportation_method', label: 'Transportation Method', type: 'text', required: false },
    { name: 'transported_by', label: 'Transported By', type: 'text', required: false },
    { name: 'arrival_date', label: 'Arrival Date', type: 'datetime-local', required: true },
    { name: 'health_check_at_arrival', label: 'Health Check at Arrival', type: 'textarea', required: false },
    { name: 'photos_arrival', label: 'Photos at Arrival', type: 'file', required: false, multiple: true },
    { name: 'temporary_housing_assignment', label: 'Temporary Housing Assignment', type: 'text', required: false },
    { name: 'dietary_needs', label: 'Dietary Needs', type: 'textarea', required: false },
    { name: 'special_care_instructions', label: 'Special Care Instructions', type: 'textarea', required: false }
  ];

  const handleSubmit = async (formData) => {
    try {
        const response = await fetch('/api/submit-intake-form', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Intake form submitted successfully!');
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="intake-page">
      <DynamicForm
        formFields={adoptionFormFields}
        onSubmit={handleSubmit}
        formTitle="Animal Intake Application"
      />
    </div>
  );
};

export default IntakePage;