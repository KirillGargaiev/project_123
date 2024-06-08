import {styled} from "goober";
import {ReactElement, useState} from "react";

export const MultiSelectDropdown = ({ options, selectedOptions, onChange }: { options: string[], selectedOptions: string[], onChange: (selected: string[]) => void }): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(selected => selected !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select subjects'}
        <span>{isOpen ? '▲' : '▼'}</span>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownListItem key={option} onClick={() => handleOptionClick(option)}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              <Label>{option}</Label>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled('div')`
  position: relative;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0.5em 0;
  cursor: pointer;
  z-index: 100;
`;

const DropdownHeader = styled('div')`
  padding: 0.5em;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled('div')`
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: 0;
  z-index: 150;
`;

const DropdownListItem = styled('div')`
  padding: 0.5em;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Label = styled('label')`
  margin-left: 0.5em;
`;