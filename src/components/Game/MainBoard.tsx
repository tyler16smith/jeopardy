import { useGameContext } from '@/context/GameContext'

const MainBoard = () => {
  const {
    gameManagement: {
      game,
      setSelectedQuestion,
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
          questionCategory.questions.map((question: any) => (
            <div
              key={question.id}
              onClick={() => setSelectedQuestion(question)}
              className="flex justify-center items-center w-full h-20 md:h-32 bg-gray-300/30 hover:bg-gray-300/50 rounded-lg cursor-pointer"
            >
              <div className="text-xl md:text-3xl text-white text-center">
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