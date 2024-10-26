import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendatarioInicioComponent } from './arrendatario-inicio.component';

describe('ArrendatarioInicioComponent', () => {
  let component: ArrendatarioInicioComponent;
  let fixture: ComponentFixture<ArrendatarioInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendatarioInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendatarioInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
