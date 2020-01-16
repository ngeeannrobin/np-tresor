import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriousUserComponent } from './curious-user.component';

describe('CuriousUserComponent', () => {
  let component: CuriousUserComponent;
  let fixture: ComponentFixture<CuriousUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuriousUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriousUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
