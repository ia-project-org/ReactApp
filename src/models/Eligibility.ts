export interface EligibilityDto {
    eligibilityId: number;
    lastCheckedDate: Date;
    eligibilityResult: EligibilityResult;
}
export enum EligibilityResult {
    Good = "Good",
    Standard = "Standard",
    Bad = "Bad"
}