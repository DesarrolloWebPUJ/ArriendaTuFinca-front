import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionFormComponent } from './calificacion-form.component';

describe('CalificacionFormComponent', () => {
  let component: CalificacionFormComponent;
  let fixture: ComponentFixture<CalificacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
