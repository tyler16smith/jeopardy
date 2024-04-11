// SetupContext.tsx
import React, { createContext, useContext } from 'react'
import useSetup from '@/hooks/useSetup'

interface SetupContextType {
  setupManagement: ReturnType<typeof useSetup>
}

const SetupContext = createContext<SetupContextType | undefined>(undefined)

export const SetupProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const setupManagement = useSetup()

  return (
    <SetupContext.Provider value={{ setupManagement }}>
      {children}
    </SetupContext.Provider>
  )
}

export const useSetupContext = (): SetupContextType => {
  const context = useContext(SetupContext)
  if (context === undefined) {
    throw new Error('useSetupContext() must be used within a SetupProvider')
  }
  return context
}
