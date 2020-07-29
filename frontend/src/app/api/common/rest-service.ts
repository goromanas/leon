import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';

export interface RestServiceConfig {
    cancelTokenSource: CancelTokenSource;
    baseUrl?: string;
}

class RestService {

    private static readonly BE_BASE_URL: string = '/api';

    private readonly axiosInstance: AxiosInstance;
    private readonly cancelTokenSource: CancelTokenSource;

    constructor(config: RestServiceConfig) {
        this.cancelTokenSource = config.cancelTokenSource;

        this.axiosInstance = axios.create({
            baseURL: RestService.BE_BASE_URL,
            cancelToken: this.cancelTokenSource.token,
        });

        this.axiosInstance.interceptors.request.use(request => {
            // config request here
            return request;
        });

        this.axiosInstance.interceptors.response.use(
            response => response.data,
            error => {
                // handle exceptional BE errors here
                return Promise.reject(error.response);
            });
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config);
    }

    public post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete(url, config);
    }

    public put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put(url, data, config);
    }

    public patch<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.patch(url, data, config);
    }

}

const restService: RestService = new RestService({
    cancelTokenSource: axios.CancelToken.source(),
});

export { restService, RestService };
