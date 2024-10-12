import React, { useState, useEffect, useRef } from 'react';

const RescueFilter = ({ animals, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const dropdownRef = useRef(null);

  const uniqueSpecies = [...new Set(animals.map(animal => animal.species))];
  const uniqueBreeds = [...new Set(animals.map(animal => animal.breed))];
  const ageRanges = ['0-2 years', '3-5 years', '6+ years'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onFilterChange({ species, breed, age });
  }, [species, breed, age, onFilterChange]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterReset = () => {
    setSpecies('');
    setBreed('');
    setAge('');
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="filter-dropdown-toggle">
        Filter Animals {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && (
        <div className="filter-dropdown-content">
          <div className="filter-group">
            <label htmlFor="species-filter">Species:</label>
            <select
              id="species-filter"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="">All Species</option>
              {uniqueSpecies.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="breed-filter">Breed:</label>
            <select
              id="breed-filter"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option value="">All Breeds</option>
              {uniqueBreeds.map(br => (
                <option key={br} value={br}>{br}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="age-filter">Age:</label>
            <select
              id="age-filter"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
              <option value="">All Ages</option>
              {ageRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <button onClick={handleFilterReset} className="filter-reset-button">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RescueFilter;