    import { useState, useEffect } from 'react';
    import { DataTable } from "../../models/clients/data-table.tsx"
    import {ClientDto} from "@/models/Client.ts";
    import {clientColumns} from "@/models/clients/columns.tsx";
    import {clients} from "@/models/clientsData.ts";

    async function getData(): Promise<ClientDto[]> {
        // Fetch data from your API here.
        return clients;
    }

    export default function DemoPage() {
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

        return (
            <div className="container mx-auto bg-[#f4f4f4]">
                <DataTable columns={clientColumns} data={data} />
            </div>
        )
    }