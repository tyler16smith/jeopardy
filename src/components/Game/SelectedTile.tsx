import { useEffect } from 'react'
import classNames from 'classnames'
import CustomDropdown from './CustomDropdown'
import { useGameContext } from '@/context/GameContext'
import Image from 'next/image'

const SelectedTile = () => {
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
      dailyDoublePointsWagered,
      setDailyDoublePointsWagered,
      wageredPoints,
      setWageredPoints,
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
        case 'a':
          () => handleAssignPoints(selectedQuestion?.isDailyDouble)
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
          <h1 className='text-yellow-500 text-lg md:text-2xl font-semibold mt-2'>Wagered {dailyDoublePointsWagered || 0}</h1>
        )}
      </div>
      <div className='w-full h-full rounded-lg p-4 flex flex-col justify-center items-center'>
        {/* Double Jeopardy header */}
        {selectedQuestion?.isDailyDouble && (
          <p className='absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl text-yellow-500 font-bold'>
            DAILY DOUBLE!!
          </p>
        )}

        {selectedQuestion?.isDailyDouble && !wageredPoints ? (
          <div className='flex flex-col justify-center items-center gap-5'>
            <input
              type='number'
              value={dailyDoublePointsWagered || 0}
              onChange={(e) => setDailyDoublePointsWagered(parseInt(e.target.value))}
              className='text-5xl text-center font-bold text-white bg-gray-300/10 rounded-lg p-4 outline-none focus:ring-4 focus:ring-gray-300/50 transition duration-200'
            />
            <button
              onClick={() => setWageredPoints(true)}
              className='bg-yellow-500 text-3xl text-white px-4 py-2 rounded-lg w-full font-semibold py-5'
            >
              Wager points
            </button>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center gap-5 md:gap-16'>
            <p className='text-xl md:text-4xl text-gray-300 px-4 py-2 rounded-xl bg-gray-300/10 font-medium'>
              {showAnswer ? 'Answer' : 'Question'}:
            </p>
            <div className='flex justify-center items-center gap-7'>
              {selectedQuestion?.imageURL && !showAnswer && (
                <Image
                  src={selectedQuestion?.imageURL}
                  alt={selectedQuestion?.text}
                  width={600}
                  height={600}
                  className='rounded-lg w-full'
                />
              )}
              <p className='text-xl md:text-5xl text-white font-bold'>
                {showAnswer ? selectedQuestion?.answer : selectedQuestion?.text}
              </p>
            </div>
          </div>
        )}


        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg'
        >
          Close
        </button>
      </div>

      {/* Assign points */}
      <div className='absolute bottom-4 left-4 flex items-end gap-2'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleAssignPoints(selectedQuestion?.isDailyDouble)}
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

export default SelectedTile