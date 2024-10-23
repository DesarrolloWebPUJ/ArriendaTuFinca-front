import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadFormComponent } from './propiedad-form.component';

describe('CrearPropiedadComponent', () => {
  let component: PropiedadFormComponent;
  let fixture: ComponentFixture<PropiedadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
