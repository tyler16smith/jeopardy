import { useEffect, useState } from 'react'
import { Question } from '@/pages/g/[gameId]/play'
import classNames from 'classnames'
import CustomDropdown from './CustomDropdown'

type Props = {
  tile: Question
  onClose: () => void
}

const SelectedQuestionTile = ({ tile, onClose }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls visibility for fade effect
  const teamOptions = [
    { id: '12345', name: 'Team 1' },
    { id: '23456', name: 'Team 2' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  useEffect(() => {
    if (tile) setIsVisible(true); // Show the tile when `tile` is updated
    // Listen for keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        case 'p':
          handleAssignPoints()
          break;
        case ' ':
          setShowAnswer(!showAnswer);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, tile]); // Added `tile` to dependency array

  const handleClose = () => {
    setIsVisible(false); // Initiate fade-out effect
    setTimeout(onClose, 300); // Delay the actual close to allow for fade-out
  };

  const handleAssignPoints = () => {
    console.log('assign points to team', selectedOption?.name);
    // Assign points logic here
    handleClose();
  };

  return (
    <div className={classNames(
      'absolute top-1/2 left-1/2 h-full w-full',
      'transform -translate-x-1/2 -translate-y-1/2',
      'flex justify-center items-center border-[8px]',
      'border-white/20 rounded-xl bg-gray-600/20 backdrop-blur-3xl',
      'transition-opacity duration-300', // Apply transition to opacity over 300ms
      isVisible ? 'opacity-100' : 'opacity-0', // Control visibility with state
    )}>
      <h1 className='absolute top-4 left-4 text-lg md:text-2xl font-semibold text-white'>
        {tile.category.title} | {tile.pointValue}
      </h1>
      <div className='w-full h-full rounded-lg p-4 flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-5 md:gap-16'>
          <p className='text-xl md:text-4xl text-gray-300 px-4 py-2 rounded-xl bg-gray-300/10 font-medium'>{showAnswer ? 'Answer' : 'Question'}:</p>
          <p className='text-xl md:text-5xl text-white'>{showAnswer ? tile.answer : tile.text}</p>
        </div>
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
        >
          Close
        </button>
      </div>
      <div className='absolute bottom-4 left-4 flex items-end gap-2'>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleAssignPoints}
            className='bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
          >
            Assign points
          </button>
          <p>to</p>
        </div>
        <CustomDropdown
          options={teamOptions}
          onSelect={(option) => setSelectedOption(option)}
        />
      </div>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className='absolute bottom-16 md:bottom-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
      >
        {showAnswer ? 'Show Question' : 'Show Answer'}
      </button>
    </div>
  )
}

export default SelectedQuestionTile