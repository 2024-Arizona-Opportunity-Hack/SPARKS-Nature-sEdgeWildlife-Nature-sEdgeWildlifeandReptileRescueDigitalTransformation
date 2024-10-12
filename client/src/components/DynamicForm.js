import React, { useState, useEffect } from 'react';

const DynamicForm = ({ formId, onSubmit }) => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormFields = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would fetch the form fields from your backend using the formId
        // For this example, we'll use a dummy form structure
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const dummyFormFields = [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { name: 'reason', label: 'Reason for Adoption', type: 'textarea', required: true },
        ];
        setFormFields(dummyFormFields);
      } catch (err) {
        setError('Failed to load form. Please try again later.');
        console.error('Error fetching form fields:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormFields();
  }, [formId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              onChange={handleChange}
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;