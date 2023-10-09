import React, { useState } from 'react';
import { Question } from '@/types/quiz';
import { useCurrentPerson } from '@/hooks/auth/useCurrentUser';
import { useMutation } from '@/hooks/events/useMutation';
import { toast } from 'react-toastify';
interface QuestionProps {
    questions: Question[]
    onClose?: () => void;
    answered: boolean;
}

export default function Question({ questions, answered, onClose }: QuestionProps) {
    const { post } = useMutation();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const { person } = useCurrentPerson();
    const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

    const handleQuestion = () => {
        const currentQuestionIsRequired = questions[currentQuestion].required === 'S';
        if (currentQuestionIsRequired && selectedAnswers[currentQuestion] === null) {
            toast.error('Esta resposta é obrigatória.');
            return;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        setIsButtonEnabled(false);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerSelect = (answerIndex: number) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(updatedSelectedAnswers);
        setIsButtonEnabled(false);
    };

    const isLastQuestion = currentQuestion === questions.length - 1;

    const handleSubmit = async () => {
        const currentQuestionIsRequired = questions[currentQuestion].required === 'S';
        if (currentQuestionIsRequired && selectedAnswers[currentQuestion] === null) {
            toast.error('Esta resposta é obrigatória.');
            return;
        }
        try {
            const sendAnswers: {
                pessoa_id: number;
                resposta_id: number;
            }[] = [];

            questions.forEach((question, index) => {
                const userAnswerIndex = selectedAnswers[index];
                const userAnswer = question.answers[userAnswerIndex];

                const answerInfo = {
                    pessoa_id: person!.id,
                    resposta_id: userAnswer.id,
                };

                sendAnswers.push(answerInfo);

            });
            const response = {
                respostas: sendAnswers,
            };

            const resp = await post(response);
            toast.success(resp.message);
            answered = true;
            setQuestionnaireCompleted(true);
            onClose
        } catch (e) {
            //@ts-ignore
            toast.error(e?.response?.data?.message || e);
        }
    };

    if (answered || questionnaireCompleted) {
        return (<h1 className="text-md py-5 text-center font-medium text-primary">
            O questionário já foi respondido.
        </h1>)
    }

    return (
        <>
            <div className="p-6 space-y-3">
                <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    {questions[currentQuestion].description}
                </h3>
                {questions[currentQuestion].answers.map((answer, index) => (
                    <div key={index}>
                        <label className="flex border dark:border-gray-600 rounded-md p-4 cursor-pointer items-center space-x-2">
                            <input
                                id={`radio-${index}`}
                                type="radio"
                                value={index}
                                name={`radio-group-${currentQuestion}`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={selectedAnswers[currentQuestion] === index}
                                onChange={() => handleAnswerSelect(index)}
                            />
                            <span className="text-sm font-sans text-gray-900 dark:text-gray-300">{answer.description}</span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center p-6 space-x-2 border-t border-primary-100 rounded-b dark:border-primary-500">
                <div className="flex items-center justify-center gap-2">
                    {currentQuestion + 1}
                    <div className="w-24 bg-gray-300 h-1 rounded-full">
                        <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                            }}
                        ></div>
                    </div>
                    {questions.length}
                </div>
                <div className="space-x-2">
                    {currentQuestion > 0 && (
                        <button
                            type="button"
                            onClick={handlePreviousQuestion}
                            className="btn-secondary"
                        >
                            Anterior
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={isLastQuestion ? handleSubmit : handleQuestion}
                        className="btn-secondary"
                    >
                        {isLastQuestion ? 'Enviar' : 'Próxima'}
                    </button>

                </div>
            </div>
        </>
    );
}
