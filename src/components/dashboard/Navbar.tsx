import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Bell, Message, Sidebar} from "@mynaui/icons-react";


const Navbar: React.FC = () => {
    return (
        <div className="bg-white  flex justify-between items-center py-1 px-10">

            <div className="flex items-center space-x-16">
                <Sidebar />
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
    );
};

export default Navbar;
