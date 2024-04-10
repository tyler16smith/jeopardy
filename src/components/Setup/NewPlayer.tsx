import React, { useEffect, useState } from 'react'
import Input from '../Input'
import useHotkey from '@/hooks/useHotkey'

type Props = {
  handleAddPlayer: (name: string) => void
  hideAddPlayer: () => void
}

const NewPlayer = ({ handleAddPlayer, hideAddPlayer }: Props) => {
  const [name, setName] = useState<string>('')
  useHotkey('Enter', () => {
    handleAddPlayer(name)
    setName('')
  })

  const handleOnBlur = () => {
    if (name) return
    hideAddPlayer()
  }

  useEffect(() => {
    document.getElementById('new-player-name-input')?.focus()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <Input
        id='new-player-name-input'
        value={name}
        setValue={setName}
        placeholder='Player Name'
        onBlur={handleOnBlur}
      />
      <p className='text-xs text-gray-400 italic text-end'>Enter to add player</p>
    </div>
  )
}

export default NewPlayer