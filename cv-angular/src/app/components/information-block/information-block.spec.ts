import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBlock } from './information-block';

describe('InformationBlock', () => {
  let component: InformationBlock;
  let fixture: ComponentFixture<InformationBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 