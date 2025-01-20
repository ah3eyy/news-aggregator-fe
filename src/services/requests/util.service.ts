import apiService from "../api.service.ts";

class UtilService {

    async categories() {
        return apiService.get('util/categories');
    }

    async sources() {
        return apiService.get('util/sources');
    }

    async author() {
        return apiService.get('util/authors');
    }


}

export default new UtilService();
