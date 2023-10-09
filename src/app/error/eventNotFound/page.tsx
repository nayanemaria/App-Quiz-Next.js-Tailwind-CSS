"use client";
import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';

export default function Login() {

  return (
    <>
      <div className='flex justify-end p-4 absolute top-0 right-0'>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Logo />
        </div>
        <div className="w-full bg-primary-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-700 dark:border-primary-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Evento não informado
            </label>
          </div>
        </div>
      </div>
    </>
  );
}