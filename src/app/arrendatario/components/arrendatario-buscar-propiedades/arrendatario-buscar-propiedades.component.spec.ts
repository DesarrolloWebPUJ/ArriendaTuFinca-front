import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendatarioBuscarPropiedadesComponent } from './arrendatario-buscar-propiedades.component';

describe('ArrendatarioBuscarPropiedadesComponent', () => {
  let component: ArrendatarioBuscarPropiedadesComponent;
  let fixture: ComponentFixture<ArrendatarioBuscarPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendatarioBuscarPropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendatarioBuscarPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
