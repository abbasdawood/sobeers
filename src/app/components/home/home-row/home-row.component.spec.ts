import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRowComponent } from './home-row.component';

describe('HomeRowComponent', () => {
  let component: HomeRowComponent;
  let fixture: ComponentFixture<HomeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
