import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTheatres } from './admin-theatres';

describe('AdminTheatres', () => {
  let component: AdminTheatres;
  let fixture: ComponentFixture<AdminTheatres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTheatres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTheatres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
