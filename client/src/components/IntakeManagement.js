import React, { useState, useEffect } from 'react';
import '../Intake.css'

const IntakeManagement = () => {
  const [intakeRecords, setIntakeRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [dateAdded, setDateAdded] = useState('');

  useEffect(() => {
    fetchIntakeRecords();
  }, []);

  const fetchIntakeRecords = async () => {
    try {
      const response = await fetch('/api/admin/intake', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setIntakeRecords(data);
      }
    } catch (err) {
      console.error('Failed to fetch intake records:', err);
    }
  };

  return (
    <div className="intake-management">
  <h2>Intake Records</h2>
  
  {/* Toolbar */}
  <div className="intake-toolbar">
    <input
      type="text"
      placeholder="Search records..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="">All Species</option>
      <option value="Dog">Dog</option>
      <option value="Cat">Cat</option>
      {/* Add other species as needed */}
    </select>
    <input type="date" onChange={(e) => setDateAdded(e.target.value)} />
  </div>

  {/* Table */}
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Animal Name</th>
        <th>Species</th>
        <th>Breed</th>
        <th>Age</th>
        <th>Reason for Intake</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {intakeRecords.map(record => (
        <tr key={record.id}>
          <td>{new Date(record.date).toLocaleDateString()}</td>
          <td>{record.animalName}</td>
          <td>{record.species}</td>
          <td>{record.breed}</td>
          <td>{record.age}</td>
          <td>{record.reason}</td>
          <td>
            <div className="action-buttons">
              <button className="share-btn">Share</button>
              <button className="download-btn">Download</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default IntakeManagement;