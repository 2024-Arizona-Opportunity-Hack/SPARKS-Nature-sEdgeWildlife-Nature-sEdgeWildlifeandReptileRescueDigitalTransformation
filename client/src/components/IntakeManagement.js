import React, { useState, useEffect, useCallback } from 'react';
import '../Intake.css'
import { useNavigate } from 'react-router-dom';

const formFields = [
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
  { name: 'intake_request_date', label: 'Intake Request Date', type: 'datetime-local', required: false },
  { name: 'condition_upon_arrival', label: 'Condition Upon Arrival*', type: 'select', required: true, options: ['Healthy', 'Injured', 'Sick', 'Malnourished'] },
  { name: 'injuries_or_health_issues', label: 'Injuries or Health Issues', type: 'text', required: false },
  { name: 'behavioral_conditions', label: 'Behavioral Conditions*', type: 'select', required: true, options: ['Calm', 'Aggressive', 'Scared'] },
  { name: 'photos_pickup', label: 'Photos at Pickup', type: 'file', required: false, multiple: true, accept: 'image/*' },
  { name: 'transportation_method', label: 'Transportation Method*', type: 'text', required: true },
  { name: 'transported_by', label: 'Transported By*', type: 'text', required: true },
  { name: 'photos_arrival', label: 'Photos at Arrival', type: 'file', required: false, multiple: true, accept: 'image/*' },
  { name: 'adoption_status', label: 'Adoption Status', type: 'checkbox', required: false },
];

const MessageBox = ({ message, type, onClose }) => {
  const [width, setWidth] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setWidth((prevWidth) => {
          if (prevWidth <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prevWidth - 1;
        });
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isPaused, onClose]);

  return (
    <div 
      className={`message-box ${type}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p>{message}</p>
      <div className="progress-bar" style={{ width: `${width}%` }} />
    </div>
  );
};


const EditPopupForm = ({ isOpen, onClose, recordData, onSave, onSuccessfulUpdate }) => {
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState(recordData);

  
  useEffect(() => {
    if (recordData) {
      const initialFormData = formFields.reduce((acc, field) => {
        if (field.type === 'file') {
          acc[field.name] = null;
        } else if (field.type === 'checkbox') {
          acc[field.name] = recordData[field.name] || false;
        } else if (field.type === 'select') {
          acc[field.name] = recordData[field.name] || field.options[0];
        } else {
          acc[field.name] = recordData[field.name] || '';
        }
        return acc;
      }, {});
      initialFormData.animal_id = recordData.id;
      setFormData(initialFormData);
    }
  }, [recordData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files : value
    }));
  };

  const handleCloseMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const handleSubmit = async (e) => {
    formData.animal_id = recordData.animal_id;
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/intakeForm`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onSave(formData);
        onSuccessfulUpdate()
        setMessage({ text: 'Record updated successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to update record. Please try again.', type: 'error' });
        console.error('Failed to update record');
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      console.error('Error updating record:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Record</h2>
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  multiple={field.multiple}
                  accept={field.accept}
                />
              )}
            </div>
          ))}
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {message && (
          <MessageBox 
            message={message.text} 
            type={message.type} 
            onClose={handleCloseMessage} 
          />
        )}
      </div>
    </div>
  );
};


const IntakeManagement = () => {
  const [intakeRecords, setIntakeRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    fetchIntakeRecords();
  }, []);

  const handleSuccessfulUpdate = () => {
    fetchIntakeRecords(); // Refresh the records after successful update
  };

  const fetchIntakeRecords = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/intakeForm');
      if (response.ok) {
        const data = await response.json();
        setIntakeRecords(data);
      }
    } catch (err) {
      console.error('Failed to fetch intake records:', err);
    } finally {
      setLoading(false)
    }
  };
  const handleEditClick = (record) => {
    console.log("record: ", record)
    setSelectedRecord(record);
    setIsEditFormOpen(true);
  };

  const handleSave = (updatedRecord) => {
    // Update the records state with the new data
    // This would typically involve updating the parent component's state
    console.log('Record updated:', updatedRecord);
  };
  
  const filteredRecords = intakeRecords.filter(record => {
    const matchesSearch = record.species?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.gender?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === '' || record.species === filter;
    const matchesDate = dateAdded === '' || new Date(record.dateAdded).toISOString().split('T')[0] === dateAdded;
    
    return matchesSearch && matchesFilter && matchesDate;
  })
  return (
    <div className="intake-management">
  <h2>Intake Records</h2>
  
  {/* Toolbar */}
  <div className="intake-toolbar">
    <input
      type="text"
      placeholder="🔍Search records..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="">All Species</option>
      <option value="Dog">Dog</option>
      <option value="Cat">Cat</option>
      <option value="Dog">Dog</option>
  <option value="Cat">Cat</option>
  <option value="Rabbit">Rabbit</option>
  <option value="Parrot">Parrot</option>
  <option value="Pigeon">Pigeon</option>
  <option value="Sparrow">Sparrow</option>
  <option value="Canary">Canary</option>
  <option value="Snake">Snake</option>
  <option value="Lizard">Lizard</option>
  <option value="Turtle/Tortoise">Turtle/Tortoise</option>
  <option value="Hamster">Hamster</option>
  <option value="Guinea Pig">Guinea Pig</option>
  <option value="Rat">Rat</option>
  <option value="Mouse">Mouse</option>
  <option value="Horse">Horse</option>
  <option value="Cow">Cow</option>
  <option value="Pig">Pig</option>
  <option value="Sheep">Sheep</option>
  <option value="Goat">Goat</option>
  <option value="Chicken">Chicken</option>
  <option value="Duck">Duck</option>
  <option value="Freshwater Fish">Freshwater Fish</option>
  <option value="Saltwater Fish">Saltwater Fish</option>
  <option value="Fox">Fox</option>
  <option value="Squirrel">Squirrel</option>
  <option value="Deer">Deer</option>
  <option value="Raccoon">Raccoon</option>
  <option value="Ferret">Ferret</option>
  <option value="Hedgehog">Hedgehog</option>
  <option value="Sugar Glider">Sugar Glider</option>
  <option value="Frog">Frog</option>
  <option value="Salamander">Salamander</option>
  <option value="Butterfly">Butterfly</option>
  <option value="Beetle">Beetle</option>
  <option value="Other">Other</option>
      {/* Add other species as needed */}
    </select>
  </div>

  {/* Table */}
  {loading ? (<div className="loading-spinner">
          <div className="spinner"></div>
        </div>): (
          <table>
          <thead>
            <tr>
              <th>Species</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td>{record.species}</td>
                <td>{record.breed}</td>
                <td>{record.gender}</td>
                <td>
                  <div className="action-buttons">
                    <button className="share-btn">📤Share</button>
                    <button className="download-btn">📥Download</button>
                    <button className="edit-btn" onClick={() => handleEditClick(record)}>📝Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {selectedRecord && (
        <EditPopupForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedRecord(null)
          }}
          recordData={selectedRecord}
          onSave={handleSave}
          onSuccessfulUpdate={handleSuccessfulUpdate}
          
        />
      )}
  </div>
  );
};

export default IntakeManagement;