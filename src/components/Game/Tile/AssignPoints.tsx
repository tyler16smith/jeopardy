import { useGameContext } from '@/context/GameContext'
import CustomDropdown from './CustomDropdown'

const AssignPoints = () => {
  const {
    gameManagement: {
      players,
      selectedQuestion,
      selectedOption,
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
            className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg'
          >
            Correct
          </button>
          <button
            onClick={() => handleDoubleJeopardy('wrong')}
            className='bg-gray-200/30 hover:bg-gray-200/50 text-white px-4 py-2 rounded-lg'
          >
            Wrong
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default AssignPoints