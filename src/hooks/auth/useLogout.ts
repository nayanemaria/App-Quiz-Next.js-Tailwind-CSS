import Cookies from 'js-cookie';

export const useLogout = () => {
  const logout = () => {
    Cookies.remove("currentPerson");
  };
  return { logout };
};
