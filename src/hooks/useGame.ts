// useGame.ts hook

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { type TPlayer, type TQuestion } from '@/utils/types';
import toast from 'react-hot-toast';

const useGame = () => {
  const { query } = useRouter()
  const gameId = query.gameId as string
  // local
  const [showAnswer, setShowAnswer] = useState(false);
  const [activePlayer, setActivePlayer] = useState<TPlayer | null>();
  const [selectedOption, setSelectedOption] = useState<TPlayer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<TQuestion | null>(null)
  const [dailyDoublePointsWagered, setDailyDoublePointsWagered] = useState<number | null>(null)
  const [wageredPoints, setWageredPoints] = useState<boolean>(false)
  const wagerMessage = `You can wager up to ${activePlayer && activePlayer?.score < 1000 ? '1000' : activePlayer?.score} points.`
  // server
  const {
    data: game,
    refetch: refetchGame
  } = api.game.getGame.useQuery(
    { gameId },
    { enabled: !!gameId },
  )
  const { mutate: saveTurn } =
    api.game.savePlayerTurn.useMutation()
  const updatePoints = api.game.updatePoints.useMutation()

  useEffect(() => {
    if (game?.players && !activePlayer) {
      const nextPlayer =
        game?.players.find(player => player.onTurn) ||
        game?.players[0];
      setActivePlayer(nextPlayer);
    }
  }, [game]);

  useEffect(() => {
    if (activePlayer) {
      setSelectedOption(activePlayer);
    }
  }, [activePlayer]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowAnswer(false);
      setSelectedQuestion(null)
    }, 300);
  };

  const handleDoubleJeopardy = (result: 'correct' | 'wrong') => {
    if (!selectedOption || !selectedQuestion || !dailyDoublePointsWagered) return;
    const newPoints = result === 'correct' ?
      selectedOption.score + dailyDoublePointsWagered :
      selectedOption.score - dailyDoublePointsWagered;
    const newPlayer = { ...selectedOption, score: newPoints };
    setDailyDoublePointsWagered(null);
    updatePoints.mutate({
      player: newPlayer,
      gameId: gameId,
      questionId: selectedQuestion.id
    });
  }

  const handleAssignPoints = () => {
    if (!selectedOption || !selectedQuestion) return;
    const newPoints = selectedOption.score + selectedQuestion.pointValue
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
        setWageredPoints(false);
        void refetchGame();
      }, 300);
    }
  }, [updatePoints.isSuccess]);

  const moveToNextPlayer = () => {
    if (!game?.players || !activePlayer) return;
    const nextOrder = activePlayer.originalOrder === (game?.players.length - 1) ? 0 : activePlayer.originalOrder + 1;
    const nextPlayer = game?.players.find(player => player.originalOrder === nextOrder);
    if (!nextPlayer) return;
    setActivePlayer(nextPlayer);
    void saveTurn({
      playerId: nextPlayer.id
    })
  }

  const handleSelectQuestion = (question: TQuestion) => {
    if (question?.answeredBy) return;
    setSelectedQuestion(question);
  }

  const handleSetDailyDoubleWager = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activePlayer) return;
    const newWager = parseInt(e.target.value)
    // handle wager limits
    if (newWager < 0) {
      toast.error('You can only wager positive points.')
      return;
    }
    if (activePlayer.score < 1000 && newWager > 1000) {
      toast.error('You can only wager up to 1000 points.')
      return;
    }
    if (activePlayer.score > 1000 && newWager > activePlayer.score) {
      toast.error('You can only wager points you have.')
      return;
    }
    // set wager
    setDailyDoublePointsWagered(newWager)
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
    dailyDoublePointsWagered,
    setDailyDoublePointsWagered,
    handleDoubleJeopardy,
    wageredPoints,
    setWageredPoints,
    wagerMessage,
    handleSetDailyDoubleWager,
  }
}

export default useGame;