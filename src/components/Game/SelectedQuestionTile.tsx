import { useEffect } from 'react'
import classNames from 'classnames'
import CustomDropdown from './CustomDropdown'
import { useGameContext } from '@/context/GameContext'

const SelectedQuestionTile = () => {
  const {
    gameManagement: {
      players,
      selectedQuestion,
      showAnswer,
      setShowAnswer,
      selectedOption,
      isVisible,
      setIsVisible,
      handleClose,
      handleAssignPoints,
    }
  } = useGameContext()

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  useEffect(() => {
    if (selectedQuestion) setIsVisible(true); // Show the tile when `tile` is updated
    // Listen for keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        case 'a':
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
  }, [showAnswer, selectedQuestion]); // Added `tile` to dependency array

  return (
    <div className={classNames(
      'absolute top-1/2 left-1/2 h-full w-full z-50',
      'transform -translate-x-1/2 -translate-y-1/2',
      'flex justify-center items-center border-[8px]',
      'border-white/20 rounded-xl bg-gray-600/20 backdrop-blur-3xl',
      'transition-opacity duration-300',
      isVisible ? 'opacity-100' : 'opacity-0',
    )}>
      <h1 className='absolute top-4 left-4 text-lg md:text-2xl font-semibold text-white'>
        {selectedQuestion?.category.title} | {selectedQuestion?.pointValue}
      </h1>
      <div className='w-full h-full rounded-lg p-4 flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-5 md:gap-16'>
          <p className='text-xl md:text-4xl text-gray-300 px-4 py-2 rounded-xl bg-gray-300/10 font-medium'>
            {showAnswer ? 'Answer' : 'Question'}:
          </p>
          <p className='text-xl md:text-5xl text-white'>
            {showAnswer ? selectedQuestion?.answer : selectedQuestion?.text}
          </p>
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
        {selectedOption && players && (
          <CustomDropdown />
        )}
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