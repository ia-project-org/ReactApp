import React from 'react';
import {Progress} from "@/components/ui/progress"
import ClientCard from "@/components/dashboard/ClientCard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import {ClientDto} from "@/models/Client.ts";
import {Calendar, UserRoundSearchIcon} from "lucide-react";
import {EligibilityDto} from "@/models/Eligibility.ts";
import axios from "axios";
import {useAppContext} from "@/context/AppContext.tsx";
import Statistics from "@/components/dashboard/statistics.tsx";


const Dashboard: React.FC = () => {
    const {selectedClient, setSelectedClient,updateClient} = useAppContext();

    // Function to format the date to YYYY-MM-DD
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString().split('T')[0];
    };

    const handleClientDetails = (client: ClientDto) => {
        setSelectedClient(client);
    };

    const evaluatClient = async () =>{
        const eligibility = await axios.post<EligibilityDto>(`${import.meta.env.VITE_API_URL + `eligibility/${selectedClient?.clientId}`}`);
        if(selectedClient){
            const updatedClient =  {
                ...selectedClient,
                eligibility: eligibility.data,
                score: Math.random()*100
            };
            updateClient(updatedClient);
        }
    }
    
    return (
        <div className="bg-gray-100">
            <Statistics/>
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
                        {/* Evaluation Date */}
                        <div className="text-center text-xs text-gray-500 mb-4">
                            {selectedClient && (
                                <>
                                    <Calendar className="inline-block w-4 h-4 mr-1 -mt-1" />
                                    Evaluated on
                                    <span className='font-semibold text-blue-500'> {formatDate(selectedClient.eligibility.lastCheckedDate || Date.now())}</span>
                                </>
                            ) }
                        </div>


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
                            className="w-full py-3 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 ease-in-out"
                            onClick={evaluatClient}
                            disabled={selectedClient==null}
                        >
                            New Evaluation
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
