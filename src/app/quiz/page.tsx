'use client'
import React, { useEffect, useState } from 'react';
import { Quiz } from '@/types/quiz';
import { useListQuiz } from '@/hooks/quiz/useListQuiz';
import Card from '@/components/Card';
import { toast } from 'react-toastify';
import { useCurrentPerson } from '../../hooks/auth/useCurrentUser';
import { useSearchParams } from 'next/navigation';

export default function Quiz() {
    const { list } = useListQuiz();
    const [quiz, setQuiz] = useState<Quiz[]>([] as Quiz[]);
    const { person } = useCurrentPerson();
    const searchParams = useSearchParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (person?.id) {
                    const response = await list(Number(searchParams.get('event')), person?.id, 19);
                    setQuiz(response);
                    return
                }
            } catch (e) {
                //@ts-ignore
                toast.error(e?.response?.data?.message || e);
            }
        };
        fetchData();
    }, [person]);

    return (
        <div>
            <div className='container mx-auto px-4 py-3 sm:py-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {quiz.length > 0 &&
                        quiz.map((quiz, i) =>
                            quiz.questions.map((question, j) => (
                                <Card key={`${i}-${j}`} question={[question]} title={question.description} file={question.file} logo={question.logo} answered={quiz.answered} />
                            ))
                        )}
                </div>
            </div>
        </div>
    );
}
