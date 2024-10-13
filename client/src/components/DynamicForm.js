import React, { useState, useEffect } from 'react';
import '../Form.css'

const DynamicForm = ({ onSubmit, questions, onClose }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData()
    formData.forEach(field => {
      // For file inputs, handle the file object
      if (field.type === 'file') {
        submitData.append(field.name, e.target[field.name].files[0]); // first file in FileList
      } else {
        submitData.append(field.name, e.target[field.name].value);
      }
    });
    console.log(formData)
    onSubmit(formData);
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((field) => (
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