import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadDetallesComponent } from './propiedad-detalles.component';

describe('PropiedadDetallesComponent', () => {
  let component: PropiedadDetallesComponent;
  let fixture: ComponentFixture<PropiedadDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
