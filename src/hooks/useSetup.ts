// useSetup hook

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { getUniqueIconAndColor } from '@/utils/colors-and-icons';
import cuid from 'cuid';
import toast from 'react-hot-toast';
import { type TPlayer } from '@/utils/types';

const useSetup = () => {
  const router = useRouter()
  const gameId = router.query.gameId as string
  // local
  const [gameName, setGameName] = useState<string | null>(null)
  const [players, setPlayers] = useState<TPlayer[] | null>(null)
  const [addPlayer, setAddPlayer] = useState<boolean>(false)
  const [loadingStartGame, setLoadingStartGame] = useState(false)
  const lastPlayerRef = useRef<HTMLDivElement | null>(null)
  // server
  const { data: setupDetails } =
    api.game.getSetupDetails.useQuery(
      { gameId },
      {
        refetchInterval: false,
        enabled: !!gameId
      },
    )
  const saveSetupDetails = api.game.saveSetupDetails.useMutation()

  useEffect(() => {
    if (setupDetails) {
      setGameName(setupDetails.game.name)
      setPlayers(setupDetails.players)
    }
  }, [setupDetails])
  console.log("PLAYERS: ", players)
  
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
    if (!gameName || !players) return
    const success = await saveSetupDetails.mutateAsync({
      gameId,
      name: gameName,
      players: players,
    })
    if (!success) {
      toast.error('Failed to save game details. Please try again later.')
      setLoadingStartGame(false)
      return
    }
    void router.push(`/g/${gameId}/play`)
  }


  const handleAddPlayer = (name: string) => {
    if (!players) return
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
      gameId,
    }
    setPlayers([
      ...players,
      newPlayer
    ])
  }

  const handleDeletePlayer = (id: string) => {
    if (!players) return
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