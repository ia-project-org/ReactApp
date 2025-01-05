import { ClientDto } from "@/models/Client.ts";
import { EligibilityDto } from "@/models/Eligibility.ts";
import { ClientDetailsDto } from "@/models/ClientDetails.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import { Notification } from "@/models/Notification.ts";

// Interface pour la réponse paginée
interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}


interface RecommendResponse {
    success: boolean;
    data: ClientDetailsDto;
    message?: string;
}

export async function recommend(clientDetails: ClientDetailsDto): Promise<ClientDetailsDto> {
    try {
        const response = await axiosInstance.post<RecommendResponse>(
            `${import.meta.env.VITE_API_URL}eligibility/recomand`,
            clientDetails, // Ajout du body de la requête
        );

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to process recommendation');
        }

        return response.data.data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Recommendation failed: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred during recommendation');
        }
    }
}

// Corrigeons le type de setTotalPages
export async function getData(
    currentPage: number,
    setTotalPages: (pages: number) => void,
    size: number
): Promise<ClientDto[]> {
    try {
        const response = await axiosInstance.get<PaginatedResponse<ClientDto>>(
            `${import.meta.env.VITE_API_URL}clients?page=${currentPage}&size=${size}`
        );

        setTotalPages(response.data.totalPages);

        return await Promise.all(
            response.data.content.map(async (client: ClientDto) => {
                try {
                    const [eligibility, details] = await Promise.all([
                        axiosInstance.get<EligibilityDto>(
                            `${import.meta.env.VITE_API_URL}eligibility/${client.clientId}`
                        ),
                        axiosInstance.get<ClientDetailsDto>(
                            `${import.meta.env.VITE_API_URL}clients/details/${client.clientId}`
                        )
                    ]);

                    return {
                        ...client,
                        eligibility: eligibility.data,
                        details: details.data,
                        score: Math.random() * 100
                    };
                } catch (error) {
                    console.error(`Error fetching data for client ${client.clientId}:`, error);
                    return {
                        ...client,
                        score: Math.random() * 100
                    };
                }
            })
        );
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        return [];
    }
}

// Interface pour la réponse des notifications
interface NotificationResponse {
    content: Notification[];
}

export async function getNotifications(): Promise<Notification[]> {
    try {
        const response = await axiosInstance.get<NotificationResponse>(
            `${import.meta.env.VITE_API_URL}eligibility/notifications`
        );
        return response.data.content;
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
        return [];
    }
}

// Corriger le type de formData
export async function importCsvFile(formData: FormData): Promise<Notification> {
    try {
        const response = await axiosInstance.post<Notification>(
            `${import.meta.env.VITE_API_URL}clients/import-csv`,
            formData
        );
        return response.data;
    } catch (error) {
        console.error('Failed to import CSV:', error);
        throw error; // Ou gérer l'erreur comme souhaité
    }
}