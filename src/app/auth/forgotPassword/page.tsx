"use client";
import React from 'react';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';
import { useLogin as useLoginToken } from '@/hooks/token/useLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { forgotPassword } = useForgotPassword();
  const { login: loginToken } = useLoginToken();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (!data.get('login')) {
        toast.error("Por favor, informe o email.");
        return;
      }
      await loginToken('icongressolive', 'FRB:y}|Y');
      const response = await forgotPassword(String(data.get('login')), Number(searchParams.get('event')));
      toast.success(response.message);
      setTimeout(() => {
        router.push('/auth/changePassword?event=' + searchParams.get('event'));
      }, 4000);
    } catch (e) {
      //@ts-ignore
      toast.error(e?.response?.data?.message || e);
    }
  };

  if (!searchParams.get('event')) {
    return router.push('/error/eventNotFound');
  }

  return (
    <>
      <div className='flex justify-end p-4 absolute top-0 right-0'>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className='flex items-center mb-6 text-2xl font-semibold '>
          <Logo />
        </div>
        <div className="w-full bg-primary-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-700 dark:border-primary-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              Esqueceu Senha
            </h1>
            <form className="space-y-4 md:space-y-6" action="" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium ">Email para recuperação de senha</label>
                <input type="text" name="login" id="login" placeholder="E-mail" />
              </div>
              <button type="submit" className="btn-primary">
                Enviar
              </button>
              <div className="flex items-center justify-between">
                <p className="text-sm font-light ">
                  <Link href={`login?event=` + searchParams.get("event")} className="font-medium">Voltar para o Login</Link>
                </p>
                <p className="text-sm font-light ">
                  <Link href={`changePassword?event=` + searchParams.get('event')} className="font-medium">Tenho o código</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}