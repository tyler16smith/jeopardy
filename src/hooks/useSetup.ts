// useSetup hook

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { getUniqueIconAndColor } from '@/components/Setup/utils';
import cuid from 'cuid';
import toast from 'react-hot-toast';
import { TPlayer } from '@/utils/types';

const useSetup = () => {
  const router = useRouter()
  const gameId = router.query.gameId as string
  // local
  const [gameName, setGameName] = useState<string>('')
  const [players, setPlayers] = useState<TPlayer[]>([])
  const [addPlayer, setAddPlayer] = useState<boolean>(false)
  const [loadingStartGame, setLoadingStartGame] = useState(false)
  const lastPlayerRef = useRef<HTMLDivElement | null>(null)
  // server
  const saveGameDetails = api.game.saveGameDetails.useMutation()

  useEffect(() => {
    document.getElementById('new-game-name-input')?.focus()
  }, [])
  
  useEffect(() => {
    if (lastPlayerRef.current) {
      // Scroll the last player into view
      lastPlayerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [players]);

  const startGame = async () => {
    setLoadingStartGame(true)
    debugger;
    const success = await saveGameDetails.mutateAsync({
      gameId,
      name: gameName,
      players: players,
    })
    if (!success) {
      toast.error('Failed to save game details. Please try again later.')
      setLoadingStartGame(false)
      return
    }
    router.push(`/g/${gameId}/play`)
  }


  const handleAddPlayer = (name: string) => {
    if (!name) {
      toast.error('Please enter a name')
      return
    }
    const { iconId, colorId } = getUniqueIconAndColor(players)
    const newPlayer = {
      id: cuid(),
      name,
      iconId,
      colorId,
      score: 0,
      originalOrder: players.length,
    }
    setPlayers([
      ...players,
      newPlayer
    ])
  }

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  return {
    gameName,
    setGameName,
    players,
    setPlayers,
    addPlayer,
    setAddPlayer,
    loadingStartGame,
    setLoadingStartGame,
    lastPlayerRef,
    startGame,
    handleAddPlayer,
    handleDeletePlayer,
  }
}

export default useSetup