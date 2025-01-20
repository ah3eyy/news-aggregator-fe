import {useQuery} from "@tanstack/react-query";
import utilService from "../../services/requests/util.service.ts";

export const useCategories = () => {
    return useQuery(
        {
            queryKey: ["categories"],
            queryFn: () => utilService.categories()
        }
    );
}

export const useSources = () => {
    return useQuery(
        {
            queryKey: ["sources"],
            queryFn: () => utilService.sources()
        }
    );
}

export const userAuthor = () => {
    return useQuery(
        {
            queryKey: ["author"],
            queryFn: () => utilService.author()
        }
    );
}
