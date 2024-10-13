import React, { useState } from 'react';

const DynamicForm = ({ formFields, onSubmit, formTitle }) => {
  const [formData, setFormData] = useState({});

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
