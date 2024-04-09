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
    <div className="grid grid-cols-5 gap-1 w-full">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 md:h-20 bg-gray-300/5 animate-pulse rounded-lg" />
      ))}
    </div>
  )
  const LoadingQuestions = () => (
    <div className="grid grid-cols-5 gap-1 w-full mt-3">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="h-20 md:h-32 bg-gray-300/10 animate-pulse rounded-lg" />
      ))}
    </div>
  )

  return (
    <div className='flex justify-center items-center w-screen h-screen relative transition-all duration-300 ease-in-out'>
      {selectedQuestion && (
        <SelectedQuestionTile
          tile={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
      <div className='max-w-[1000px] w-full'>
        {!game ? (
          <>
            <LoadingCategories />
            <LoadingQuestions />
          </>
        ) : (
          <div>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
              {game?.categories.map((category, i) => (
                <div key={category.id} className="flex justify-center items-center w-full h-16 md:h-20 bg-gray-300/10 rounded-lg cursor-pointer">
                  <div className="text-sm md:text-xl font-bold text-gray-300 text-center">{category.title}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3 mt-1.5 md:mt-3">
              {game?.questions.map((row, i) => (
                <div key={i}>
                  {row.questions?.map((question: Question) => (
                    <div
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                      className="mt-1.5 md:mt-3 flex justify-center items-center w-full h-20 md:h-32 bg-gray-300/30 hover:bg-gray-300/50 rounded-lg cursor-pointer"
                    >
                      <div className="text-xl md:text-3xl text-white text-center">{question.pointValue}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Game