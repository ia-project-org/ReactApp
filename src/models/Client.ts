import {EligibilityDto} from "@/models/Eligibility.ts";

export interface ClientDto {
    client: ClientDto[];
    clientId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cin: string;
    eligibility: EligibilityDto;
    score: number;
}
