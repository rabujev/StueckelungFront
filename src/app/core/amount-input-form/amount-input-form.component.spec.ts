import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountInputFormComponent } from './amount-input-form.component';

describe('AmountInputFormComponent', () => {
  let component: AmountInputFormComponent;
  let fixture: ComponentFixture<AmountInputFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountInputFormComponent]
    });
    fixture = TestBed.createComponent(AmountInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
