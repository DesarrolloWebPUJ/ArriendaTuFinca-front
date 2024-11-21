import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudBotonesComponent } from './solicitud-botones.component';

describe('SolicitudBotonesComponent', () => {
  let component: SolicitudBotonesComponent;
  let fixture: ComponentFixture<SolicitudBotonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudBotonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudBotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
