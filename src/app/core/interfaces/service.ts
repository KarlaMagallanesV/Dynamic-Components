export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number; // en minutos
    price: number;
    category: 'corte' | 'color' | 'tratamiento' | 'manicure' | 'pedicure';
    imageUrl: string;
}