import {useQuery} from "@tanstack/react-query";
import articleService from "../../services/requests/article.service.ts";
import {IObject} from "../../interface/interface.ts";

export const useFetchArticles = (query_params: IObject) => {
    let queryValue = '';
    const query = Object.entries(query_params as any)
    for (const q of query) {
        queryValue += `${q[0]}=${q[1]}&`;
    }
    console.log(queryValue)
    return useQuery(
        {
            queryKey: ["articles", query_params],
            queryFn: () => articleService.getArticles(queryValue)
        }
    );
}
