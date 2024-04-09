import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import React from 'react'

const Game = () => {
  const { query } = useRouter()
  const gameId = query.gameId as string
  const { data: game } = api.game.getGame.useQuery({ gameId })

  const LoadingGameTiles = () => (
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    ))
  )

  return (
    <div>
      {!game ? (
        <LoadingGameTiles />
      ) : (
        <div>
          <Categories game={game} />
          <div className="grid grid-cols-5">
            {game?.questions.map((question, i) => (
              <QuestionTile key={i} question={question} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game