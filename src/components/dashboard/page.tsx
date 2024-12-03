import { useState, useEffect } from 'react';
import { DataTable } from "./client-table/data-table.tsx";
import { ClientDto } from "@/models/Client.ts";
import { clientColumns } from "@/components/dashboard/client-table/columns.tsx";
import { clients } from "@/models/clientsData.ts";

async function getData(): Promise<ClientDto[]> {
    // Fetch data from your API here.
    return clients;
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
        fetchData();
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
