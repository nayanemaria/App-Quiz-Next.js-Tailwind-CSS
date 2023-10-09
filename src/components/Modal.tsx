'use client'
import React from 'react';
import Questions from './Question';
import { Question } from '@/types/quiz';
interface ModaProps {
  openModal: boolean;
  onClose: () => void;
  question: Question[];
  answered: boolean;
  file: string;
}

export default function Modal({ openModal, onClose, question, answered, file }: ModaProps) {
  return (
    <div className={`fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full ${openModal ? 'visible' : 'invisible'}`}>
      <div className="relative w-full max-w-8xl max-h-full">

        <div className="relative bg-primary-300 rounded-lg shadow dark:bg-primary-700">

          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-primary-600">
            <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="">
            {file ? (
              <iframe src={file} className='w-full h-screen' />
            ) : null}
            <div className="flex justify-center p-4">

              <div className="w-full max-w-2xl max-h-full">

                <div className="border-primary-200 dark:border-primary-600 rounded-md border-2">

                  <form >
                    <Questions questions={question} answered={answered} onClose={onClose} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
