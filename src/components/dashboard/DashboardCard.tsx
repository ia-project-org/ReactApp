// DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string;
    percentage: string;
    percentageColor: string;
    prevMonthValue: string;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
                                                         title,
                                                         value,
                                                         percentage,
                                                         percentageColor,
                                                         prevMonthValue,
                                                         icon,
                                                     }) => {
    return (
        <div className="bg-[#f4f4f4] rounded-[3.5px] p-8 shadow-sm">
            <div className="flex items-center mb-2">
                {icon}
                <span className="text-sm text-gray-600 ml-2">{title}</span>
            </div>
            <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-semibold">{value}</h3>
                <span className={`text-sm ${percentageColor}`}>{percentage}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
                vs last month: {prevMonthValue}
            </div>
        </div>
    );
};

export default DashboardCard;