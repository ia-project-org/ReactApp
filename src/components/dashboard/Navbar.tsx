import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Bell, Message, Sidebar} from "@mynaui/icons-react";
import OpIcon from "@/components/ui/OpIcon.tsx";
import {string} from "zod";
import {Heart, Home, UserPlus} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";

export const routes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: () => ('')
    },
    {
        name: 'Recommendations',
        path: '/recommendations',
        icon: () => ('')
    },
    {
        name: 'New Clients',
        path: '/upload',
        icon: () => ('')
    }
];

const Navbar: React.FC = () => {
    const [firstname, setFirstname] = useState<string>('John');
    const [lastname, setLastname] = useState<string>('Doe');
    const [selectedRoute, setSelectedRoute] = useState<string>('Dashboard');
    const [selectedRoutePath, setSelectedRoutePath] = useState<string>('dashboard');
    const navigation = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const handleLogout = () => {
        console.log('Logging out...');
        // localStorage.removeItem('authToken');
        // router.push('/');
    };
    
    useEffect(()=>{
        navigation(selectedRoutePath);
    },[navigation, selectedRoute])
    return (
        <>
            <div className="flex justify-between items-center bg-white py-4 px-6 shadow-md">
                {/* Left side - Welcome message */}
                <h1 className="text-2xl font-bold">Welcome back, {firstname} {lastname}</h1>

                {/* Middle - Navigation Routes */}
                <div className="flex items-center space-x-4">
                    {routes.map((route) => (
                        <button
                            key={route.name}
                            className={`
                                flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300
                                ${currentPath === route.path
                                ? 'text-gray-500 bg-gray-50 border-b-2 border-orange-400'
                                : 'hover:bg-gray-100 text-gray-700'}
                            `}
                            onClick={() => {
                                setSelectedRoute(route.name);
                                setSelectedRoutePath(route.path)
                            }}
                        >
                            <route.icon />
                            <span className="text-sm font-medium">{route.name}</span>
                        </button>
                    ))}
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center space-x-4">

                    <div className="relative">
                        <button
                            className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Logout Button */}
                    <div className="relative">
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="relative rounded-[100px] bg-components-avatar-fill flex flex-col items-center justify-center text-center text-xl text-background-paper-elevation-0 font-avatar-initialslg">
                        <div
                            className="w-10 absolute !m-[0] top-[calc(50%_-_10px)] left-[calc(50%_-_20px)] tracking-[0.14px] leading-[20px] flex items-center justify-center z-[0]">
                            {firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}
                        </div>
                        <div className="w-10 relative h-10 [transform:_rotate(-90deg)] z-[1]"/>
                    </div>

                </div>
            </div>
            {/*
                        <div className="bg-white  flex justify-between items-center py-1 px-10">

                <div className="flex items-center space-x-16">
                    <span className="text-xl font-semibold text-gray-700">Dashboard</span>
                </div>
                <div className="flex items-center space-x-6">
                <button className="text-gray-600 focus:outline-none">
                        <Message/>
                    </button>
                    <button className="text-gray-600 focus:outline-none">
                        <Bell/>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 focus:outline-none">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </button>
                </div>
            </div>
            */}
        </>

    );
};

export default Navbar;
