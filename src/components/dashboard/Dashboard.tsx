import React, {useState} from 'react';
import DashboardCard from "@/components/dashboard/DashboardCard.tsx";
import { ChartLine } from "@mynaui/icons-react";

import { Progress } from "@/components/ui/progress"
import ClientCard from "@/components/dashboard/ClientCard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import {ClientDto} from "@/models/Client.ts";
import Clients from "@/components/dashboard/client-table/Clients.tsx";
import {Cell, Legend, Pie, PieChart} from "recharts";
import {needle, renderCustomizedLabel} from "@/components/dashboard/PieChartWithNeedle.tsx";
import {UserRoundCheckIcon, UserRoundMinusIcon, UserRoundPenIcon, UserRoundSearchIcon} from "lucide-react";


const cx = 100;
const cy = 100;
const iR = 30;
const oR = 100;
const value = 50;
const statistics = [
    {
        title:"Total clients",
        value:"5659.89",
        percentage:"+2.56%",
        percentageColor:"text-green-500",
        prevMonthValue:"4,96",
    },
    {
        title:"Good",
        value:"5659.89",
        percentage:"-2.56%",
        percentageColor:"text-red-500",
        prevMonthValue:"4,96",
    },
    {
        title:"Standard",
        value:"$5,658 USD",
        percentage:"+2.56%",
        percentageColor:"text-green-500",
        prevMonthValue:"4,96",
    },
    {
        title:"Bad",
        value:"5659.89",
        percentage:"-2.56%",
        percentageColor:"text-red-500",
        prevMonthValue:"4,96",
    }
]
const data = [
    { name: 'Goo', value: 80, color: '#00ff00' },
    { name: 'Standard', value: 45, color: 'rgba(248,124,2,0.93)' },
    { name: 'Bad', value: 25, color: '#ff0000' },
];
const Dashboard: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<ClientDto | null>(null);


    const handleClientDetails = (client: ClientDto) => {
        setSelectedClient(client);
    };
    return (
        <div className="bg-gray-100">
            <div className="grid grid-cols-6 gap-4 p-6">
                {
                    statistics.map(item => (
                        <div>
                            <DashboardCard
                                title={item.title}
                                value={item.value}
                                percentage={item.percentage}
                                percentageColor={item.percentageColor}
                                prevMonthValue={item.prevMonthValue}
                                icon={<ChartLine className="w-5 h-5 text-blue-300"/>}
                            />
                        </div>
                    ))
                }
                <div className="col-span-2 bg-white shadow-md rounded-md py-6 px-3 flex">
                    <PieChart width={500} height={90}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            fill="#8884d8"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                        {needle(value, data, cx, cy, iR, oR, '#d0d000')}
                        <Legend/>
                    </PieChart>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
                {/* Client Table*/}
                <ClientTable onClientDetails={handleClientDetails}/>

                {/* Client Details Section */}
                <div className="bg-background-paper-elevation-0 rounded-lg shadow-md my-4">
                    <div className="max-w-md mx-auto p-6">
                        {/* Title */}
                        <h2 className="text-center text-slate-800 font-semibold mb-8">
                            Client Details
                        </h2>

                        {/* Progress Section */}
                        <div className="flex justify-center mb-8">
                            {selectedClient ? (
                                <div className="relative w-32 h-32">
                                    <Progress value={selectedClient?.score.toFixed(1) || 0}/>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center w-32 h-32 bg-gray-100 rounded-full">
                                    <UserRoundSearchIcon className="w-12 h-12 text-gray-400 mb-2"/>
                                    <p className="text-xs text-gray-500 text-center">
                                        Select a Client
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Client Information Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {selectedClient ? (
                                <>
                                    <ClientCard
                                        title="Monthly Income"
                                        value={selectedClient.details.monthly_inhand_salary
                                            ? `$${selectedClient.details.monthly_inhand_salary.toLocaleString()}`
                                            : 'N/A'
                                        }
                                    />
                                    <ClientCard
                                        title="Annual Income"
                                        value={selectedClient.details.annual_income
                                            ? `$${selectedClient.details.annual_income.toLocaleString()}`
                                            : 'N/A'
                                        }
                                    />
                                    <ClientCard
                                        title="Credit Utilization"
                                        value={selectedClient.details.credit_utilization_ratio
                                            ? `${selectedClient.details.credit_utilization_ratio.toFixed(2)}%`
                                            : 'N/A'
                                        }
                                    />
                                    <ClientCard
                                        title="Credit Mix"
                                        value={selectedClient.details.credit_mix || 'N/A'}
                                    />
                                </>
                            ) : (
                                <div className="col-span-2 text-center text-gray-600">
                                    Select a client to view financial details.
                                </div>
                            )}
                        </div>

                        {/* Report Generation Button */}
                        <button
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 ease-in-out"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
