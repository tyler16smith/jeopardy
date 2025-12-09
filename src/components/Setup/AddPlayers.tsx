import { Plus, Rocket } from 'lucide-react'
import classNames from 'classnames'
import NewPlayer from './NewPlayer'
import Player from '../Player'
import { useSetupContext } from '@/context/SetupContext'
import { type TPlayer } from '@/utils/types'
import { useRouter } from 'next/router'

const AddPlayers = () => {
  const { query } = useRouter()
  const editFromPlay = query.editFromPlay as string
  const {
    setupManagement: {
      gameName,
      players,
      addPlayer,
      setAddPlayer,
      loadingStartGame,
      lastPlayerRef,
      handleDeletePlayer,
      startGame,
    }
  } = useSetupContext()

  const LoadingPlayers = () => (
    Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={classNames(
          'flex justify-between items-center gap-2',
          'p-2 h-[52px] mt-1.5 bg-gray-400/10',
          'rounded-md animate-pulse',
        )}
      />
    ))
  )

  return (
    <>
      <label htmlFor="name" className='text-lg'>Players</label>
      <div className='h-full max-h-[50vh] overflow-auto scrollbar'>
        {players === null ? (
          <LoadingPlayers />
        ) : (
          players.map((player: TPlayer, index: number) => (
            <div
              key={player.id}
              ref={index === players.length - 1 ? lastPlayerRef : null}
            >
              <Player
                player={player}
                handleDelete={handleDeletePlayer}
              />
            </div>
          ))
        )}
      </div>
      {addPlayer && (
        <NewPlayer />
      )}
      <button
        onClick={() => setAddPlayer(true)}
        className={classNames(
          'flex justify-center items-center gap-2 bg-transparent',
          'hover:bg-gray-400/10 text-white p-2 rounded border-[1px]',
          'border-gray-400/20 transition duration-200 w-full outline-none focus:ring-4 focus:ring-gray-400/30',
        )}
      >
        <Plus size={24} />
        Add Players
      </button>
      <button
        disabled={!gameName || loadingStartGame}
        onClick={startGame}
        className={classNames(
          'flex justify-center items-center gap-2 mt-10',
          'p-2 rounded border-[1px] border-jeopardy/20 w-full',
          'transition duration-200 outline-none focus:ring-4 focus:ring-jeopardy/30', {
          'bg-jeopardy/80 hover:bg-jeopardy/60 text-white': (gameName && !loadingStartGame),
          'bg-jeopardy/40 text-gray-500 cursor-not-allowed': (!gameName || loadingStartGame)
        }
        )}
      >
        {loadingStartGame ? (
          <div className='w-5 h-5 border-2 border-jeopardy/80 border-t-white rounded-full animate-spin' />
        ) : (
          <Rocket size={16} />
        )}
        {editFromPlay ? 'Update Game' : 'Start Game'}
      </button>
    </>
  )
}

export default AddPlayers