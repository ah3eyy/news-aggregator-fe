import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../pages/home/Home.tsx";
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";
import Profile from "../pages/profile/Profile.tsx";
import NotFound from "../pages/notfound/NotFound.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {Layout} from "../components/layout/Layout.tsx";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'profile',
                element: <ProtectedRoute element={<Profile/>}/>
            },
            {
                path: '*',
                element: <NotFound/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
]);

export default function Route() {
    return <RouterProvider router={routes}/>
}
