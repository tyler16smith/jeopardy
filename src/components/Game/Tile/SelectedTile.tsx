import { useEffect } from 'react'
import classNames from 'classnames'
import { useGameContext } from '@/context/GameContext'
import AssignPoints from './AssignPoints'
import MainTileContent from './MainTileContent'

const SelectedTile = () => {
  const {
    gameManagement: {
      selectedQuestion,
      showAnswer,
      setShowAnswer,
      isVisible,
      setIsVisible,
      handleClose,
      handleAssignPoints,
      dailyDoublePointsWagered,
    }
  } = useGameContext()

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  useEffect(() => {
    if (selectedQuestion) setIsVisible(true);
    // Listen for keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        case 'p':
          handleAssignPoints();
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
  }, [showAnswer, selectedQuestion]);

  return (
    <div className={classNames(
      'absolute top-1/2 left-1/2 h-full w-full z-50',
      'transform -translate-x-1/2 -translate-y-1/2',
      'flex justify-center items-center border-[8px]',
      'border-white/20 backdrop-blur-3xl transition-opacity duration-300',
      selectedQuestion?.isDailyDouble ? 'bg-yellow-500/50' : 'bg-gray-600/20',
      isVisible ? 'opacity-100' : 'opacity-0',
    )}>
      {/* Title and points */}
      <div className='absolute top-4 left-4'>
        <h1 className='text-lg md:text-2xl font-semibold text-white'>
          {selectedQuestion?.category.title} | {selectedQuestion?.pointValue}
        </h1>
        {selectedQuestion?.isDailyDouble && (
          <h1 className='text-yellow-500 text-lg md:text-2xl font-semibold mt-2'>
            Wagered {dailyDoublePointsWagered ?? 0}
          </h1>
        )}
      </div>
      {/* Main content */}
      <div className='w-full h-full rounded-lg p-4 flex flex-col justify-center items-center'>
        <MainTileContent />
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
        >
          Close
        </button>
      </div>
      {/* Bottom action buttons */}
      <AssignPoints />
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className='absolute bottom-16 md:bottom-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
      >
        {showAnswer ? 'Show Question' : 'Show Answer'}
      </button>
    </div>
  )
}

export default SelectedTile