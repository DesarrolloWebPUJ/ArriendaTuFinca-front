import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesPendientesComponent } from './calificaciones-pendientes.component';

describe('CalificacionComponent', () => {
  let component: CalificacionesPendientesComponent;
  let fixture: ComponentFixture<CalificacionesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionesPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
