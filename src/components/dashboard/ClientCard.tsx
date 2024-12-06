import React from 'react';
import { Accessibility } from "@mynaui/icons-react";

const ClientCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
        <div className="border border-gray-100 rounded-lg">
            <div className="flex justify-center mb-2">
                <Accessibility />
            </div>
            <p className="text-sm text-center text-gray-600 mb-1">{title}</p>
            <p className="text-xs text-center text-gray-400">{value}</p>
        </div>
    );
};

export default ClientCard;
