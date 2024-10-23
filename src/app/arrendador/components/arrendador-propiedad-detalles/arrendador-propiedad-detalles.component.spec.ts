import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorPropiedadDetallesComponent } from './arrendador-propiedad-detalles.component';

describe('ArrendadorPropiedadDetallesComponent', () => {
  let component: ArrendadorPropiedadDetallesComponent;
  let fixture: ComponentFixture<ArrendadorPropiedadDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorPropiedadDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadorPropiedadDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
