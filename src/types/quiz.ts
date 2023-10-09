export type Quiz = {
    title: string
    questions: Question[]
    answered: boolean
};
export type Question = {
    id: number
    description: string
    required: string
    response_type: number
    order: number
    file: string,
    logo: string,
    answers: Answer[]
    expanded: boolean
};
export type Answer = {
    id: number
    description: string
    other_answer: string
    correct_answer: string
};