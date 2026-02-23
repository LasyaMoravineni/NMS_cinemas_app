import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShowService } from '../../services/show';
import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking implements OnInit {

  show: any;
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  seatLayout: string[][] = [];
  total = 0;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private bookingService: BookingService,
    private router: Router,
    private auth: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    const showId = Number(this.route.snapshot.paramMap.get('id'));

    if (!showId) {
      this.router.navigate(['/']);
      return;
    }

    this.loader.show();

    this.showService.getShowById(showId).subscribe({
      next: (data: any) => {
        this.show = data;
        this.generateSeats();
        this.loadBookedSeats(showId);
      },
      error: () => {
        this.loader.hide();
        this.router.navigate(['/']);
      },

    });

  }

  generateSeats() {
    const rows = ['J','I','H','G','F', 'E','D','C','B','A'];
    const seatsPerRow = 15;

    this.seatLayout = rows.map(row =>
      Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
    );
  }

  loadBookedSeats(showId: number) {
    this.showService.getBookedSeats(showId)
      .subscribe((data: string[]) => {
        this.bookedSeats = data || [];
        this.loader.hide();
      });
  }

  toggleSeat(seat: string) {

    if (!this.show) return;
    if (this.bookedSeats.includes(seat)) return;

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }

    this.calculateTotal();
  }

  calculateTotal() {
    if (this.show) {
      this.total = this.selectedSeats.length * this.show.price;
    }
  }

  confirmBooking() {

    this.error = '';

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.show) {
      this.error = "Show not loaded properly";
      return;
    }

    if (this.selectedSeats.length === 0) {
      this.error = "Please select at least one seat";
      return;
    }

    const user = this.auth.getUser();

    const bookingData = {
      userId: user.userId,
      showId: this.show.showId,
      seatsBooked: this.selectedSeats.length,
      seatNumbers: this.selectedSeats
    };

    this.loader.show();

    this.bookingService.bookTicket(bookingData).subscribe({
      next: (res: any) => {

        this.bookedSeats.push(...this.selectedSeats);

        this.router.navigate(['/success'], {
          state: {
            booking: res,
            seats: this.selectedSeats,
            show: this.show,
            posterUrl: this.show.movie.posterUrl
          }

          
          
        });
        this.loader.hide();

      },
      error: (err) => {
        this.loader.hide();
        this.error = err.error?.message || "Booking failed.";
        
      }

    });
  }
}
