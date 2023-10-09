"use client";
import React from 'react';
import { useChangePassword } from '@/hooks/auth/useChangePassword';
import { useLogin as useLoginToken } from '@/hooks/token/useLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { changePassword } = useChangePassword();
  const { login: loginToken } = useLoginToken();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (data.get('password') !== data.get('confirm_password')) {
        toast.error("As senhas devem ser iguais.");
        return;
      }
      await loginToken('icongressolive', 'FRB:y}|Y');
      const response = await changePassword(Number(data.get('codigo')), String(data.get('password')), String(data.get('confirm_password')), Number(searchParams.get('event')));
      toast.success(response.message);
      router.push('/auth/login?event=' + searchParams.get('event'));
    } catch (e) {
      //@ts-ignore
      toast.error(e?.response?.data?.message || e);
    }
  };

  if (!searchParams.get('event')) {
    return router.push('/error/eventNotFound');
  }

  return (
    <div>
      <div className='flex justify-end p-4 absolute top-0 right-0'>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className='flex items-center mb-6 text-2xl font-semibold '>
          <Logo />
        </div>
        <div className="w-full bg-primary-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-700 dark:border-primary-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight ">
              Mudar Senha
            </h1>
            <form className="space-y-4 md:space-y-6" action="" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium ">Código</label>
                <input type="text" name="codigo" id="codigo" placeholder="Código" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">Nova senha</label>
                <input type="password" name="password" id="password" placeholder="Nova senha" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">Confirme a senha</label>
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirme a senha" required />
              </div>
              <button type="submit" className="btn-primary">
                Enviar
              </button>
              <div className="flex items-center justify-between">
                <p className="text-sm font-light ">
                  <Link href={`login?event=` + searchParams.get('event')} className="font-medium hover:underline ">Voltar para o Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}