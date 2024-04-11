// GameContext.tsx
import React, { createContext, useContext } from 'react'
import useGame from '@/hooks/useGame'

interface GameContextType {
  gameManagement: ReturnType<typeof useGame>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const gameManagement = useGame()

  return (
    <GameContext.Provider value={{ gameManagement }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGameContext() must be used within a GameProvider')
  }
  return context
}
