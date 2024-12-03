import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter
import Navbar from '@/components/dashboard/Navbar.tsx';
import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";

const AppLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                <Routes>
                    <Route path="/table" element={<ClientTable />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<AppLayout />} />
            </Routes>
        </Router>
    );
};

export default App;
