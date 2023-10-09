"use client";
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Question } from '@/types/quiz';
import Image from 'next/image';
interface CardProps {
  question: Question[];
  answered: boolean;
  title: string;
  file: string;
  logo: string;
}

function Card({ question, title, answered, file, logo }: CardProps) {
  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Visualizar caso");

  useEffect(() => {
    const updateButtonText = () => {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;

      if (currentPath === "/quiz" && currentSearch === "?event=1") {
        setButtonText("Responda");
      } else if (currentPath === "/events" && currentSearch === "?event=1") {
        setButtonText("Visualizar Caso");
      }
    };
    updateButtonText();
    window.addEventListener("popstate", updateButtonText);

    return () => {
      window.removeEventListener("popstate", updateButtonText);
    };
  }, []);

  return (
    <>
      <Modal openModal={open} question={question} answered={answered} file={file} onClose={() => setOpen(false)} />
      <div className="flex flex-col sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl ">
        <div className="w-full bg-primary-300 rounded-lg shadow dark:border dark:bg-primary-700 dark:border-primary-600">
          <div className="p-6 sm:p-8 space-y-4 md:space-y-6">
            <div className="flex flex-col items-center">
              {logo ? (
                <Image width={150} height={50} src={logo} alt="Logo" />
              ) : null}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-primary mt-4">
                {title}
              </h1>
            </div>
            <button onClick={() => setOpen(true)} className='btn-primary'>{buttonText}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;