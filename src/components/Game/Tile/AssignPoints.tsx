import classNames from 'classnames'
import PlayerDropdown from './PlayersDropdown'
import { useGameContext } from '@/context/GameContext'

const AssignPoints = () => {
  const {
    gameManagement: {
      players,
      selectedQuestion,
      selectedOption,
      wageredPoints,
      handleAssignPoints,
      handleDoubleJeopardy,
    }
  } = useGameContext()

  return (
    <div className='absolute bottom-4 left-4 flex items-end gap-2'>
      {selectedQuestion?.isDailyDouble ? (
        <>
          <button
            onClick={() => handleDoubleJeopardy('correct')}
            className={classNames(
              'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2',
              'rounded-lg transition-hover duration-300', {
              'opacity-50 cursor-not-allowed': !wageredPoints,
            }
            )}
          >
            Correct
          </button>
          <button
            onClick={() => handleDoubleJeopardy('wrong')}
            className={classNames(
              'bg-gray-200/30 hover:bg-gray-200/50 text-white px-4 py-2',
              'rounded-lg transition-hover duration-300', {
              'opacity-50 cursor-not-allowed': !wageredPoints,
            }
            )}
          >
            Wrong
          </button>
        </>
      ) : (
        <>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleAssignPoints}
              className='bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg transition-hover duration-300'
            >
              Assign points
            </button>
            <p>to</p>
          </div>
          {selectedOption && players && (
            <PlayerDropdown />
          )}
        </>
      )}
    </div>
  )
}

export default AssignPoints