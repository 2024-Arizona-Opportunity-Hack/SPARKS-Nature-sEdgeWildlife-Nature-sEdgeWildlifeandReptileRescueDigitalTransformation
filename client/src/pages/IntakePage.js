// import React, { useState } from 'react';
// import DynamicForm from '../components/DynamicForm';

// const IntakePage = () => {
//   const [formErrors, setFormErrors] = useState({});

//   const adoptionFormFields = [
//     { 
//       name: 'species', 
//       label: 'Species*', 
//       type: 'select', 
//       required: true, 
//       options: [
//         'Dog', 
//         'Cat', 
//         'Rabbit', 
//         'Parrot', 
//         'Pigeon', 
//         'Sparrow', 
//         'Canary', 
//         'Snake', 
//         'Lizard', 
//         'Turtle/Tortoise', 
//         'Hamster', 
//         'Guinea Pig', 
//         'Rat', 
//         'Mouse', 
//         'Horse', 
//         'Cow', 
//         'Pig', 
//         'Sheep', 
//         'Goat', 
//         'Chicken', 
//         'Duck', 
//         'Freshwater Fish', 
//         'Saltwater Fish', 
//         'Fox', 
//         'Squirrel', 
//         'Deer', 
//         'Raccoon', 
//         'Ferret', 
//         'Hedgehog', 
//         'Sugar Glider', 
//         'Frog', 
//         'Salamander', 
//         'Butterfly', 
//         'Beetle', 
//         'Other'
//       ] 
//     },
//     { name: 'breed', label: 'Breed', type: 'text', required: false },
//     { name: 'gender', label: 'Gender*', type: 'select', required: true, options: ['Male', 'Female', 'Others'] },
//     { name: 'estimated_age', label: 'Estimated Age*', type: 'number', required: true },
//     { name: 'weight', label: 'Weight*', type: 'number', required: true },
//     { name: 'pickup_location', label: 'Pickup Location', type: 'text', required: false },
//     { name: 'pickup_contact_name', label: 'Pickup Contact Name', type: 'text', required: false },
//     { name: 'pickup_contact_phone', label: 'Pickup Contact Phone', type: 'tel', required: false },
//     { name: 'assigned_team_member', label: 'Assigned Team Member', type: 'text', required: false },
//     { name: 'intake_date', label: 'Intake Date*', type: 'date', required: true },
//     { name: 'intake_request_date', label: 'Intake Request Date', type: 'date', required: false },
//     { name: 'condition_upon_arrival', label: 'Condition Upon Arrival*', type: 'select', required: true, options: ['Healthy', 'Injured', 'Sick', 'Malnourished'] },
//     { name: 'injuries_or_health_issues', label: 'Injuries or Health Issues', type: 'text', required: false },
//     { name: 'behavioral_conditions', label: 'Behavioral Conditions*', type: 'select', required: true, options: ['Calm', 'Aggressive', 'Scared'] },
//     { name: 'photos_pickup', label: 'Photos at Pickup*', type: 'file', required: false, multiple: true, accept: 'image/*' },
//     { name: 'transportation_method', label: 'Transportation Method*', type: 'text', required: true },
//     { name: 'transported_by', label: 'Transported By*', type: 'text', required: true },
//     { name: 'photos_arrival', label: 'Photos at Arrival*', type: 'file', required: false, multiple: true, accept: 'image/*' },
//     { name: 'adoption_status', label: 'Adoption Status*', type: 'checkbox', required: true },
//   ];

//   const validateForm = (formData) => {
//     const errors = {};

//     if (formData.pickup_contact_phone && !/^\d{10}$/.test(formData.pickup_contact_phone)) {
//       errors.pickup_contact_phone = 'Phone number must be exactly 10 digits.';
//     }

