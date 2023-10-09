import { Question } from "./quiz";

export type Events = {
    description: string;
    id: number;
    questions: Question[],
    answered: boolean
};