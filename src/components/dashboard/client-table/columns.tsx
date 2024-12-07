import {ClientDto} from "@/models/Client.ts";
import {ColumnDef} from "@tanstack/react-table";
import OpIcon from "@/components/ui/OpIcon.tsx";

export const clientColumns = (onClientDetails: (client: ClientDto) => void): ColumnDef<ClientDto>[] => [

    {
        accessorKey: "cin",
        header: "CIN",
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => (<OpIcon firstname={row.original.firstName } lastname={row.original.lastName}/>)
    },
    {
        accessorKey: "ContactInformation",
        header: "Contact information",
        cell: ({row}) => (
            <div className="text-sm my-2">
                <span className="mx-2">{row.original.email}</span>
                <br/>
                <br/>
                <span className="text-gray-500">{row.original.phoneNumber}</span>
            </div>
        )
    },
    {
        accessorKey: "eligibility",
        header: "Eligibility",
        cell: ({ row }) => (row.original.eligibility.eligibilityResult)
    },
    {
        id: "actions",
        header: "Details",
        cell: ({ row }) => (
            <button
                onClick={() => onClientDetails(row.original)}
                className="px-4 py-2 bg-blue-500 text-white rounded-[3px]"
            >
                Details
            </button>
        ),
    },
]