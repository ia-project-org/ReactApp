import {ClientDto} from "@/models/Client.ts";
import {ColumnDef} from "@tanstack/react-table";

export const clientColumns: ColumnDef<ClientDto>[] = [
    {
        accessorKey: "clientId",
        header: "Client ID",
    },
    {
        accessorKey: "clientDetailsId",
        header: "Client Details ID",
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
]