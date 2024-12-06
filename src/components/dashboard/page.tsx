import {useEffect, useState} from 'react';
import axios from "axios";
import {DataTable} from "./client-table/data-table.tsx";
import {ClientDto} from "@/models/Client.ts";
import {clientColumns} from "@/components/dashboard/client-table/columns.tsx";
import {EligibilityDto} from "@/models/Eligibility.ts";


async function getData(): Promise<ClientDto[]> {
    const response = await axios.get<ClientDto[]>(`${import.meta.env.VITE_API_URL+"clients"}`);
    // Use Promise.all to concurrently fetch eligibility for all clients
    return await Promise.all(
        response.data.map(async (client: ClientDto) => {
            try {
                const res = await axios.get<EligibilityDto>(`${import.meta.env.VITE_API_URL + `eligibility/${client.clientId}`}`);
                console.log(res.data);
                return {
                    ...client,
                    eligibility: res.data
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
        <div className="container mx-auto bg-[#f4f4f4]">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
