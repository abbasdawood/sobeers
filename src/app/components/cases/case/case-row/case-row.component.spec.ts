import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRowComponent } from './case-row.component';

describe('CaseRowComponent', () => {
  let component: CaseRowComponent;
  let fixture: ComponentFixture<CaseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
