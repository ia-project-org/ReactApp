export interface Notification {
    id: number | null;
    title: string;
    message: string;
    jobName: string;
    jobState: string;
    jobStatus: string;
    notificationDate: Date | string;
}