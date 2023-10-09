
import { Axios } from "../axios/Axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
    protected readonly http: Axios;

    public constructor(axios: Axios) {
        this.http = axios;
    }

    login = async (email: string, password: string, centerCostId: number) => {
        return await this.http.getInstance()
            .post("/login", {
                'login': email,
                'senha': password,
                'centro_custo_id': centerCostId
            })
            .then((res: any) => {
                return {
                    name: res.data.data.nome,
                    id: res.data.data.id,
                    accessToken: res.data.token,
                    expiredAt: res.data.expires_in,
                    avatar: res.data.data.foto
                };
            });
    };

    loginJwt = async (jwt: string, centerCostId: number) => {
        return await this.http.getInstance()
            .get(`/login?token=${jwt}&centro_custo_id=${centerCostId}`)
            .then((res: any) => {
                return {
                    name: res.data.data.nome,
                    id: res.data.data.id,
                    accessToken: res.data.token,
                    expiredAt: res.data.expires_in,
                    avatar: res.data.data.foto
                };
            });
    }

    forgotPassword = async (email: string, centerCostId: number) => {

        return await this.http.getInstance()
            .post("/recovery-password", {
                'login': email,
                'centro_custo_id': centerCostId
            })
            .then((res: any) => {
                return {
                    message: res.data.message
                }
            });
    };

    changePassword = async (codigo: number, password: string, confirm_password: string, centerCostId: number) => {

        return await this.http.getInstance()
            .post("/change-password", {
                'codigo': codigo,
                'senha': password,
                'confirma_senha': confirm_password,
                'centro_custo_id': centerCostId
            })
            .then((res: any) => {
                return {
                    message: res.data.message
                }
            });
    };

    getMe = async (userId: string) => {
        return await this.http.getInstance()
            .get(`/person/${userId}`, {
                headers: getAuthorizationHeader(),
            })
            .then((res: any) => {
                return res.data;
            });
    };

}
