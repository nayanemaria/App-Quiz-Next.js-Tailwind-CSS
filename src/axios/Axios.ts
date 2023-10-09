import axios, { AxiosInstance } from "axios";
import { useLogout } from "../hooks/auth/useLogout";
import { getJwt, setJwt } from "../utils/getAuthorizationHeader";

export class Axios {
    protected readonly instance: AxiosInstance;
    public constructor(private readonly baseUrl: string) {
        this.instance = axios.create({
            baseURL: this.baseUrl,
            timeout: 0,
            timeoutErrorMessage: "Time out!",
        });
        this.instance.interceptors.response.use(response => {
            const newToken = response.headers['x-access-token'];
            if (newToken) {
                setJwt(newToken);
            }
            return response;
        }, error => {
            if (error.response.status === 401) {
                const originalRequest = error.config;
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    const token = getJwt();
                    return axios.get(`${this.baseUrl}/authenticate?token=${token}`, {})
                        .then(response => {
                            const newToken = response.data.token;
                            setJwt(newToken);
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return axios(originalRequest);
                        })
                        .catch(error => {
                            console.log('Erro ao renovar token JWT: ', error);
                            useLogout()
                            return Promise.reject(error);
                        });
                }
            }
            return Promise.reject(error);
        });
    }

    getInstance() {
        return this.instance;
    }
}