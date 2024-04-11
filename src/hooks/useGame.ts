// useGame.ts hook

import { api } from '@/utils/api';
import { TPlayer, TQuestion } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useGame = () => {
  const { query } = useRouter()
  const gameId = query.gameId as string
  // local
  const [showAnswer, setShowAnswer] = useState(false);
  const [activePlayer, setActivePlayer] = useState<TPlayer | null>();
  const [selectedOption, setSelectedOption] = useState<TPlayer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<TQuestion | null>(null)
  // server
  const { data: game } = api.game.getGame.useQuery({ gameId })

  useEffect(() => {
    if (game?.players && !activePlayer) {
      // Set the active player to the first player
      setActivePlayer(game?.players[0]);
    }
  }, [game]);

  useEffect(() => {
    if (activePlayer) {
      setSelectedOption(activePlayer);
    }
  }, [activePlayer]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedQuestion(null), 300);
  };

  const handleAssignPoints = () => {
    console.log('assign points to team', selectedOption?.name);
    // Assign points logic here

    handleClose();
    // move to next player
    setTimeout(moveToNextPlayer, 300);
  };

  const moveToNextPlayer = () => {
    if (!game?.players || !activePlayer) return;
    const currentPlayerIndex = game?.players.findIndex(player => player.id === activePlayer?.id);
    const nextPlayerIndex = currentPlayerIndex === game?.players.length - 1 ? 0 : currentPlayerIndex + 1;
    setActivePlayer(game?.players[nextPlayerIndex]);
  }

  return {
    game,
    players: game?.players,
    selectedQuestion,
    setSelectedQuestion,
    showAnswer,
    setShowAnswer,
    activePlayer,
    setActivePlayer,
    selectedOption,
    setSelectedOption,
    isVisible,
    setIsVisible,
    handleClose,
    handleAssignPoints,
  }
}

export default useGame;