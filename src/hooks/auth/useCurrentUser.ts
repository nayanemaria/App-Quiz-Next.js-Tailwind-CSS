import { useEffect, useState } from "react";
import { Person } from "../../types/person";
import { authService } from "../../services";
import Cookies from 'js-cookie';

export const useCurrentPerson = () => {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const currentPerson = Cookies.get("currentPerson");
    if (currentPerson) {
      setPerson(JSON.parse(currentPerson));
    }
  }, []);

  const refetchPerson = async (personId: string) => {
    const personInfo = await authService.getMe(personId);
    const currentPerson = Cookies.get("currentPerson");

    if (personInfo && currentPerson) {
      const newPerson = {
        ...JSON.parse(currentPerson),
        name: personInfo.name,
        avatar: personInfo.avatar,
      };
      Cookies.set("currentPerson", JSON.stringify(newPerson));
      setPerson(newPerson);
    }
  };

  return { person, refetchPerson };
};
