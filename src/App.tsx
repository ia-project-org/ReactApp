import {createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation} from 'react-router-dom';
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import Login from './pages/login.tsx';
import './App.css'
import React, {useEffect} from "react";
import Upload from "@/pages/upload.tsx";
import Homepage from './pages/homepage.tsx';
import Navbar from "@/components/dashboard/navbar/Navbar.tsx";
import {useAuth} from "@/keycloak/Authentification.tsx";
import axiosInstance from "@/api/axiosInstance.ts";
import Recommendations from "@/pages/Recommendations.tsx";
import {useAppContext} from "@/context/AppContext.tsx";


const RootLayout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const excludedPaths = ['/', '/login'];

    return (
        <>
            {!excludedPaths.includes(currentPath) && <Navbar />}
            <Outlet />
        </>
    );
};

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const {getToken} = useAuth();
    if (getToken()==null) {
        return <Navigate to="/" replace />;
    }

    return element; // Render element if authenticated
};

const App: React.FC = () => {
    const {useTokenCheck,setupAxiosInterceptors} = useAuth();

    // Check token on app initialization
    useTokenCheck();

    // Setup axios interceptors
    useEffect(() => {
        setupAxiosInterceptors(axiosInstance);
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Homepage />,
                },
                {
                    path: "upload",
                    element: <PrivateRoute element={ <main className="p-4"><Upload /></main>} />,
                },
                {
                    path: "dashboard",
                    element: <PrivateRoute element={<main className="p-4"><Dashboard /></main>} />,
                },
                {
                    path: "recommendations",
                    element: <PrivateRoute element={<main className="p-4"><Recommendations /></main>} />,
                },
                {
                    path: "login",
                    element: (<Login />),
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;