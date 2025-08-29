import { Injectable } from '@angular/core';
import { Service } from '../interfaces/service';
import { Stylist } from '../interfaces/stylist';
import { AppointmentSlot } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private services: Service[] = [];
  private stylists: Stylist[] = [];
  private appointmentSlots: AppointmentSlot[] = [];

  constructor() {
    this.loadMockData();
  }

  getServices(): Service[] {
    return this.services;
  }

  getStylists(): Stylist[] {
    return this.stylists;
  }

  getAppointmentSlots(): AppointmentSlot[] {
    return this.appointmentSlots;
  }

  private loadMockData() {
    // Mock data para servicios
    this.services = [
      {
        id: '1',
        name: 'Corte y Peinado',
        description: 'Corte personalizado según tu estilo y tipo de rostro',
        duration: 60,
        price: 45,
        category: 'corte',
        imageUrl: 'data:image/jpeg;base64,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'
      },
      {
        id: '2',
        name: 'Coloración Completa',
        description: 'Cambio de color completo con productos premium',
        duration: 120,
        price: 120,
        category: 'color',
        imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop'
      },
      {
        id: '3',
        name: 'Tratamiento Capilar',
        description: 'Hidratación profunda y reparación del cabello',
        duration: 90,
        price: 80,
        category: 'tratamiento',
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop'
      },
      {
        id: '4',
        name: 'Manicure Spa',
        description: 'Cuidado completo de manos con esmaltado',
        duration: 45,
        price: 35,
        category: 'manicure',
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
      }
    ];

    // Mock data para estilistas
    this.stylists = [
      {
        id: '1',
        name: 'María González',
        specialties: ['Cortes', 'Peinados', 'Coloración'],
        experience: 8,
        rating: 4.9,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS26G59fB7kPju4wV5nniVQ2Q_yERMeInAhxQ&s',
        bio: 'Especialista en cortes modernos y técnicas de coloración avanzadas.'
      },
      {
        id: '2',
        name: 'Carmen Silva',
        specialties: ['Tratamientos', 'Coloración', 'Peinados'],
        experience: 12,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        bio: 'Experta en tratamientos capilares y técnicas de coloración naturales.'
      },
      {
        id: '3',
        name: 'Ana Rodríguez',
        specialties: ['Manicure', 'Pedicure', 'Nail Art'],
        experience: 6,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
        bio: 'Especialista en cuidado de uñas y diseños creativos de nail art.'
      }
    ];

    // Generar slots de citas
    this.generateAppointmentSlots();
  }

  private generateAppointmentSlots() {
    const slots: AppointmentSlot[] = [];
    const next7Days = this.getNext7Days();
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    next7Days.forEach(date => {
      this.stylists.forEach(stylist => {
        timeSlots.forEach(time => {
          // Simular disponibilidad aleatoria
          const available = Math.random() > 0.3;
          slots.push({
            id: `${stylist.id}-${date.toISOString().split('T')[0]}-${time}`,
            date: date,
            time: time,
            available: available,
            stylistId: stylist.id
          });
        });
      });
    });

    this.appointmentSlots = slots;
  }

  private getNext7Days(): Date[] {
    const days: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  }
}