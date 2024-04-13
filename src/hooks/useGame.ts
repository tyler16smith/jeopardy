// useGame.ts hook

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { TPlayer, TQuestion } from '@/utils/types';

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

  const handleAssignPoints = () => {
    // TODO: handle daily double; if correct add points, if wrong subtract points
    if (!selectedOption || !selectedQuestion) return;
    const newPoints = selectedOption.score + (
      dailyDoublePointsWagered ||
      selectedQuestion.pointValue
    );
    const newPlayer = { ...selectedOption, score: newPoints };
    setDailyDoublePointsWagered(null);
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
        refetchGame();
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
    wageredPoints,
    setWageredPoints,
  }
}

export default useGame;