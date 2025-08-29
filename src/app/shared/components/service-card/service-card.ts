import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../core/interfaces/service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../service-card/service-card.html',
  styleUrls: ['../service-card/service-card.scss']
})
export class ServiceCardComponent {
  @Input() service!: Service;
  @Input() isSelected: boolean = false;
  @Output() serviceSelected = new EventEmitter<Service>();

  onSelect() {
    this.serviceSelected.emit(this.service);
  }

  getCategoryName(category: string): string {
    const categories: Record<string, string> = {
      'corte': 'Corte',
      'color': 'Coloración',
      'tratamiento': 'Tratamiento',
      'manicure': 'Manicure',
      'pedicure': 'Pedicure'
    };
    return categories[category] || category;
  }
}