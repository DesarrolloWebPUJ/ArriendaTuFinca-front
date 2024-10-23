import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorPropiedadesComponent } from './arrendador-propiedades.component';

describe('ArrendadorPropiedadesComponent', () => {
  let component: ArrendadorPropiedadesComponent;
  let fixture: ComponentFixture<ArrendadorPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorPropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadorPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
