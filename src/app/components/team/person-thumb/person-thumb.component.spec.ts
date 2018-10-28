import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonThumbComponent } from './person-thumb.component';

describe('PersonThumbComponent', () => {
  let component: PersonThumbComponent;
  let fixture: ComponentFixture<PersonThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
