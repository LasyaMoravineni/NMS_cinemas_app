import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TheatreService } from '../../../services/theatre';
import { LoaderService } from '../../../services/loader';


@Component({
  selector: 'app-admin-theatres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-theatres.html'
})
export class AdminTheatres implements OnInit {

  theatres: any[] = [];

  theatre: any = this.emptyTheatre();
  editing = false;

  constructor(
    private theatreService: TheatreService,
    private cd: ChangeDetectorRef,
    private loader: LoaderService

  ) {}

  ngOnInit(): void {
    this.loadTheatres();
  }

  emptyTheatre() {
    return {
      name: '',
      location: ''
    };
  }

  loadTheatres(): void {
    this.loader.show();
    this.theatreService.getAllTheatres().subscribe((data: any[]) => {
      this.theatres = [...data];
      this.loader.hide();
    });
  }

  trackByTheatre(index: number, t: any) {
  return t.theatreId;
}

  saveTheatre(): void {

    if (!this.theatre.name || !this.theatre.location) {
      return; // silent validation
    }

    this.loader.show();

    if (this.editing) {

      this.theatreService.updateTheatre(this.theatre.theatreId, this.theatre)
        .subscribe((updated: any) => {

          const index = this.theatres.findIndex(t => t.theatreId === updated.theatreId);
          this.theatres[index] = updated;

          this.theatres = [...this.theatres];
          this.resetForm();
          this.loader.hide();
        });

    } else {

      this.theatreService.addTheatre(this.theatre)
        .subscribe((response: any) => {

          const saved = response.theatre; 

          this.theatres = [...this.theatres, saved];
          
          this.resetForm();
          this.loader.hide();
        });
    }
  }

  editTheatre(t: any): void {
    this.theatre = { ...t };
    this.editing = true;
  }

  deleteTheatre(id: number): void {
    this.loader.show();

    this.theatres = this.theatres.filter(t => t.theatreId !== id);
    this.loader.hide();

    this.theatreService.deleteTheatre(id)
      .subscribe({
        error: () => {this.loadTheatres(),this.loader.hide();}
      });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.theatre = this.emptyTheatre();
    this.editing = false;
  }
}
