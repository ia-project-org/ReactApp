import React from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Navbar from "@/components/dashboard/Navbar.tsx";
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import Upload from "@/pages/upload.tsx";
import keycloak from "@/auth/keycloak.ts";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import './App.css';

const RootLayout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            {/* Afficher la barre de navigation uniquement si l'utilisateur n'est pas sur la page de login */}
            {currentPath !== '/' && <Navbar />}
            <Outlet />
        </>
    );
};

// Composant pour protéger les routes privées
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!keycloak.authenticated) {
        keycloak.login(); // Rediriger vers la page de login de Keycloak si non authentifié
        return null;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <RootLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: "upload",
                    element: (
                        <main>
                            <Upload />
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
                    path: "table",
                    element: (
                        <main className="p-4">
                            {/* Ajouter votre tableau ici */}
                        </main>
                    ),
                },
            ],
        },
    ]);

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <RouterProvider router={router} />
        </ReactKeycloakProvider>
    );
};

export default App;
