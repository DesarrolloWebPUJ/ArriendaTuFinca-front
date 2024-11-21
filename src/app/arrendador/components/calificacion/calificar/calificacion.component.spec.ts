import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarComponent } from './calificacion.component';

describe('CalificacionFormComponent', () => {
  let component: CalificarComponent;
  let fixture: ComponentFixture<CalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
