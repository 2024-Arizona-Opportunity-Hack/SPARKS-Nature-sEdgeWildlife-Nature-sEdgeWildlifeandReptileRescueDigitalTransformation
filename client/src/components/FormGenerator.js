import React, { useState } from 'react';

const FormGenerator = () => {
  const [formTitle, setFormTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ type: 'text', label: '', required: false });

  const addField = () => {
    setFields([...fields, { ...newField, id: Date.now() }]);
    setNewField({ type: 'text', label: '', required: false });
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/forms', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ title: formTitle, fields }),
      });
      if (response.ok) {
        alert('Form created successfully!');
        setFormTitle('');
        setFields([]);
      } else {
        alert('Failed to create form. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-generator">
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          required
        />
        {fields.map(field => (
          <div key={field.id} className="field-item">
            <input
              type="text"
              value={field.label}
              onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
              placeholder="Field Label"
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(field.id, 'type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="textarea">Text Area</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => handleFieldChange(field.id, 'required', e.target.checked)}
              />
              Required
            </label>
            <button type="button" onClick={() => removeField(field.id)}>Remove</button>
          </div>
        ))}
        <div className="new-field">
          <input
            type="text"
            value={newField.label}
            onChange={(e) => setNewField({...newField, label: e.target.value})}
            placeholder="New Field Label"
          />
          <select
            value={newField.type}
            onChange={(e) => setNewField({...newField, type: e.target.value})}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="textarea">Text Area</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={newField.required}
              onChange={(e) => setNewField({...newField, required: e.target.checked})}
            />
            Required
          </label>
          <button type="button" onClick={addField}>Add Field</button>
        </div>
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default FormGenerator;