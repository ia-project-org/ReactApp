import {ClientDto} from "@/models/Client.ts";
import {ColumnDef} from "@tanstack/react-table";

export const clientColumns = (onClientDetails: (client: ClientDto) => void): ColumnDef<ClientDto>[] => [
    {
        accessorKey: "clientId",
        header: "Client ID",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        id: "actions",
        header: "Details",
        cell: ({ row }) => (
            <button
                onClick={() => onClientDetails(row.original)}
                className="px-4 py-2 bg-blue-500 text-white rounded-[3px]"
            >
                Client Details
            </button>
        ),
    },
]