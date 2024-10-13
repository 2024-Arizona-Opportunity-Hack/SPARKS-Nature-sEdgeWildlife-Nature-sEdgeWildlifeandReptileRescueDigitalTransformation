import React, { useState, useEffect } from 'react';
import '../Form.css';

const DynamicForm = ({ onSubmit, questions, existingData = null }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: e.target.checked
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedFormData = { ...formData };
    for (const field of questions) {
      if (field.type === 'file' && formData[field.name] && formData[field.name] instanceof File) {
        try {
          const fileBlob = await fileToBlob(formData[field.name]);
          processedFormData[field.name] = fileBlob;
        } catch (error) {
          console.error(`Error processing file for ${field.name}:`, error);
        }
      }
    }
    onSubmit(processedFormData);
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={value}
            onChange={handleChange}
            required={field.required}
          />
        );
      case 'file':
        return (
          <>
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
              required={field.required && !value}
              accept={field.accept}
              multiple={field.multiple}
            />
            {value && typeof value === 'string' && (
              <span>Current file: {value}</span>
            )}
          </>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;