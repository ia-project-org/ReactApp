import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DataTable} from "./client-table/data-table.tsx";
import {ClientDto} from "@/models/Client.ts";
import {clientColumns} from "@/components/dashboard/client-table/columns.tsx";
import {EligibilityDto} from "@/models/Eligibility.ts";
import {clients} from "@/models/ClientsData.ts";
import Clients from "@/components/dashboard/client-table/Clients.tsx";
import {ClientDetailsDto} from "@/models/ClientDetails.ts";


async function getData(): Promise<ClientDto[]> {
    const response = await axios.get<ClientDto[]>(`${import.meta.env.VITE_API_URL+"clients"}`);
    // Use Promise.all to concurrently fetch eligibility for all clients
    return await Promise.all(
        response.data.map(async (client: ClientDto) => {
            try {
                const eligibility = await axios.get<EligibilityDto>(`${import.meta.env.VITE_API_URL + `eligibility/${client.clientId}`}`);
                const details = await axios.get<ClientDetailsDto>(`${import.meta.env.VITE_API_URL + `clients/details/${client.clientId}`}`);
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

export default function ClientTable({ onClientDetails }: ClientTableProps) {
    const [data, setData] = useState<ClientDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getData();
            setData(result);
            setLoading(false);
        }
        fetchData().then();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const columns = clientColumns(onClientDetails);

    return (
        <div className="lg:col-span-2 pr-6">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
