import {ClientDto} from "@/models/Client.ts";
import React, {Dispatch, SetStateAction} from "react";
import {AgentDto} from "@/models/AgentDto.ts";
import {Notification} from "@/models/Notification.ts";

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface AppState {

    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    resetPagination: () => void;

    accessToken: string;
    setAccessToken: React.Dispatch<SetStateAction<string | "">>;

    Notifications: Notification[];
    setNotifications: React.Dispatch<SetStateAction<Notification[]>>

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>

    totalPages: number;
    setTotalPages:  Dispatch<SetStateAction<number | 1>>;

    // Selected Client for Detailed View
    selectedClient: ClientDto | null;
    setSelectedClient: Dispatch<SetStateAction<ClientDto | null>>;

    connectedAgent: AgentDto | null;
    setConnectedAgent: Dispatch<SetStateAction<AgentDto | null>>;

    // Client List
    clients: ClientDto[];
    setClients: Dispatch<SetStateAction<ClientDto[]>>;

    updateClient: (client: ClientDto) => void;

    // Application-wide Configurations
    /*
    * config: {
        theme: 'light' | 'dark';
        language: string;
    };
    setConfig: Dispatch<SetStateAction<{
        theme: 'light' | 'dark';
        language: string;
    }>>;
    * */
}
