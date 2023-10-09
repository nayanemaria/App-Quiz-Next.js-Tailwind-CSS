
import { Axios } from "../axios/Axios";

export class TokenService {
    protected readonly http: Axios;

    public constructor(axios: Axios) {
        this.http = axios;
    }

    login = async (login: string, password: string) => {
        return await this.http.getInstance()
            .post("/authenticate", {
                'login': login,
                'senha': password,
            })
            .then((res: any) => {
                return {
                    name: res.data.user.displayName,
                    id: res.data.user.id,
                    accessToken: res.data.token,
                    expiredAt: res.data.expires_in,
                };
            });
    };
}
