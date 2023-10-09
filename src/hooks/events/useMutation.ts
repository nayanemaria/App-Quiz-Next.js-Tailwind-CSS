import { eventsService } from "../../services";

export const useMutation = () => {
  const post = async (resposta: any) => {
    return await eventsService.post(resposta);
  };
  return { post };
};
