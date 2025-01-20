import {useQuery} from "@tanstack/react-query";
import userService from "../../services/requests/user.service.ts";

export const userUser = () => {
    return useQuery(
        {
            queryKey: ["user"],
            queryFn: () => userService.user()
        }
    );
}
