"use client";
import React, { useEffect, useState } from 'react';
import { useList } from '@/hooks/clinicalCase/useList';
import Card from '@/components/Card';
import { toast } from 'react-toastify';
import { Events } from '@/types/events';
import { useCurrentPerson } from '../../hooks/auth/useCurrentUser';
import { useRouter, useSearchParams } from 'next/navigation';


export default function Events() {
  const { list } = useList();
  const router = useRouter();
  const [events, setEvents] = useState<Events[]>([] as Events[])
  const { person } = useCurrentPerson();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!person?.id || !searchParams.get('event')) {
          return
        }
        const response = await list(Number(searchParams.get('event')), person?.id, 20);
        setEvents(response);
        return
      } catch (e) {
        //@ts-ignore
        toast.error(e?.response?.data?.message || e);
      }
    };
    fetchData();
  }, [person]);

  if (!searchParams.get('event')) {
    return router.push('/error/eventNotFound');
  }
  
  return (
    <div>
      <div className='container mx-auto px-4 py-3 sm:py-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {eventsCase.length > 0 &&
            eventsCase.map((eventsCase, i) =>
              eventsCase.questions.map((question, j) => (
                <Card key={`${i}-${j}`} question={[question]} title={question.description} file={question.file} logo={question.logo} answered={eventsCase.answered} />
              ))
            )}
        </div>
      </div>
    </div>
  );
}