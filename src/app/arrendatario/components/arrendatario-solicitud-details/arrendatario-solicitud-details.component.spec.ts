import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendatarioSolicitudDetailsComponent } from './arrendatario-solicitud-details.component';

describe('SolicitudDetailsComponent', () => {
  let component: ArrendatarioSolicitudDetailsComponent;
  let fixture: ComponentFixture<ArrendatarioSolicitudDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendatarioSolicitudDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendatarioSolicitudDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
