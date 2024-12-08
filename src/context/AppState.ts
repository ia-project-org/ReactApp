import {ClientDto} from "@/models/Client.ts";
import React, {Dispatch, SetStateAction, useState} from "react";

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface AppState {

    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    resetPagination: () => void;

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>

    totalPages: number;
    setTotalPages:  Dispatch<SetStateAction<number | 1>>;

    // Selected Client for Detailed View
    selectedClient: ClientDto | null;
    setSelectedClient: Dispatch<SetStateAction<ClientDto | null>>;

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
