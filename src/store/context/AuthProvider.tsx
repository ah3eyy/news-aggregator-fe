import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import CacheService from "../../services/cache.service.ts";
import {IUser} from "../../interface/user.ts";
import {Spin} from "antd";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, user: IUser) => void;
    logout: () => void;
    user: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    const login = (token: string, user: IUser) => {
        CacheService.login(token, user as any);
        setIsAuthenticated(true);
        setUser(user);
    };

    const logout = () => {
        CacheService.clearCache();
        window.location.href = '/login'
    };

    const checkAuthentication = () => {
        const token = CacheService.getFromCache('token');

        setLoading(false);

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const userData = CacheService.getFromCache('user');

        setIsAuthenticated(true);
        setUser(userData as any);
    }

    useEffect(() => {
        checkAuthentication();

        return checkAuthentication;
    }, [])

    if (loading) return (
        <div className={"w-full mt-[30px] flex justify-center"}>
            <Spin/>
        </div>
    )

    return (
        <>
            <AuthContext.Provider value={{isAuthenticated, login, logout, user}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
