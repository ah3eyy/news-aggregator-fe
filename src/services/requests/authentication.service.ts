import {ILogin, IRegister} from "../../interface/auth.ts";
import apiService from "../api.service.ts";

class AuthenticationService {
    async register(payload: IRegister) {
        return apiService.post(`authentication/register`, payload);
    }

    async login(payload: ILogin) {
        return apiService.post(`authentication/login`, payload);
    }

}

export default new AuthenticationService();
