import React from 'react';
import '../Adoption.css'

const AnimalCard = ({ animal, onAdopt }) => {
  return (
    <div className="animalCard">
      <img src={animal.photoUrl} alt={animal.name} className="animalPhoto" />
      <div className="animalInfo">
        <h3 className="animalName">{animal.name}</h3>
        <p className="animalDetail">Species: {animal.species}</p>
        <p className="animalDetail">Breed: {animal.breed}</p>
        <p className="animalDetail">Age: {animal.age}</p>
        <button className="adoptButton" onClick={() => onAdopt(animal)}>Adopt</button>
      </div>
    </div>
  );
};

export default AnimalCard;