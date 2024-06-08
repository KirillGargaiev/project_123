import React, { useState } from 'react';
import { styled } from 'goober';
import UserTable from "./UserTable";
import {UserProvider} from "./contexts/UserContext";


const animals = [
  {
    name: 'Lion',
    image: "/lion.png",
  },
  {
    name: 'Tiger',
    image: "/tiger.png",
  },
  {
    name: 'Rabbit',
    image: "/rabbit.png",
  },
];

const Content = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleToggle = (animalName: string) => {
    setSelectedAnimal(selectedAnimal === animalName ? null : animalName);
  };

  return (
    <UserProvider>
      <Container>
        <TitleContainer>
          {animals.map((animal) => (
            <Title key={animal.name} onClick={() => handleToggle(animal.name)}>
              {animal.name}
            </Title>
          ))}
        </TitleContainer>
        {selectedAnimal && (
          <ImageContainer>
            <Image
              src={`/images${animals.find(animal => animal.name === selectedAnimal)?.image}`}
              alt={selectedAnimal}
            />
          </ImageContainer>
        )}
        <UserTable/>
      </Container>
    </UserProvider>

  );
};

export default Content;

// Styled components for the layout

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TitleContainer = styled('div')`
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-bottom: 1em;
`;

const Title = styled('h2')`
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const Image = styled('img')`
  width: 300px;
  height: auto;
`;