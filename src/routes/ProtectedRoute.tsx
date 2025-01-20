import {Navigate} from "react-router-dom";
import {useAuth} from "../store/context/AuthProvider.tsx";

interface ProtectedRouteProps {
    element: JSX.Element;
}

export default function ProtectedRoute({element}: ProtectedRouteProps) {

    const {isAuthenticated} = useAuth(); // Access authentication status

    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return element;
}
