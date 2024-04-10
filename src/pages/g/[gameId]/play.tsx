import { useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import SelectedQuestionTile from '@/components/SelectedQuestionTile'

export type Question = {
  id: string
  text: string
  answer: string
  pointValue: number
  category: {
    id: string
    title: string
    gameId: string
  }
}

const Game = () => {
  const { query } = useRouter()
  const gameId = query.gameId as string
  const { data: game } = api.game.getGame.useQuery({ gameId })
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

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
  console.log("QUESTION: ", game?.questions)

  return (
    <div className='flex justify-center items-center w-screen h-screen relative transition-all duration-300 ease-in-out'>

      {/* Div overlay */}
      {selectedQuestion && (
        <SelectedQuestionTile
          tile={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}

      {/* Jeopardy board */}
      <div className='max-w-[1000px] w-full'>
        {!game ? (
          <>
            <LoadingCategories />
            <LoadingQuestions />
          </>
        ) : (
          <div>
            <p className='text-5xl tracking-wide font-bold text-center text-gray-300/20 mb-10 -mt-10'>{game.game.name}</p>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
              {game?.categories.map((category, i) => (
                <div key={category.id} className="flex justify-center items-center w-full h-16 md:h-20 bg-gray-300/10 rounded-lg cursor-pointer">
                  <div className="text-sm md:text-xl font-bold text-gray-300 text-center">{category.title}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3 mt-1.5 md:mt-3">
              {game?.questions.map(questionCategory => (
                questionCategory.questions.map(question => (
                  <div
                    key={question.id}
                    onClick={() => setSelectedQuestion(question)}
                    className="flex justify-center items-center w-full h-20 md:h-32 bg-gray-300/30 hover:bg-gray-300/50 rounded-lg cursor-pointer"
                  >
                    <div className="text-xl md:text-3xl text-white text-center">{question.pointValue}</div>
                  </div>
                ))
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Leader board */}
      <div className='h-full p-4'>
        <p className='text-2xl font-bold text-gray-300'>Leaderboard</p>
        <div className='flex flex-col gap-2 mt-4'>
          {game?.players.map(player => (
            <div key={player.id} className='flex justify-between items-center gap-2 p-2 rounded-lg backdrop-blur-lg border-[1px] border-gray-400/20 bg-gray-400/10'>
              <div className='flex justify-center items-center gap-3'>
                <div className='w-8 h-8 rounded-full p-1' style={{ backgroundColor: player.color }}>
                  <span>{player.icon}</span>
                </div>
                <span>{player.name}</span>
              </div>
              <div className='text-2xl font-bold text-gray-300'>{player.score}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Game