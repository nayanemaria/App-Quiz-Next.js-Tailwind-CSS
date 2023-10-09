
import { Axios } from "../axios/Axios";

export class QuizService {
  protected readonly http: Axios;

  public constructor(axios: Axios) {
    this.http = axios;
  }

  list = async (centerCostId: number, personId: number, questionDestination: number) => {
    return await this.http.getInstance()
      .get(`/question`, {
        params: {
          centro_custo_id: centerCostId,
          pessoa_id: personId,
          destino_pergunta: questionDestination,
        },
      })
      .then((res: any) => {
        return res.data?.data?.map((d: any) => {
            return {
            title: d.descricao,
            questions: d.pergunta?.map((p: any) => {
            return {
              id: p.pergunta_id,
              description: p.descricao,
              required: p.requerido,
              response_type : p.tipo_resposta,
              order: p.ordem,
              file: p.arquivo,
              logo: p.logo,
              answers: p.resposta?.map((a: any) => {
                return {
                  id: a.resposta_id,
                  description: a.descricao,
                  other_answer: a.resposta_outros,
                  correct_answer: a.resposta_correta,
                };
              }),  
              expanded: p.expanded,
            }
          }),
          answered: d.respondido
        }
        }
       
       ); }
       
      );
  };

}
