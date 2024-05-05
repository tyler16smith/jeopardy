import Image from 'next/image'
import { useGameContext } from '@/context/GameContext'
import classNames from 'classnames'

const MainTileContent = () => {
  const {
    gameManagement: {
      selectedQuestion,
      showAnswer,
      dailyDoublePointsWagered,
      wageredPoints,
      setWageredPoints,
      wagerMessage,
      handleSetDailyDoubleWager,
    }
  } = useGameContext()

  return (
    <div className='w-full md:w-[70%] text-center'>
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
            value={dailyDoublePointsWagered ?? 0}
            onChange={handleSetDailyDoubleWager}
            className={classNames(
              'text-5xl text-center font-bold text-white w-full md:max-w-[500px]',
              'bg-gray-300/10 rounded-lg p-4 transition duration-200',
              'outline-none focus:ring-4 focus:ring-gray-300/50',
            )}
          />
          <button
            onClick={() => setWageredPoints(true)}
            className='bg-yellow-500 text-3xl text-white px-4 py-2 rounded-lg w-full md:max-w-[500px] font-semibold py-5'
          >
            Wager points
          </button>
          <p>{wagerMessage}</p>
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
    </div>
  )
}

export default MainTileContent