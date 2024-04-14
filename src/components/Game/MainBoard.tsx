import { useGameContext } from '@/context/GameContext'
import { type TQuestion } from '@/utils/types'
import classNames from 'classnames'

const MainBoard = () => {
  const {
    gameManagement: {
      game,
      handleSelectQuestion,
    }
  } = useGameContext()

  return (
    <div className='w-full'>
      <div className="grid grid-cols-5 gap-1.5 md:gap-3">
        {game?.categories.map((category, i) => (
          <div key={category.id} className="flex justify-center items-center w-full h-16 md:h-20 bg-gray-300/10 rounded-lg cursor-pointer">
            <div className="text-sm md:text-xl font-bold text-gray-300 text-center">
              {category.title}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5 md:gap-3 mt-1.5 md:mt-3">
        {game?.questions.map(questionCategory => (
          questionCategory.questions.map((question: TQuestion) => (
            <div
              key={question.id}
              onClick={() => handleSelectQuestion(question)}
              className={classNames(
                "flex justify-center items-center w-full h-20 md:h-32 rounded-lg", {
                "bg-gray-300/30 hover:bg-gray-300/50 text-white cursor-pointer": !question.answeredBy,
                "bg-gray-300/5 opacity-50 text-gray-500 cursor-not-allowed": question.answeredBy,
              }
              )}
            >
              <div className="text-xl md:text-3xl text-center">
                {question.pointValue}
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  )
}

export default MainBoard