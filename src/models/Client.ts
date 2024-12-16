import {EligibilityDto} from "@/models/Eligibility.ts";
import {ClientDetailsDto} from "@/models/ClientDetails.ts";

export interface ClientDto {
    clientId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cin: string;
    eligibility: EligibilityDto;
    score: number;
    details: ClientDetailsDto
}
