import GameWinner from '@/components/Game/GameWinner'
import LeaderBoard from '@/components/Game/LeaderBoard'
import LoadingGame from '@/components/Game/LoadingGame'
import MainBoard from '@/components/Game/MainBoard'
import SelectedTile from '@/components/Game/Tile/SelectedTile'
import { GameProvider, useGameContext } from '@/context/GameContext'
import { Pencil } from 'lucide-react'

const Game = () => {
  const {
    gameManagement: {
      game,
      players,
      showGameWinner,
      selectedQuestion,
      handleRedirectToSetup,
    }
  } = useGameContext()

  return (
    <div className='flex justify-center items-center w-screen h-screen relative transition-all duration-300 ease-in-out'>
      {/* Game Winner Screen */}
      {showGameWinner && <GameWinner />}

      {/* Tile overlay */}
      {selectedQuestion && players && (
        <SelectedTile />
      )}
      {/* Jeopardy board */}
      <div className='max-w-[1200px] w-full'>
        {!game ? <LoadingGame />
          : (
            <div>
              <p className='-mt-10 mb-10 flex items-center justify-center gap-3 text-center text-4xl font-bold tracking-wide text-white sm:text-5xl'>
                {game.game.name}
                <Pencil size={24} className='cursor-pointer text-white/60 transition hover:text-white' onClick={handleRedirectToSetup} />
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