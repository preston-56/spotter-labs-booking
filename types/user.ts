export type User = {
    id: string;
    name: string;
    email: string;
    cluster: string;
};

export interface UserInfoProps {
    workstationId?: string;
    deskIndex: number;
    workstations?: any[];
    userName?: string;
    userEmail?: string;
};