import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private API = environment.apiUrl + '/bookings';

  constructor(private http: HttpClient) {}

  bookTicket(data: any) {
    return this.http.post(`${environment.apiUrl}/bookings`, data);
  }

  getBookingsByUser(userId: number) {
    return this.http.get<any[]>(`${this.API}/user/${userId}`);
  }

  cancelBooking(bookingId: number, userId: number) {
  return this.http.delete<any>(
    `${this.API}/${bookingId}?userId=${userId}`
  );
}

}
