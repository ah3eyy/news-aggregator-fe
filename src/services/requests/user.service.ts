import apiService from "../api.service.ts";
import {ISavePreference} from "../../interface/user.ts";

class UserService {

    async user() {
        return apiService.get('user');
    }

    async savePreference(data: ISavePreference) {
        return apiService.post('user/save-preference', data as any);
    }

}

export default new UserService();
