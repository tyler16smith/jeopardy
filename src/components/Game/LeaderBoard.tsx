import { useGameContext } from '@/context/GameContext'
import { colorLibrary, iconLibrary } from '../Setup/utils'
import classNames from 'classnames'
import { motion } from 'framer-motion';

const LeaderBoard = () => {
  const {
    gameManagement: { game, activePlayer }
  } = useGameContext()

  return (
    <div className='h-full'>
      <p className='text-2xl font-bold text-gray-300/40'>Leaderboard</p>
      <div className='flex flex-col gap-2 mt-4 w-full'>
        {game?.players?.map(player => (
          <motion.div
            key={player.id}
            layout // This prop enables automatic reordering with animation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              key={player.id}
              className={classNames(
                'flex justify-between items-center gap-2 p-2',
                'rounded-lg backdrop-blur-lg border-[1px]',
                'border-gray-400/20 w-full min-w-64', {
                'bg-gray-400/30 ring-2 ring-gray-300/30': player.id === activePlayer?.id,
                'bg-gray-300/10': player.id === activePlayer?.id,
              }
              )}
            >
              <div className='flex justify-center items-center gap-3'>
                <div
                  className='w-8 h-8 rounded-full p-1'
                  style={{
                    backgroundColor: colorLibrary[player.colorId]
                  }}
                >
                  <span>{iconLibrary[player.iconId]}</span>
                </div>
                <span>{player.name}</span>
              </div>
              <div className='text-2xl font-bold text-gray-300'>
                {player.score || 0}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LeaderBoard