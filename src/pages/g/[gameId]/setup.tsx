import AddPlayers from '@/components/Setup/AddPlayers'
import Input from '@/components/Input'
import {
  SetupProvider,
  useSetupContext
} from '@/context/SetupContext'

const NewGame = () => {
  const {
    setupManagement: {
      gameName,
      setGameName,
    }
  } = useSetupContext()

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='flex flex-col gap-3 w-full max-w-96'>
        <p className='text-2xl font-bold text-center mb-5'>
          {gameName && gameName.length > 0 ? gameName : 'New Game'}
        </p>
        <label htmlFor="name" className='text-md'>
          Game Name
        </label>
        <Input
          id='new-game-name-input'
          value={gameName}
          setValue={setGameName}
          placeholder="Ex: Smith Family Jeopardy"
        />
        <AddPlayers />
      </div>
    </div>
  )
}

const NewGamePage = () => {
  return (
    <SetupProvider>
      <NewGame />
    </SetupProvider>
  )
}

export default NewGamePage