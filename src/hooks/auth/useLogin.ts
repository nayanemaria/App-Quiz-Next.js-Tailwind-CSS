import { authService } from "../../services";
import { Person } from "../../types/person";
import Cookies from 'js-cookie';

export const useLogin = () => {
  const login = async (email: string, password: string, centerCostId: number) => {
    const person = await authService.login(email, password, centerCostId);
    const now = new Date();
    person.expiredAt = new Date(now.getTime() + person.expiredAt * 1000);
    if (person) Cookies.set("currentPerson", JSON.stringify(person));
    return person as Person;
  };
  return { login };
};

export const useLoginJwt = () => {
  const login = async (jwt: string, centerCostId: number) => {
    const person = await authService.loginJwt(jwt, centerCostId);
    const now = new Date();
    person.expiredAt = new Date(now.getTime() + person.expiredAt * 1000);
    if (person) Cookies.set("currentPerson", JSON.stringify(person));
    return person as Person;
  };
  return { login };
};
