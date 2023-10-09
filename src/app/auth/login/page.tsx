"use client";
import React, { useEffect } from 'react';
import { useLogin, useLoginJwt } from '@/hooks/auth/useLogin';
import { useLogin as useLoginToken } from '@/hooks/token/useLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const { login } = useLogin();
  const { login: loginJwt } = useLoginJwt();
  const searchParams = useSearchParams();

  const { login: loginToken } = useLoginToken();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (!data.get('login') || !data.get('password')) {
        toast.error("Por favor, informe o login/senha!");
        return;
      }
      await loginToken('icongressolive', 'FRB:y}|Y');
      await login(String(data.get('login')), String(data.get('password')), Number(searchParams.get('event')));
      router.push('/main?event=' + searchParams.get('event'));
    } catch (e) {
      //@ts-ignore
      toast.error(e?.response?.data?.message || e);
    }
  };

  useEffect(() => {
    if (searchParams.get('jwt')) {
      const goLoginJwt = async () => {
        await loginToken('icongressolive', 'FRB:y}|Y');
        await loginJwt(String(searchParams.get('jwt')), Number(searchParams.get('event')));
        router.push('/main?event=' + searchParams.get('event'));
      }
      goLoginJwt();
    }
  }, []);

  if (!searchParams.get('event')) {
    return router.push('/error/eventNotFound');
  }

  return (
    <>
      <div className='flex justify-end p-4 absolute top-0 right-0'>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className='flex items-center mb-6 text-2xl font-semibold text-primary'>
          <Logo />
        </div>
        <div className="w-full bg-primary-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-700 dark:border-primary-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              Entre com seus dados
            </h1>
            <form className="space-y-4 md:space-y-6" action="" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium ">Login</label>
                <input type="text" name="login" id="login" placeholder="Login" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">Senha</label>
                <input type="password" name="password" id="password" placeholder="Senha" />
              </div>
              <div className="flex items-center justify-end">
                <Link href={`forgotPassword?event=${searchParams.get("event")}`}
                  className="text-sm font-medium  hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <button type="submit" className="btn-primary ">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}