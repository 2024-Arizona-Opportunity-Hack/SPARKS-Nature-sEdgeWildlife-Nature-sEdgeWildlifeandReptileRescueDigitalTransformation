import React from 'react';

const AnimalCard = ({ animal, onAdopt }) => {
  return (
    <div className="animal-card">
      <img src={animal.photoUrl} alt={animal.name} className="animal-photo" />
      <h3>{animal.name}</h3>
      <p>Species: {animal.species}</p>
      <p>Breed: {animal.breed}</p>
      <p>Age: {animal.age}</p>
      <button onClick={() => onAdopt(animal)}>Adopt</button>
    </div>
  );
};

export default AnimalCard;