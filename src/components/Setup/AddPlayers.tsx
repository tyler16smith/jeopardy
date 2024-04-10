import React, { useEffect, useRef, useState } from 'react'
import NewPlayer from './NewPlayer'
import cuid from 'cuid'
import Player from '../Player'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { getUniqueIconAndColor } from './utils'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

export interface TPlayer {
  id: string
  name: string
  iconId: string
  colorId: string
}

const AddPlayers = (gameName: string) => {
  const router = useRouter()
  const gameId = router.query.gameId as string
  const [players, setPlayers] = useState<TPlayer[]>([])
  const [addPlayer, setAddPlayer] = useState<boolean>(false)
  const [loadingStartGame, setLoadingStartGame] = useState(false)
  const saveGameDetails = api.game.saveGameDetails.useMutation()
  const lastPlayerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (lastPlayerRef.current) {
      // Scroll the last player into view
      lastPlayerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [players]);

  const startGame = async () => {
    setLoadingStartGame(true)
    debugger;
    const success = await saveGameDetails.mutateAsync({
      gameId,
      name: gameName,
      players: []
    })
    if (!success) {
      toast.error('Failed to save game details. Please try again later.')
      setLoadingStartGame(false)
      return
    }
    router.push(`/g/${gameId}/play`)
  }


  const handleAddPlayer = (name: string) => {
    if (!name) {
      toast.error('Please enter a name')
      return
    }
    const { iconId, colorId } = getUniqueIconAndColor(players)
    const newPlayer = {
      id: cuid(),
      name,
      iconId,
      colorId,
    }
    setPlayers([
      ...players,
      newPlayer
    ])
  }

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id))
  }

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
        <NewPlayer
          handleAddPlayer={handleAddPlayer}
          hideAddPlayer={() => setAddPlayer(false)}
        />
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
        disabled={!name}
        onClick={startGame}
        className={classNames(
          'flex justify-center items-center gap-2 mt-10',
          'p-2 rounded border-[1px] border-[#6233a6]/20 w-full',
          'transition duration-200 outline-none focus:ring-4 focus:ring-[#6233a6]/30', {
          'bg-[#6233a6]/80 hover:bg-[#6233a6]/60 text-white': name,
          'bg-[#6233a6]/40 text-gray-500 cursor-not-allowed': !name
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