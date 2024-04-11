import { Plus, Rocket } from 'lucide-react'
import classNames from 'classnames'
import NewPlayer from './NewPlayer'
import Player from '../Player'
import { useSetupContext } from '@/context/SetupContext'

const AddPlayers = () => {
  const {
    setupManagement: {
      gameName,
      players,
      addPlayer,
      setAddPlayer,
      loadingStartGame,
      lastPlayerRef,
      handleDeletePlayer,
      handleAddPlayer,
      startGame,
    }
  } = useSetupContext()

  return (
    <>
      <label htmlFor="name" className='text-lg'>Players</label>
      <div className='h-full max-h-[50vh] overflow-auto scrollbar'>
        {players.map((player, index) => (
          <div key={player.id} ref={index === players.length - 1 ? lastPlayerRef : null}>
            <Player player={player} handleDelete={handleDeletePlayer} />
          </div>
        ))}
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
        disabled={!gameName}
        onClick={startGame}
        className={classNames(
          'flex justify-center items-center gap-2 mt-10',
          'p-2 rounded border-[1px] border-[#6233a6]/20 w-full',
          'transition duration-200 outline-none focus:ring-4 focus:ring-[#6233a6]/30', {
          'bg-[#6233a6]/80 hover:bg-[#6233a6]/60 text-white': gameName,
          'bg-[#6233a6]/40 text-gray-500 cursor-not-allowed': !gameName
        }
        )}
      >
        {loadingStartGame ? (
          <div className='w-5 h-5 border-2 border-t-[#6233a6]/80 rounded-full animate-spin' />
        ) : (
          <Rocket size={16} />
        )}
        Start Game
      </button>
    </>
  )
}

export default AddPlayers