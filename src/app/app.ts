import { Component } from '@angular/core';
import { BookingComponent } from './feature/booking/booking/booking';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookingComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'Salon-NireSpa';
}