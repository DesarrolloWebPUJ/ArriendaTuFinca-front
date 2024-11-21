import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadBotonesComponent } from './propiedad-botones.component';

describe('PropiedadBotonesComponent', () => {
  let component: PropiedadBotonesComponent;
  let fixture: ComponentFixture<PropiedadBotonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadBotonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadBotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
