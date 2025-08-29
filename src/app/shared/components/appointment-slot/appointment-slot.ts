import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSlot } from '../../../core/interfaces/appointment';

@Component({
  selector: 'app-appointment-slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../appointment-slot/appointment-slot.html',
  styleUrls: ['../appointment-slot/appointment-slot.scss']
})
export class AppointmentSlotComponent {
  @Input() slot!: AppointmentSlot;
  @Input() isSelected: boolean = false;
  @Input() showDate: boolean = false;
  @Output() slotSelected = new EventEmitter<AppointmentSlot>();

  onSlotSelect() {
    if (this.slot.available) {
      this.slotSelected.emit(this.slot);
    }
  }

  getStatusText(): string {
    return this.slot.available ? 'Disponible' : 'Ocupado';
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    };
    return date.toLocaleDateString('es-PE', options);
  }
}