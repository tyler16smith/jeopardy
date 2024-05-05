import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import useHotkey from '@/hooks/useHotkey';
import { type TPlayer } from '@/utils/types';
import { nobodyPlayer } from '@/utils/players';

const PlayerDropdown = () => {
  const {
    gameManagement: {
      players,
      selectedOption,
      setSelectedOption,
    }
  } = useGameContext()
  const [isOpen, setIsOpen] = useState(false);
  useHotkey('t', () => setIsOpen(true));

  const handleSelect = (option: TPlayer) => {
    setSelectedOption(option);
    (option: TPlayer) => setSelectedOption(option)
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="bg-gray-300/20 text-white rounded-lg mb-2 p-1">
          {players?.map((option: TPlayer) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-3 py-1.5 hover:bg-gray-300/10 cursor-pointer rounded-lg transition-hover duration-300"
            >
              {option.name}
            </div>
          ))}
          <div className="border-t border-gray-300/30 my-1" />
          <div
            key={nobodyPlayer.id}
            onClick={() => handleSelect(nobodyPlayer)}
            className="px-3 py-1.5 hover:bg-gray-300/10 cursor-pointer rounded-lg transition-hover duration-300"
          >
            Nobody
          </div>
        </div>
      )}
      <button
        className="bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg transition-hover duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.name}
      </button>
    </div>
  );
};

export default PlayerDropdown;