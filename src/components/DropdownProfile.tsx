"use client";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { useCurrentPerson } from "@/hooks/auth/useCurrentUser";
import { useCallback, useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function DropdownProfile() {
  const router = useRouter();
  const { logout } = useLogout();
  const { person } = useCurrentPerson();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          transition           
        "
        >
          <ul className=" flex flex-row items-center  text-sm font-medium sm:mt-0">
            <li>
              <Link href={`/main?event=${searchParams.get('event')}`} className="nav-link">Home</Link>
            </li>
            <li>
              <Link href={`/quiz?event=${searchParams.get('event')}`} className="nav-link">Quiz</Link>
            </li>
            <li>
              <Link href={`/events?event=${searchParams.get('event')}`} className="nav-link">Casos clinicos</Link>
            </li>
          </ul>
        </div>
        <ThemeSwitcher />
        <div
          onClick={toggleOpen}
          className="
        p-2
        md:py-1
        md:px-2      
        flex 
        bg-primary-200 dark:bg-primary-700
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:scale-110
        hover:shadow-md 
        transition
        "
        >
          <Bars3Icon className="w-6 h-6 text-primary" />
          <div className="hidden md:block">
            <Avatar src={person?.avatar} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/6 
          bg-primary-300
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
        >
          <div className="flex flex-col px-3 py-3  cursor-pointer">
            <ul className="flex md:hidden flex-col items-start text-md font-medium">
              <li>
                <Link href={`/main?event=${searchParams.get('event')}`} className="nav-link">Home</Link>
              </li>
              <li>
                <Link href={`/quiz?event=${searchParams.get('event')}`} className="nav-link">Quiz</Link>
              </li>
              <li>
                <Link href={`/events?event=${searchParams.get('event')}`} className="nav-link">Casos clinicos</Link>
              </li>
            </ul>
            <div className="flex flex-row items-center hover:underline " onClick={() => { logout(); router.push('/auth/login?event=' + searchParams.get('event')) }}>
              <ArrowLeftOnRectangleIcon className="w-5 h-5"/>
              <span className="text-lg">Sair</span>
            </div>
          </div>

        </div>
      )}
    </div>

  );
}