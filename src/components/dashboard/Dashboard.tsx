import React, {useState} from 'react';
import DashboardCard from "@/components/dashboard/DashboardCard.tsx";
import { ChartLine } from "@mynaui/icons-react";

import { Progress } from "@/components/ui/progress"
import ClientCard from "@/components/dashboard/ClientCard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import {ClientDto} from "@/models/Client.ts";

const Dashboard: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<ClientDto | null>(null);

    const handleClientDetails = (client: ClientDto) => {
        setSelectedClient(client);
    };
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
                        icon={<ChartLine className="w-5 h-5 text-gray-500"/>}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500"/>}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500"/>}
                    />
                </div>

                <div>
                    <DashboardCard
                        title="Active Deals"
                        value="$5,658 USD"
                        percentage="+2.56%"
                        percentageColor="text-green-500"
                        prevMonthValue="$4,963 USD"
                        icon={<ChartLine className="w-5 h-5 text-gray-500"/>}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
                {/* Client Table */}
                <div className="lg:col-span-2 pr-6">
                    <ClientTable onClientDetails={handleClientDetails}/>
                </div>

                {/* Client Details Section */}
                <div className="">
                    <div className="max-w-md mx-auto p-6 bg-[#f4f4f4]">
                        <div className="flex items-center justify-center mb-8">
                            <h2 className="text-gray-800 font-semibold">Client Details</h2>
                        </div>

                        {/* Display Progress */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-32 h-32">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <Progress value={selectedClient?.score}/>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic ClientCard Content */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {selectedClient ? (
                                <>
                                    <ClientCard
                                        title={`${selectedClient.firstName} ${selectedClient.lastName}`}
                                        value={`Email: ${selectedClient.email}`}
                                    />
                                    <ClientCard
                                        title="Phone"
                                        value={selectedClient.phoneNumber || "N/A"}
                                    />
                                    <ClientCard
                                        title={`${selectedClient.firstName} ${selectedClient.lastName}`}
                                        value={`Email: ${selectedClient.email}`}
                                    />
                                    <ClientCard
                                        title="Phone"
                                        value={selectedClient.phoneNumber || "N/A"}
                                    />
                                </>
                            ) : (
                                <p className="col-span-2 text-center text-gray-600">
                                    Select a client to view details.
                                </p>
                            )}
                        </div>

                        {/* Generate Report Button */}
                        <button
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            GENERATE REPORT
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
