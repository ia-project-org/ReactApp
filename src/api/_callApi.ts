import {ClientDto} from "@/models/Client.ts";
import {EligibilityDto} from "@/models/Eligibility.ts";
import {ClientDetailsDto} from "@/models/ClientDetails.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import {Notification} from "@/models/Notification.ts";




export async function getData(currentPage: number,setTotalPages: never,size: number): Promise<ClientDto[]> {
    const response = await axiosInstance.get<ClientDto[]>(
        `${import.meta.env.VITE_API_URL}clients?page=${currentPage}&size=${size}`
    );

    return await Promise.all(
        response.data.content.map(async (client: ClientDto) => {
            try {
                const eligibility = await axiosInstance.get<EligibilityDto>(`${import.meta.env.VITE_API_URL + `eligibility/${client.clientId}`}`);
                const details = await axiosInstance.get<ClientDetailsDto>(`${import.meta.env.VITE_API_URL + `clients/details/${client.clientId}`}`);
                setTotalPages(response.data.totalPages);
                return {
                    ...client,
                    eligibility: eligibility.data,
                    details: details.data,
                    score: Math.random()*100
                };
            } catch (error) {
                console.error(`Error fetching eligibility for client ${client.clientId}`, error);
                return client;
            }
        })
    );




}

export async function getNotifications(): Promise<Notification[]> {
    try {
        const response = await axiosInstance.get<Notification[]>(
            `${import.meta.env.VITE_API_URL}eligibility/notifications`
        );
        return response.data.content;
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
        return []; // Return empty array or handle error as needed
    }
}

export async function importCsvFile(formData: never): Promise<Notification> {
    const response = await axiosInstance.post<Notification>(
        `${import.meta.env.VITE_API_URL}clients/import-csv`,formData
    );
    return response.data;
}