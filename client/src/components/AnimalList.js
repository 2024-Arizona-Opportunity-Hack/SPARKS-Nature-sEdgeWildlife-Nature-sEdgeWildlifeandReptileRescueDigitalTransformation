import React from 'react';
import AnimalCard from './AnimalCard';
import '../Adoption.css'

const AnimalList = ({ animals, onAdopt }) => {
  return (
    <div className="animalList">
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} onAdopt={onAdopt} />
      ))}
    </div>
  );
};

export default AnimalList;