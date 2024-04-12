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
  const {
    data: game,
    refetch: refetchGame
  } = api.game.getGame.useQuery({ gameId })
  const updatePoints = api.game.updatePoints.useMutation()

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
    if (!selectedOption || !selectedQuestion) return;
    const newPoints = selectedOption.score + selectedQuestion.pointValue;
    const newPlayer = { ...selectedOption, score: newPoints };
    updatePoints.mutate({
      player: newPlayer,
      gameId: gameId,
      questionId: selectedQuestion.id
    });
  };

  useEffect(() => {
    if (updatePoints.isSuccess) {
      handleClose();
      // move to next player and refetch scores
      setTimeout(() => {
        moveToNextPlayer();
        refetchGame();
      }, 300);
    }
  }, [updatePoints.isSuccess]);

  const moveToNextPlayer = () => {
    debugger
    if (!game?.players || !activePlayer) return;
    const nextOrder = activePlayer.originalOrder === (game?.players.length - 1) ? 0 : activePlayer.originalOrder + 1;
    const nextPlayer = game?.players.find(player => player.originalOrder === nextOrder);
    setActivePlayer(nextPlayer);
  }

  const handleSelectQuestion = (question: TQuestion) => {
    if (question?.answeredBy) return;
    setSelectedQuestion(question);
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
    handleSelectQuestion,
  }
}

export default useGame;