//     return errors;
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       if (!(file instanceof Blob)) {
//         reject(new Error('Expected a Blob or File object.'));
//         return;
//       }
  
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleSubmit = async (formData) => {
//     const preparedData = { ...formData };
//     preparedData = formData
//     if (formData.photos_pickup && formData.photos_pickup.length > 0) {
//         preparedData.photos_pickup = await Promise.all(
//           Array.from(formData.photos_pickup).map((file) => fileToBase64(file))
//         );
//       }
    
//     if (formData.photos_arrival && formData.photos_arrival.length > 0) {
//         preparedData.photos_arrival = await Promise.all(
//             Array.from(formData.photos_arrival).map((file) => fileToBase64(file))
//         );
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     console.log(JSON.stringify(formData));
//     try {
//       const response = await fetch('http://127.0.0.1:8000/intakeForm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         alert('Intake form submitted successfully!');
//       } else {
//         alert('Failed to submit form. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="intake-page">
//       <DynamicForm
//         formFields={adoptionFormFields}
//         onSubmit={handleSubmit}
//         formTitle="Animal Intake Application"
//         formErrors={formErrors}
//       />
//     </div>
//   );
// };

// export default IntakePage;

import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';

const IntakePage = () => {
  const [formErrors, setFormErrors] = useState({});

  const adoptionFormFields = [
    { 
      name: 'species', 
      label: 'Species*', 
      type: 'select', 
      required: true, 
      options: [
        'Dog', 
        'Cat', 
        'Rabbit', 
        'Parrot', 
        'Pigeon', 
        'Sparrow', 
        'Canary', 
        'Snake', 
        'Lizard', 
        'Turtle/Tortoise', 
        'Hamster', 
        'Guinea Pig', 
        'Rat', 
        'Mouse', 
        'Horse', 
        'Cow', 
        'Pig', 
        'Sheep', 
        'Goat', 
        'Chicken', 
        'Duck', 
        'Freshwater Fish', 
        'Saltwater Fish', 
        'Fox', 
        'Squirrel', 
        'Deer', 
        'Raccoon', 
        'Ferret', 
        'Hedgehog', 
        'Sugar Glider', 
        'Frog', 
        'Salamander', 
        'Butterfly', 
        'Beetle', 
        'Other'
      ] 
    },
    { name: 'breed', label: 'Breed', type: 'text', required: false },
    { name: 'gender', label: 'Gender*', type: 'select', required: true, options: ['Male', 'Female', 'Others'] },
    { name: 'estimated_age', label: 'Estimated Age*', type: 'number', required: true },
    { name: 'weight', label: 'Weight*', type: 'number', required: true },
    { name: 'pickup_location', label: 'Pickup Location', type: 'text', required: false },
    { name: 'pickup_contact_name', label: 'Pickup Contact Name', type: 'text', required: false },
    { name: 'pickup_contact_phone', label: 'Pickup Contact Phone', type: 'tel', required: false },
    { name: 'assigned_team_member', label: 'Assigned Team Member', type: 'text', required: false },
    { name: 'intake_date', label: 'Intake Date*', type: 'date', required: true },
    { name: 'intake_request_date', label: 'Intake Request Date', type: 'date', required: false },
    { name: 'condition_upon_arrival', label: 'Condition Upon Arrival*', type: 'select', required: true, options: ['Healthy', 'Injured', 'Sick', 'Malnourished'] },
    { name: 'injuries_or_health_issues', label: 'Injuries or Health Issues', type: 'text', required: false },
    { name: 'behavioral_conditions', label: 'Behavioral Conditions*', type: 'select', required: true, options: ['Calm', 'Aggressive', 'Scared'] },
    { name: 'photos_pickup', label: 'Photos at Pickup*', type: 'file', required: false, multiple: true, accept: 'image/*' },
    { name: 'transportation_method', label: 'Transportation Method*', type: 'text', required: true },
    { name: 'transported_by', label: 'Transported By*', type: 'text', required: true },
    { name: 'photos_arrival', label: 'Photos at Arrival*', type: 'file', required: false, multiple: true, accept: 'image/*' },
    { name: 'adoption_status', label: 'Adoption Status*', type: 'checkbox', required: true },
  ];

  const validateForm = (formData) => {
    const errors = {};

    if (formData.pickup_contact_phone && !/^\d{10}$/.test(formData.pickup_contact_phone)) {
      errors.pickup_contact_phone = 'Phone number must be exactly 10 digits.';
    }

    return errors;
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error('Expected a Blob or File object.'));
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (formData) => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const preparedData = { ...formData };

    if (formData.photos_pickup && formData.photos_pickup.length > 0) {
      preparedData.photos_pickup = await Promise.all(
        Array.from(formData.photos_pickup).map((file) => fileToBase64(file))
      );
    }
    
    if (formData.photos_arrival && formData.photos_arrival.length > 0) {
      preparedData.photos_arrival = await Promise.all(
        Array.from(formData.photos_arrival).map((file) => fileToBase64(file))
      );
    }

    console.log(JSON.stringify(preparedData));
    try {
      const response = await fetch('http://127.0.0.1:8000/intakeForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
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
        formErrors={formErrors}
      />
    </div>
  );
};

export default IntakePage;