import React, { useState, useEffect } from 'react';
import AnimalList from '../components/AnimalList';
import AdoptionFormPopup from '../components/AdoptionFormPopup';
import axios from 'axios';
import dummyAnimals from './DummyAnimals'

const AdoptionPage = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    setAnimals(dummyAnimals)
  })

  const handleAdopt = (animal) => {
    setSelectedAnimal(animal);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnimal(null);
  };

  return (
    <div className="adoptionPage">
      <h1>Rescue Animals for Adoption</h1>
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