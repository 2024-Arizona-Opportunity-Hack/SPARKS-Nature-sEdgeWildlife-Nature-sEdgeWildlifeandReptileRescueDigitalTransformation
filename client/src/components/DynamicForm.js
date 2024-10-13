import React, { useState, useEffect } from 'react';
import '../Form.css'

const DynamicForm = ({ onSubmit, questions, onClose }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0] 
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  const fileToBlob = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const processedFormData = { ...formData };
    for (const field of questions) {
      if (field.type === 'file' && formData[field.name]) {
        try {
          const fileBlob = await fileToBlob(formData[field.name]);
          processedFormData[field.name] = fileBlob;
        } catch (error) {
          console.error(`Error processing file for ${field.name}:`, error);
        }
      }
    }
    console.dir(processedFormData)
    onSubmit(processedFormData);
  };

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