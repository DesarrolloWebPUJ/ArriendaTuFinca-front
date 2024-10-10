import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorPerfilComponent } from './arrendador-perfil.component';

describe('ArrendadorPerfilComponent', () => {
  let component: ArrendadorPerfilComponent;
  let fixture: ComponentFixture<ArrendadorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
