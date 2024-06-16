import React, { useState } from 'react';
import { styled } from 'goober';
import UserTable from "./UserTable";
import {UserProvider} from "./contexts/UserContext";


const animals = [
  {
    name: 'Lion',
    image: "/lion.png",
    description: "The lion is known as the king of the jungle. It is a large, muscular cat with a short, tawny coat and a tufted tail.",
  },
  {
    name: 'Tiger',
    image: "/tiger.png",
    description: 'The tiger is the largest species among the Felidae and classified in the genus Panthera. It is most recognizable for its dark vertical stripes on orange-brown fur with a lighter underside.',
  },
  {
    name: 'Rabbit',
    image: "/rabbit.png",
    description: 'Rabbits are small mammals in the family Leporidae. They are known for their long ears, large hind legs, and a short, fluffy tail.',
  },
  {
    name: "Time table",
    image: "/timetable.png",
    description: '\tSunday : phisic  math  math  eng  eng  IT  IT\n' +
        '\tMonday : Hebrew  History  Eng  IT  IT  IT  IT\n' +
        '\tTuesday : Hebrew  Hebrew  IT  IT  Sport  Eng  Eng\n' +
        '\tWednesday : Sport  Rus  Phisic  Phisica  History  History  Math  MAth\n' +
        '\tThursday : Math  Math  IT  IT  Phisic  Phisic'
  },
  {
    name: 'Contact me',
    image: "/contact.png",
    description: 'bulava-art@ukr.net',
  }
];

const Content = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleToggle = (animalName: string) => {
    setSelectedAnimal(selectedAnimal === animalName ? null : animalName);
  };

  const selectedAnimalData = animals.find(animal => animal.name === selectedAnimal);


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
        {selectedAnimalData && (
          <AnimalInfoContainer>
            <ImageContainer>
              <Image
                 src={`/images${selectedAnimalData.image}`}
                 alt={selectedAnimalData.name}
              />
            </ImageContainer>
            <Description>
              {selectedAnimalData.description}
            </Description>
          </AnimalInfoContainer>
        )}
        <UserTable/>
      </Container>
    </UserProvider>

  );
};

export default Content;

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

const ImageContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const Image = styled("img")`
  width: 300px;
  height: auto;
`;

const AnimalInfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled("p")`
  margin-top: 1em;
  text-align: center;
  max-width: 500px;
`;