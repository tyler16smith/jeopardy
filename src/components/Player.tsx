import React from 'react'
import { TPlayer } from './Setup/AddPlayers'
import { Trash } from 'lucide-react'
import { colorLibrary, iconLibrary } from './Setup/utils'

type PlayerProps = {
  player: TPlayer
  handleDelete?: (id: string) => void
}

const Player = ({ player, handleDelete }: PlayerProps) => {
  return (
    <div className='flex justify-between items-center gap-2 p-2 rounded-lg backdrop-blur-lg border-[1px] border-gray-400/20 bg-gray-400/10 mt-2'>
      <div className='flex justify-center items-center gap-3'>
        <div className='w-8 h-8 rounded-full p-1' style={{ backgroundColor: colorLibrary[player?.colorId | 0] }}>
          <span>{iconLibrary[player?.iconId | 0]}</span>
        </div>
        <span>{player.name}</span>
      </div>
      {handleDelete && (
        <button
          onClick={() => handleDelete(player.id)}
          className='text-gray-500 hover:text-gray-700'
        >
          <Trash size={22} />
        </button>
      )}
    </div>
  )
}

export default Player