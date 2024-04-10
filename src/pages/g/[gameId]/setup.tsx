import React, { useEffect, useState } from 'react'
import AddPlayers from '@/components/Setup/AddPlayers'
import Input from '@/components/Input'

const NewGame = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    document.getElementById('new-game-name-input')?.focus()
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='flex flex-col gap-3 w-full max-w-96'>
        <p className='text-2xl font-bold text-center mb-5'>{name || 'New Game'}</p>
        <label htmlFor="name" className='text-md'>Game Name</label>
        <Input id='new-game-name-input' value={name} setValue={setName} placeholder="Ex: Smith Family Jeopardy" />
        <AddPlayers gameName={name} />
      </div>
    </div>
  )
}

export default NewGame