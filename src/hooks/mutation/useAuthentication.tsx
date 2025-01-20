import {useMutation} from "@tanstack/react-query";
import authenticationService from "../../services/requests/authentication.service.ts";

export const useRegister = () => {
    return useMutation({
        mutationFn: authenticationService.register,
    });
}

export const useLogin = () => {
    return useMutation({
        mutationFn: authenticationService.login,
    });
}
