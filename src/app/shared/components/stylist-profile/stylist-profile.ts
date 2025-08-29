import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stylist } from '../../../core/interfaces/stylist';

@Component({
  selector: 'app-stylist-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../stylist-profile/stylist-profile.html',
  styleUrls: ['../stylist-profile/stylist-profile.scss']
})
export class StylistProfileComponent {
  @Input() stylist!: Stylist;
  @Input() isSelected: boolean = false;
  @Input() showBio: boolean = true;
  @Output() stylistSelected = new EventEmitter<Stylist>();

  onSelect() {
    this.stylistSelected.emit(this.stylist);
  }

  getStars(): string {
    const fullStars = Math.floor(this.stylist.rating);
    return '★'.repeat(fullStars);
  }
}