import { tokenService } from "../../services";
import { User } from "../../types/user";
import Cookies from 'js-cookie';

export const useLogin = () => {
  const login = async (login: string, password: string) => {
    const user = await tokenService.login(login, password);
    const now = new Date();
    user.expiredAt = new Date(now.getTime() + user.expiredAt * 1000);
    if (user) Cookies.set("currentUser", JSON.stringify(user));
    return user as User;
  };
  return { login };
};
