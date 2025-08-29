import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../../shared/components/service-card/service-card';
import { AppointmentSlotComponent } from '../../../shared/components/appointment-slot/appointment-slot';
import { StylistProfileComponent } from '../../../shared/components/stylist-profile/stylist-profile';
import { Service } from '../../../core/interfaces/service';
import { Stylist } from '../../../core/interfaces/stylist';
import { AppointmentSlot } from '../../../core/interfaces/appointment';
import { BookingService } from '../../../core/services/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent,
    AppointmentSlotComponent,
    StylistProfileComponent
  ],
  templateUrl: './booking.html', // ✅ Correcto - mismo directorio
  styleUrls: ['./booking.scss'] // ✅ Correcto - mismo directorio
})
export class BookingComponent implements OnInit {
  services: Service[] = [];
  stylists: Stylist[] = [];
  appointmentSlots: AppointmentSlot[] = [];

  selectedService: Service | null = null;
  selectedStylist: Stylist | null = null;
  selectedSlot: AppointmentSlot | null = null;
  selectedDate: Date | null = null;

  constructor(private bookingService: BookingService) {} // ✅ Correcto

  ngOnInit() {
    // Verifica que el servicio tenga estos métodos
    this.services = this.bookingService.getServices();
    this.stylists = this.bookingService.getStylists();
    this.appointmentSlots = this.bookingService.getAppointmentSlots();
  }

  onServiceSelected(service: Service) {
    this.selectedService = service;
    this.selectedStylist = null;
    this.selectedSlot = null;
    this.selectedDate = null;
  }

  onStylistSelected(stylist: Stylist) {
    this.selectedStylist = stylist;
    this.selectedSlot = null;
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.selectedSlot = null;
  }

  onSlotSelected(slot: AppointmentSlot) {
    this.selectedSlot = slot;
  }

  getAvailableStylists(): Stylist[] {
    if (!this.selectedService) return [];
    
    return this.stylists.filter(stylist => {
      const serviceCategory = this.selectedService!.category;
      
      if (serviceCategory === 'manicure' || serviceCategory === 'pedicure') {
        return stylist.specialties.some((specialty: string) => 
          specialty.toLowerCase().includes('manicure') || 
          specialty.toLowerCase().includes('pedicure')
        );
      }
      
      return stylist.specialties.some((specialty: string) => 
        specialty.toLowerCase().includes(serviceCategory) ||
        specialty.toLowerCase().includes('corte') ||
        specialty.toLowerCase().includes('color') ||
        specialty.toLowerCase().includes('tratamiento')
      );
    });
  }

  getAvailableSlots(date: Date): AppointmentSlot[] {
    if (!this.selectedStylist || !date) return [];
    
    return this.appointmentSlots.filter(slot => 
      slot.stylistId === this.selectedStylist!.id &&
      slot.date.toDateString() === date.toDateString()
    );
  }

  getNext7Days(): Date[] {
    const days: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  }

  formatDateTab(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('es-PE', options);
    }
  }

  formatFullDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-PE', options);
  }

  confirmBooking() {
    if (this.selectedService && this.selectedStylist && this.selectedSlot) {
      alert(`¡Reserva confirmada!\n\nServicio: ${this.selectedService.name}\nEstilista: ${this.selectedStylist.name}\nFecha: ${this.formatFullDate(this.selectedSlot.date)}\nHora: ${this.selectedSlot.time}\nTotal: S/. ${this.selectedService.price}`);
      
      this.resetBooking();
    }
  }

  private resetBooking() {
    this.selectedService = null;
    this.selectedStylist = null;
    this.selectedSlot = null;
    this.selectedDate = null;
  }
}