import LeaderBoard from '@/components/Game/LeaderBoard'
import LoadingGame from '@/components/Game/LoadingGame'
import MainBoard from '@/components/Game/MainBoard'
import SelectedTile from '@/components/Game/SelectedTile'
import { GameProvider, useGameContext } from '@/context/GameContext'

const Game = () => {
  const {
    gameManagement: {
      game,
      players,
      selectedQuestion,
    }
  } = useGameContext()

  return (
    <div className='flex justify-center items-center w-screen h-screen relative transition-all duration-300 ease-in-out'>
      {/* Tile overlay */}
      {selectedQuestion && players && (
        <SelectedTile />
      )}
      {/* Jeopardy board */}
      <div className='max-w-[1200px] w-full'>
        {!game ? <LoadingGame />
          : (
            <div>
              <p className='text-5xl tracking-wide font-bold text-center text-gray-300/20 mb-10 -mt-10'>
                {game.game.name}
              </p>
              <div className='md:flex justify-center items-start gap-10 w-full'>
                <MainBoard />
                <LeaderBoard />
              </div>
            </div>
          )}
      </div>

    </div>
  )
}

const GamePage = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}

export default GamePage