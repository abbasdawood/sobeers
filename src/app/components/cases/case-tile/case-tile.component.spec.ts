import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTileComponent } from './case-tile.component';

describe('CaseTileComponent', () => {
  let component: CaseTileComponent;
  let fixture: ComponentFixture<CaseTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
