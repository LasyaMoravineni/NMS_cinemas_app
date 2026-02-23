import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrls: ['./success.css']
})
export class Success implements OnInit {

  booking: any;
  seatNumbers: string[] = [];
  show: any;
  posterUrl: string = '';

  constructor(public router: Router) {}

  ngOnInit() {

    const state = history.state;

    if (state && state.booking) {
      this.booking = state.booking;
      this.seatNumbers = state.seats || [];
      this.show = state.show || null;
      this.posterUrl = state.posterUrl || '';
    } else {
      this.router.navigate(['/']);
    }
  }

  async downloadTicket() {

  const doc = new jsPDF();

  const qrData = `
  Booking ID: ${this.booking.bookingId}
  Movie: ${this.booking.movieTitle}
  Theatre: ${this.booking.theatreName}
  Time: ${this.booking.showTime}
  Seats: ${this.seatNumbers.join(', ')}
  `;

  const qrImage = await QRCode.toDataURL(qrData);

  // Border box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.rect(15, 15, 180, 260);

  // Title
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text('NMS CINEMAS', 105, 30, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(120, 120, 120);
  doc.text('Booking Confirmation', 105, 40, { align: 'center' });

  // QR Code (top center)
  doc.addImage(qrImage, 'PNG', 85, 50, 40, 40);

  // Booking ID below QR
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(`Booking ID: ${this.booking.bookingId}`, 105, 100, { align: 'center' });

  const addDetails = () => {

    // Poster (centered)
    if (this.posterUrl) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = this.posterUrl;

      img.onload = () => {
        doc.addImage(img, 'JPEG', 65, 110, 80, 100);
        writeDetails(220);
      };
    } else {
      writeDetails(120);
    }
  };

  const writeDetails = (startY: number) => {

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);

    doc.text(`${this.booking.movieTitle}`, 105, startY, { align: 'center' });
    doc.text(`Theatre: ${this.booking.theatreName}`, 105, startY + 12, { align: 'center' });

    doc.text(
      `Show Time: ${new Date(this.booking.showTime).toLocaleString()}`,
      105,
      startY + 24,
      { align: 'center' }
    );

    doc.text(`Seats: ${this.seatNumbers.join(', ')}`, 105, startY + 36, { align: 'center' });

    doc.setFont('bold');
    doc.setFontSize(15);
    doc.text(`Total Paid: Rs. ${this.booking.totalAmount}`, 105, startY + 52, { align: 'center' });
    doc.setFont('normal');

    doc.save(`ticket-${this.booking.bookingId}.pdf`);
  };

  addDetails();
}



}
