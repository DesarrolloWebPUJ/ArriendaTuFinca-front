import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadorNavbarComponent } from './arrendador-navbar.component';

describe('ArrendadorNavbarComponent', () => {
  let component: ArrendadorNavbarComponent;
  let fixture: ComponentFixture<ArrendadorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadorNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
