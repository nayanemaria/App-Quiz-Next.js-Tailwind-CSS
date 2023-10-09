'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function Main() {
  const searchParams = useSearchParams();
  return (
    <div>
      <div className='container mx-auto px-4 py-3 sm:py-5'>
        <div className="grid place-items-center">
          <h1 className="text-xl  text-primary font-bold leading-tight tracking-tight md:text-2xl">
            Escolha uma opção abaixo para continuar:
          </h1>
          <div className="flex space-x-4 mt-6">
            <Link href={`/quiz?event=${searchParams.get('event')}`}>
              <button className="btn-primary">
                Quiz
              </button>
            </Link>
            <Link href={`/events?event=${searchParams.get('event')}`}>
              <button className="btn-primary">
                Casos Clínicos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
