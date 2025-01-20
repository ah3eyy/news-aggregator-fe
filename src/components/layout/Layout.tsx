import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../store/context/AuthProvider.tsx";
import {Dropdown, MenuProps} from "antd";


export const Layout = () => {
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();

    const {isAuthenticated, user, logout} = useAuth();

    const nameLetters = () => {
        if (user) {
            const name = user.name.split(" ");
            const value1 = name[0].charAt(0);
            const value2 = name.length > 1 ? name[1].charAt(0) : name[0].charAt(1)
            return `${value1}${value2}`;
        }
        return '';
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href="/profile">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => logout()}>
                    Log Out
                </a>
            ),
        }
    ];

    return (
        <>
            <div className={"w-full h-full bg-white"}>
                <header className={"h-[75px] w-full bg-primary p-[16px_24px] flex items-center justify-between"}>
                    <div className={"font-bold text-[24px] text-white cursor-pointer select-none"}
                         onClick={() => navigate('/')}>
                        News Aggregator
                    </div>
                    <div className={"flex gap-[10px]"}>
                        {
                            !isAuthenticated &&
                            (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className={"bg-white text-primary p-[8px] rounded-md"}>
                                        Login
                                    </button>

                                    <button
                                        onClick={() => navigate('/register')}
                                        className={"bg-white text-primary p-[8px] rounded-md"}>
                                        Register
                                    </button>
                                </>
                            )
                        }

                        {
                            isAuthenticated &&
                            (
                                <>
                                    <Dropdown menu={{items}}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <div
                                                className={"flex flex-row items-center gap-[10px] cursor-pointer select-none"}>
                                                <div
                                                    className={"h-[36px] w-[36px] rounded-[50%] text-black bg-white uppercase flex justify-center items-center"}>
                                                    {nameLetters()}
                                                </div>

                                                <span className={"max-md:hidden"}>{user?.name}</span>
                                            </div>
                                        </a>
                                    </Dropdown>
                                </>
                            )
                        }
                    </div>
                </header>
                <main className={"w-full h-[100vh]"}>
                    <Outlet/>
                </main>
                <footer>
                    <p>&copy; {currentYear} News Aggregator. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}
