import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use BrowserRouter
import Navbar from '@/components/dashboard/Navbar.tsx';
import React from 'react';
import DemoPage from "@/components/dashboard/page.tsx";
import Dashboard from "@/components/dashboard/Dashboard.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/nav" element={<Navbar />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
