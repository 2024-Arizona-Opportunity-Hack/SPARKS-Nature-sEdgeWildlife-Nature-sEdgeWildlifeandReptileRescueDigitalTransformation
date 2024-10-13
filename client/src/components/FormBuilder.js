import React, { useState } from 'react';
import axios from 'axios';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', options: [], required: true });

  const addField = () => {
    setFormFields([...formFields, { ...newField, name: newField.label.toLowerCase().replace(/\s/g, '_') }]);
    setNewField({ name: '', label: '', type: 'text', options: [], required: true });
  };

  const addOption = () => {
    setNewField({ ...newField, options: [...newField.options, ''] });
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...newField.options];
    updatedOptions[index] = value;
    setNewField({ ...newField, options: updatedOptions });
  };

  const saveForm = async () => {
    try {
      const response = await axios.post('/api/save-form', {
        title: formTitle,
        fields: formFields,
      });
      alert(`Form saved successfully! Form ID: ${response.data.formId}`);
    } catch (error) {
      alert('Failed to save form. Please try again.');
    }
  };

  return (
    <div>
      <h2>Form Builder</h2>
      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        placeholder="Form Title"
      />
      {formFields.map((field, index) => (
        <div key={index}>
          <p>{field.label} - Type: {field.type}</p>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newField.label}
          onChange={(e) => setNewField({...newField, label: e.target.value})}
          placeholder="Field Label"
        />
        <select
          value={newField.type}
          onChange={(e) => setNewField({...newField, type: e.target.value})}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
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
        {newField.type === 'select' && (
          <div>
            {newField.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <button onClick={addOption}>Add Option</button>
          </div>
        )}
        <button onClick={addField}>Add Field</button>
      </div>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormBuilder;