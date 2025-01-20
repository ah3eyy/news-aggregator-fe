import {useMutation} from "@tanstack/react-query";
import userService from "../../services/requests/user.service.ts";

export const useSavePreference = () => {
    return useMutation({
        mutationFn: userService.savePreference,
    });
}
