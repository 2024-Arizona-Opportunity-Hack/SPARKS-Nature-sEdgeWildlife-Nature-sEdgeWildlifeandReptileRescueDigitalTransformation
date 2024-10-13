import React, { useState, useEffect } from 'react';
import AnimalList from '../components/AnimalList';
import AdoptionFormPopup from '../components/AdoptionFormPopup';
import axios from 'axios';
import dummyAnimals from './DummyAnimals'
import RescueFilter from '../components/RescueFilter';

const AdoptionPage = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* useEffect(() => {
    // Fetch animals from your backend
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('/api/animals');
        setAnimals(response.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []); */
  useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setAnimals(dummyAnimals);
        setFilteredAnimals(dummyAnimals);
        setError(null);
      } catch (err) {
        setError('Failed to fetch animals. Please try again later.');
        console.error('Error fetching animals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleAdopt = (animal) => {
    setSelectedAnimal(animal);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnimal(null);
  };

  const handleFilterChange = (filters) => {
    const filtered = animals.filter(animal => {
      const speciesMatch = !filters.species || animal.species === filters.species;
      const breedMatch = !filters.breed || animal.breed === filters.breed;
      const ageMatch = !filters.age || checkAgeRange(animal.age, filters.age);
      return speciesMatch && breedMatch && ageMatch;
    });
    setFilteredAnimals(filtered);
  };

  const checkAgeRange = (animalAge, filterAge) => {
    const age = parseInt(animalAge);
    switch(filterAge) {
      case '0-2 years':
        return age >= 0 && age <= 2;
      case '3-5 years':
        return age >= 3 && age <= 5;
      case '6+ years':
        return age >= 6;
      default:
        return true;
    }
  };

  if (isLoading) {
    return <div>Loading animals...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="adoptionPage">
      <h1>Rescue Animals for Adoption</h1>
      <RescueFilter animals={animals} onFilterChange={handleFilterChange} />
      <AnimalList animals={animals} onAdopt={handleAdopt} />
      {selectedAnimal && (
        <AdoptionFormPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          animal={selectedAnimal}
          formId="adoption-form-id" // Replace with your actual form ID
        />
      )}
    </div>
  );
};

export default AdoptionPage;