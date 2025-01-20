import CacheService from "./cache.service.ts";
import axios, {Axios, AxiosResponse} from "axios";
import {IObject} from "../interface/interface.ts";

class ApiService {
    baseUrl: string;

    axiosClient: Axios;

    constructor() {
        this.baseUrl = import.meta.env.VITE_APP_API_URL;

        this.axiosClient = axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
        });

        this.axiosClient.interceptors.request.use(this.requestInterceptor, this.errorHandler);
        this.axiosClient.interceptors.response.use(this.responseInterceptor, this.errorHandler);
    }

    async requestInterceptor(config: any) {

        const token = await CacheService.getToken();

        if (token) {
            config['headers']['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }

    async responseInterceptor(response: any) {
        return response?.data;
    }

    async errorHandler(error: any) {
        if (error?.response?.status == 401) {
            CacheService.clearCache();
            const currentPath = location.pathname;
            location.href = `/login?redirectUrl=${currentPath}`
            return;
        }
        console.log(error);
        return Promise.reject(error?.response?.data || {message: "Unable to perform request. Our engineers are looking into this error."});
    }

    async post(url: string, data: IObject, headerConfig?: any): Promise<AxiosResponse> {
        return this.axiosClient.post(url, data, headerConfig);
    }

    async get(url: string): Promise<AxiosResponse> {
        return this.axiosClient.get(url);
    }

    async put(url: string, data: IObject): Promise<AxiosResponse> {
        return this.axiosClient.put(url, data);
    }

    async delete(url: string): Promise<AxiosResponse> {
        return this.axiosClient.delete(url);
    }
}

export default new ApiService();
