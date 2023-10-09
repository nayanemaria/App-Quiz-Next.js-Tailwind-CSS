import { Axios } from "../axios/Axios";
import { AuthService } from "./auth.service";
import { EventsService } from "./events.service";
import { QuizService } from "./quiz.service";
import { TokenService } from "./token.service";

const http = new Axios(''); // link api
export const authService = new AuthService(http);
export const eventsService = new EventsService(http);
export const quizService = new QuizService(http);
export const tokenService = new TokenService(http);
