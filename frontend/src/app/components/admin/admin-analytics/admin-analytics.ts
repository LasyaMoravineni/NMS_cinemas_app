import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAnalyticsService } from '../../../services/admin-analytics.ts'; 
import { Chart } from 'chart.js/auto';
import { LoaderService } from '../../../services/loader';


@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-analytics.html'
})
export class AdminAnalytics implements OnInit, AfterViewInit {

  analytics: any;

  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('movieCanvas') movieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueMovieCanvas') revenueMovieCanvas!: ElementRef;
  @ViewChild('theatreCanvas') theatreCanvas!: ElementRef;



  viewInitialized = false;

  constructor(
    private adminAnalyticsService: AdminAnalyticsService,
    private cd: ChangeDetectorRef,
    private loader: LoaderService
  ) {}

  ngOnInit() {

    this.loader.show();

    this.adminAnalyticsService.getAnalytics().subscribe(data => {
      this.analytics = data;
      this.cd.detectChanges(); // ensure DOM updates
      this.tryRenderCharts();
      this.loader.hide();
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.tryRenderCharts();
  }

  tryRenderCharts() {
    if (this.analytics && this.viewInitialized) {
      this.renderCharts();
    }
  }

  renderCharts() {

    // 🔹 Revenue Trend Chart
    new Chart(this.revenueCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.analytics.revenueTrend.map((r: any) => r.date),
        datasets: [{
          label: 'Revenue',
          data: this.analytics.revenueTrend.map((r: any) => r.revenue),
          borderColor: '#de252e',
          backgroundColor: 'rgba(222,37,46,0.2)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // 🔹 Movie Performance Chart
    new Chart(this.movieCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.analytics.moviePerformance.map((m: any) => m.movieTitle),
        datasets: [{
          label: 'Bookings',
          data: this.analytics.moviePerformance.map((m: any) => m.totalBookings),
          backgroundColor: '#de252e'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Revenue Per Movie Chart
    const movieRevenueData = this.analytics.revenuePerMovie;

    new Chart(this.revenueMovieCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: movieRevenueData.map((m: any) => m.movieTitle),
        datasets: [{
          label: 'Revenue (₹)',
          data: movieRevenueData.map((m: any) => m.totalRevenue),
          backgroundColor: '#dc3545'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });

    // THEATRE OCCUPANCY CHART

    if (this.analytics.theatreOccupancy) {

      const theatreLabels = this.analytics.theatreOccupancy.map(
        (t: any) => `${t.theatreName} (${t.location})`
      );

      const theatreData = this.analytics.theatreOccupancy.map(
        (t: any) => t.occupancyRate
      );

      new Chart(this.theatreCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: theatreLabels,
          datasets: [{
            label: 'Occupancy %',
            data: theatreData,
            backgroundColor: '#dc3545'
          }]
        },
        options: {
          indexAxis: 'y', // horizontal bar
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }

    // console.log(this.revenueCanvas);
    // console.log(this.movieCanvas);

  }
}
