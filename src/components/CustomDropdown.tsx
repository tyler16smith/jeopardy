import { useState } from 'react';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="bg-gray-300/20 text-white rounded-lg mb-2 p-1">
          {options.map((option) => (
            <div
              key={option.id}
              className="px-3 py-1.5 hover:bg-gray-300/10 cursor-pointer rounded-lg"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
      <button className="bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.name}
      </button>
    </div>
  );
};

export default CustomDropdown;