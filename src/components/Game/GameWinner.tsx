import React from 'react'
import ConfettiComponent from './Confetti'
import classNames from 'classnames'
import { useGameContext } from '@/context/GameContext'
import { Crown } from 'lucide-react'
import { useRouter } from 'next/router'

const GameWinner = () => {
  const {
    gameManagement: { gameWinner, setShowGameWinner }
  } = useGameContext()
  const router = useRouter()

  return (
    <div className={classNames(
      'absolute top-1/2 left-1/2 h-full w-full z-50',
      'transform -translate-x-1/2 -translate-y-1/2',
      'flex justify-center items-center border-[8px] bg-yellow-500/50',
      'border-white/20 backdrop-blur-3xl transition-opacity duration-300',
      // isVisible ? 'opacity-100' : 'opacity-0',
    )}
    >
      <button
        onClick={() => setShowGameWinner(false)}
        className='absolute top-4 right-4 bg-gray-300/20 hover:bg-gray-300/50 text-white px-4 py-2 rounded-lg transition-hover duration-300'
      >
        Close
      </button>
      <ConfettiComponent />
      <div className='flex flex-col justify-center items-center gap-16 md:gap-32'>
        <p className='text-xl md:text-4xl text-gray-300 px-4 py-2 rounded-xl bg-gray-300/10 font-medium'>
          Game Winner
        </p>
        <div className='flex justify-center items-center gap-7 relative'>
          <p className='text-3xl md:text-5xl text-white font-bold'>
            {gameWinner?.name}
          </p>
          <Crown size={75} color='yellow' className='absolute -top-[70px] -left-10 rotate-[-15deg]' />
        </div>
      </div>
      <p
        className='font-normal md:text-lg text-white hover:underline font-medium cursor-pointer mt-10 fixed bottom-10 translate-x-[-50%] left-1/2'
        onClick={() => router.push('/')}
      >
        Back to home
      </p>
    </div>
  )
}

export default GameWinner