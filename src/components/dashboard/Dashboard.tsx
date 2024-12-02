import React from 'react';
import DashboardCard from "@/components/dashboard/DashboardCard.tsx";
import { ChartLine } from "@mynaui/icons-react";
import { Progress } from "@/components/ui/progress"
import DemoPage from "@/components/dashboard/page.tsx";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500" />}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500" />}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500" />}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500" />}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
                <div className="lg:col-span-2 p-6">
                    <h3 className="text-lg font-semibold mb-4 text-center">Visitors Overview</h3>
                        <DemoPage/>
                </div>

                <div className="">
                    <div className="max-w-md mx-auto  p-6 bg-[#f4f4f4]">
                        <div className="flex items-center justify-center mb-8">
                            <h2 className="text-gray-800 font-semibold ">Revenue Forecast</h2>
                        </div>
                        <div className="flex justify-center mb-8">
                            <div className="relative w-32 h-32">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <Progress value={90} />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="border border-gray-100 rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
                                    </svg>
                                </div>
                                <p className="text-sm text-center text-gray-600 mb-1">Marketing Goal</p>
                                <p className="text-xs text-center text-gray-400">$500/$1,000 USD</p>
                            </div>

                            <div className="border border-gray-100 rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <p className="text-sm text-center text-gray-600 mb-1">Teams Goal</p>
                                <p className="text-xs text-center text-gray-400">$500/$1,000 USD</p>
                            </div>

                            <div className="border border-gray-100 rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                </div>
                                <p className="text-sm text-center text-gray-600 mb-1">Leads Goal</p>
                                <p className="text-xs text-center text-gray-400">$500/$1,000 USD</p>
                            </div>

                            <div className="border border-gray-100 rounded-lg">
                                <div className="flex justify-center mb-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <p className="text-sm text-center text-gray-600 mb-1">Revenue Goal</p>
                                <p className="text-xs text-center text-gray-400">$500/$1,000 USD</p>
                            </div>
                        </div>

                        <button
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            GENERATE REPORT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
