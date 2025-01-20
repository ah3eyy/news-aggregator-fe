import apiService from "../api.service.ts";

class ArticleService {

    async getArticles(query: string) {
        return apiService.get(`articles?${query}`);
    }

}

export default new ArticleService();
