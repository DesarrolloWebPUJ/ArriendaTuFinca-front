import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendatarioNavbarComponent } from './arrendatario-navbar.component';

describe('ArrendatarioNavbarComponent', () => {
  let component: ArrendatarioNavbarComponent;
  let fixture: ComponentFixture<ArrendatarioNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendatarioNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendatarioNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
