import {useEffect, useState} from 'react';
import {DataTable} from "./client-table/data-table.tsx";
import {ClientDto} from "@/models/Client.ts";
import {clientColumns} from "@/components/dashboard/client-table/columns.tsx";
import {useAppContext} from "@/context/AppContext.tsx";
import {getData} from "@/api/_callApi.ts";
import Spinner from "@/components/ui/Spinner.tsx";


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
        const result = await getData(currentPage,setTotalPages,3);
        setClients(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchData().then();
    });

    if (loading) {
        return <Spinner/>;
    }

    const columns = clientColumns(onClientDetails);

    return (
        <div className="lg:col-span-2 pr-6">
            <DataTable columns={columns} data={clients} />
        </div>
    );
}
