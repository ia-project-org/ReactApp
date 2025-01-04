import React, {useCallback} from 'react';
import ClientTable from "@/components/dashboard/page.tsx";
import {ClientDto} from "@/models/Client.ts";
import {EligibilityDto} from "@/models/Eligibility.ts";
import {useAppContext} from "@/context/AppContext.tsx";
import Statistics from "@/components/dashboard/statistics.tsx";
import {ClientDetailsSection} from "@/components/dashboard/ClientDetailsSection.tsx";
import axiosInstance from "@/api/axiosInstance.ts";


const Dashboard: React.FC = () => {
    const {selectedClient, setSelectedClient,updateClient} = useAppContext();

    // Function to format the date to YYYY-MM-DD
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString().split('T')[0];
    };

    const handleClientDetails  = useCallback((client: ClientDto) => {
        console.log("Client details:", client); // Pour debug
        setSelectedClient(client);
    }, []);

    const evaluatClient = async () =>{
        const eligibility = await axiosInstance.post<EligibilityDto>(`${import.meta.env.VITE_API_URL}eligibility/${selectedClient?.clientId}`);

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

                <ClientDetailsSection evaluatClient={evaluatClient} selectedClient={selectedClient} formatDate={formatDate}/>
            </div>

        </div>
    );
};

export default Dashboard;
