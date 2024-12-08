// Create Context
import React, {createContext, ReactNode, useContext, useState} from "react";
import {AppState} from "@/context/AppState.ts";
import {ClientDto} from "@/models/Client.ts";
import {PaginationState} from "@tanstack/react-table";

const AppContext = createContext<AppState | undefined>(undefined);

// Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedClient, setSelectedClient] = useState<ClientDto | null>(null);
    const [clients, setClients] = useState<ClientDto[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 3
    });

    const [currentPage, setCurrentPage] = useState(1);

    const resetPagination = () => {
        setPagination({
            pageIndex: 0,
            pageSize: 3
        });
    };

    // Method to update a specific client
    const updateClient = (updatedClient: ClientDto) => {
        /*setClients(prevClients =>
            prevClients.map(client =>
                client.clientId === updatedClient.clientId ? updatedClient : client
            )
        );*/
        // If the updated client is the currently selected client, update it too
        setSelectedClient(prevSelected =>
            prevSelected?.clientId === updatedClient.clientId ? updatedClient : prevSelected
        );
    };

    return (
        <AppContext.Provider value={{
            selectedClient,
            setSelectedClient,
            clients,
            setClients,
            updateClient,
            pagination,
            setPagination,
            resetPagination,
            totalPages,
            setTotalPages,
            currentPage,
            setCurrentPage
        }}>
            {children}
        </AppContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
