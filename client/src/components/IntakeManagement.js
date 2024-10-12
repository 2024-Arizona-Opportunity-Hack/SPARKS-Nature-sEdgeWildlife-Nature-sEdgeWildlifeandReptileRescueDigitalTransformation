import React, { useState, useEffect } from 'react';

const IntakeManagement = () => {
  const [intakeRecords, setIntakeRecords] = useState([]);

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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Animal Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Reason for Intake</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IntakeManagement;