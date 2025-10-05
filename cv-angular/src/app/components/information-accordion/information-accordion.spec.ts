import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAccordion } from './information-accordion';

describe('InformationAccordion', () => {
  let component: InformationAccordion;
  let fixture: ComponentFixture<InformationAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationAccordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationAccordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
