import { authService } from "../../services";

export const useChangePassword = () => {
  const changePassword = async (codigo: number, password: string, confirm_password: string, centerCostId: number) => {
    return await authService.changePassword(codigo, password, confirm_password, centerCostId);
  };
  return { changePassword };
};
