import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.html'
})
export class BookingHistory implements OnInit {

  bookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    private auth: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    if (!user) return;

    this.loader.show();

    this.bookingService.getBookingsByUser(user.userId)
      .subscribe({
        next: (data) => {
          this.bookings = data;
          this.loader.hide();
        },
        error: (err) => {
          console.error(err);
          this.loader.hide();
        }
      });
  }

  cancelBooking(bookingId: number) {

    const user = this.auth.getUser();

    if (!confirm("Are you sure you want to cancel this booking?")) return;

    this.loader.show();

    this.bookingService.cancelBooking(bookingId, user.userId)
      .subscribe({
        next: () => {
          const booking = this.bookings.find(
          b => b.bookingId === bookingId
        );

        if (booking) {
          booking.status = 'CANCELLED';
        }

        this.loader.hide();
      },
      error: (err) => {
        console.error(err),
        this.loader.hide();
      }
    });
  }

}
