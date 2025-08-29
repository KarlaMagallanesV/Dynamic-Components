export interface AppointmentSlot {
    id: string;
    date: Date;
    time: string;
    available: boolean;
    stylistId: string;
    serviceId?: string;
}