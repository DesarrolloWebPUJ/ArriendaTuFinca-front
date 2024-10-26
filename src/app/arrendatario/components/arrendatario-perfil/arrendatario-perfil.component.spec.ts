import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendatarioPerfilComponent } from './arrendatario-perfil.component';

describe('ArrendatarioPerfilComponent', () => {
  let component: ArrendatarioPerfilComponent;
  let fixture: ComponentFixture<ArrendatarioPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendatarioPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendatarioPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
