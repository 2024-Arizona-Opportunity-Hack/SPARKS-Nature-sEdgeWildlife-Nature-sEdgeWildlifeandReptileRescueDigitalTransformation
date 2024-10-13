import React, { useState, useEffect } from 'react';

const AnimalManagement = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ name: '', species: '', breed: '', age: '' });

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch('/api/admin/animals', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAnimals(data);
      }
    } catch (err) {
      console.error('Failed to fetch animals:', err);
    }
  };

  const addAnimal = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/animals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newAnimal),
      });
      if (response.ok) {
        fetchAnimals();
        setNewAnimal({ name: '', species: '', breed: '', age: '' });
      }
    } catch (err) {
      console.error('Failed to add animal:', err);
    }
  };

  const removeAnimal = async (id) => {
    try {
      const response = await fetch(`/api/admin/animals/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        fetchAnimals();
      }
    } catch (err) {
      console.error('Failed to remove animal:', err);
    }
  };

  return (
    <div className="animal-management">
      <h2>Manage Animals</h2>
      <form onSubmit={addAnimal}>
        <input
          type="text"
          value={newAnimal.name}
          onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={newAnimal.species}
          onChange={(e) => setNewAnimal({...newAnimal, species: e.target.value})}
          placeholder="Species"
          required
        />
        <input
          type="text"
          value={newAnimal.breed}
          onChange={(e) => setNewAnimal({...newAnimal, breed: e.target.value})}
          placeholder="Breed"
          required
        />
        <input
          type="number"
          value={newAnimal.age}
          onChange={(e) => setNewAnimal({...newAnimal, age: e.target.value})}
          placeholder="Age"
          required
        />
        <button type="submit">Add Animal</button>
      </form>
      <ul className="animal-list">
        {animals.map(animal => (
          <li key={animal.id}>
            {animal.name} - {animal.species} - {animal.breed} - {animal.age} years
            <button onClick={() => removeAnimal(animal.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalManagement;