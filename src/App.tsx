import {createBrowserRouter, Outlet, RouterProvider, useLocation} from 'react-router-dom';
import Navbar from '@/components/dashboard/Navbar.tsx';
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import Login from './pages/login.tsx';
import './App.css'
import React from "react";
import Upload from "@/pages/upload.tsx";
import Recommendations from './pages/recommendations.tsx';


const RootLayout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            {currentPath !== '/' && <Navbar />}
            <Outlet />
        </>
    );
};

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "upload",
                    element: (
                        <main>
                            <Upload />
                        </main>
                    ),
                },
                {
                    path: "table",
                    element: (
                        <main className="p-4">
                            <ClientTable />
                        </main>
                    ),
                },
                {
                    path: "dashboard",
                    element: (
                        <main className="p-4">
                            <Dashboard />
                        </main>
                    ),
                },
                {
                    path: "recommendations",
                    element: (
                        <main className="p-4">
                            <Recommendations />
                        </main>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;