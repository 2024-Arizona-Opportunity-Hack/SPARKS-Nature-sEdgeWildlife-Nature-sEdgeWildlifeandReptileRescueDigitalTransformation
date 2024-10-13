import React, { useState, useEffect } from 'react';
import '../Intake.css'

const IntakeManagement = () => {
  const [intakeRecords, setIntakeRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntakeRecords();
  }, []);

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
      placeholder="Search records..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="">All Species</option>
      <option value="Dog">Dog</option>
      <option value="Cat">Cat</option>
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
                    <button className="share-btn">Share</button>
                    <button className="download-btn">Download</button>
                  </div>
                </td>
              </tr>
            ))}{/* 
            {intakeRecords.map(record => (
                  <tr key={record.animal_id}>
                    <td className="border p-2">
                      {record.images && record.images.length > 0 && (
                        <img 
                          src={`data:image/jpeg;base64,${record.images[0]}`}
                          alt={`${record.species} ${record.breed}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="border p-2">{record.species}</td>
                    <td className="border p-2">{record.breed}</td>
                    <td className="border p-2">{record.age}</td>
                    <td className="border p-2">{record.gender}</td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Share</button>
                        <button className="bg-green-500 text-white px-2 py-1 rounded">Download</button>
                      </div>
                    </td>
                  </tr>
                ))} */}
          </tbody>
        </table>
        )}
</div>

  );
};

export default IntakeManagement;