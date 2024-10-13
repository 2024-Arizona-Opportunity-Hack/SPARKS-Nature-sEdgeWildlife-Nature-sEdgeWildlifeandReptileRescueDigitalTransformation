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
    const { name, value, files } = e.target;
  
    
    // If it's a file input and multiple files are allowed
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [name]: files // Store the FileList object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
    <div className="dynamic-form">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-fields-container">
          {formFields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'file' ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                  multiple={field.multiple} // Ensure multiple attribute is set
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

  );
};

export default DynamicForm;
