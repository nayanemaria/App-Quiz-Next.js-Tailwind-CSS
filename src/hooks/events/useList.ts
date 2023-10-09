import { eventsService } from "../../services";

export const useList = () => {
  const list = async (centerCostId: number, personId: number, questionDestination: number) => {
    return await eventsService.list(centerCostId, personId, questionDestination);
  };
  return { list };
};
