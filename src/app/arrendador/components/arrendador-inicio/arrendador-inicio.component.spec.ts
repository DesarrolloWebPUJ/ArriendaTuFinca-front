import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorInicioComponent } from './arrendador-inicio.component';

describe('ArrendadorInicioComponent', () => {
  let component: ArrendadorInicioComponent;
  let fixture: ComponentFixture<ArrendadorInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadorInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
