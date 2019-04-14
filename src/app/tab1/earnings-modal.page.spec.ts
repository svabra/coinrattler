import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsModalPage } from './earnings-modal.page';

describe('EarningsModalPage', () => {
  let component: EarningsModalPage;
  let fixture: ComponentFixture<EarningsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
