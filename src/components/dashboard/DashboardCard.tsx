// DashboardCard.tsx
import React from 'react';

interface DashboardCardProps {
    title: string;
    value: number;
    percentage: string;
    percentageColor: string;
    prevMonthValue: number;
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
        <div className="bg-white shadow-md rounded-md py-6 px-3">
            <div className="flex justify-between items-center -mt-4">
                {icon}
                <span className={`${percentageColor}`}>{percentage}</span>
            </div>
            <div className="text-lg font-bold my-2">
            <span className="text-lg font-bold mb-4">{title}</span>
            </div>
            <div className="flex  justify-center items-baseline">
                <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
            <div className="items-center justify-around flex mt-2 text-sm text-gray-500">
                <img src={'ArrowUpwardRounded.svg'} alt={''}/>
                <p>vs {prevMonthValue} last month</p>
            </div>
        </div>
    );
};

export default DashboardCard;