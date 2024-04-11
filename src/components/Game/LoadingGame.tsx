import React from 'react'

const LoadingGame = () => {
  const LoadingCategories = () => (
    <div className="grid grid-cols-5 gap-1 md:gap-3 w-full">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 md:h-20 bg-gray-300/5 animate-pulse rounded-lg" />
      ))}
    </div>
  )
  const LoadingQuestions = () => (
    <div className="grid grid-cols-5 gap-1 md:gap-3 w-full mt-3">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="h-20 md:h-32 bg-gray-300/10 animate-pulse rounded-lg" />
      ))}
    </div>
  )

  const LoadingLeaderboard = () => (
    <div className="w-full mt-6">
      <p className='text-2xl font-bold text-gray-300/40 mb-4'>Leaderboard</p>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 mt-2 bg-gray-300/10 animate-pulse rounded-lg" />
      ))}
    </div>
  )

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr,auto] gap-5 md:gap-10 w-full'>
      <div className='md:col-span-1 mt-10'>
        <LoadingCategories />
        <LoadingQuestions />
      </div>
      <div className='w-64 mt-5'>
        <LoadingLeaderboard />
      </div>
    </div>
  )
}

export default LoadingGame