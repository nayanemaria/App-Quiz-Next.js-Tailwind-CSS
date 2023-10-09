import { authService } from "../../services";

export const useForgotPassword = () => {
  const forgotPassword = async (email: string, centerCostId: number) => {
    return await authService.forgotPassword(email, centerCostId);
  };
  return { forgotPassword };
};
