import {quizService } from "../../services";

export const useListQuiz = () => {
  const list = async (centerCostId: number, personId: number, questionDestination: number) => {
    return await quizService.list(centerCostId, personId, questionDestination);
  };
  return { list };
};
