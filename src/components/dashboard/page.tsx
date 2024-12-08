import {useEffect, useState} from 'react';
import axios from "axios";
import {DataTable} from "./client-table/data-table.tsx";
import {ClientDto} from "@/models/Client.ts";
import {clientColumns} from "@/components/dashboard/client-table/columns.tsx";
import {EligibilityDto} from "@/models/Eligibility.ts";
import {ClientDetailsDto} from "@/models/ClientDetails.ts";
import {useAppContext} from "@/context/AppContext.tsx";


async function getData(currentPage: number,setTotalPages: number): Promise<ClientDto[]> {
    const response = await axios.get<ClientDto[]>(`${import.meta.env.VITE_API_URL+`clients?page=${currentPage}&size=3`}`);
    // Use Promise.all to concurrently fetch eligibility for all clients
    return await Promise.all(
        response.data.content.map(async (client: ClientDto) => {
            try {
                const eligibility = await axios.get<EligibilityDto>(`${import.meta.env.VITE_API_URL + `eligibility/${client.clientId}`}`);
                const details = await axios.get<ClientDetailsDto>(`${import.meta.env.VITE_API_URL + `clients/details/${client.clientId}`}`);
                setTotalPages(response.data.totalPages)
                return {
                    ...client,
                    eligibility: eligibility.data,
                    details: details.data,
                    score: Math.random()*100
                };
            } catch (error) {
                // Handle potential errors in eligibility fetch
                console.error(`Error fetching eligibility for client ${client.clientId}`, error);
                return client;
            }
        })
    );
}

interface ClientTableProps {
    onClientDetails: (client: ClientDto) => void;
}

export default function ClientTable({ onClientDetails }: ClientTableProps,) {
    const [loading, setLoading] = useState(true);
    const {
        clients,
        setClients,
        currentPage,
        setTotalPages
    } = useAppContext();

    async function fetchData() {
        const result = await getData(currentPage,setTotalPages);
        setClients(result);
        setLoading(false);
    }
    
    useEffect(() => {
        fetchData().then();
    },[]);

    useEffect(() => {
        fetchData().then();
    },[currentPage]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const columns = clientColumns(onClientDetails);

    return (
        <div className="lg:col-span-2 pr-6">
            <DataTable columns={columns} data={clients} />
        </div>
    );
}
