import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingDetailsComponent } from './healing-details.component';

describe('HealingDetailsComponent', () => {
  let component: HealingDetailsComponent;
  let fixture: ComponentFixture<HealingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
