import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { How2playComponent } from './how2play.component';

describe('How2playComponent', () => {
  let component: How2playComponent;
  let fixture: ComponentFixture<How2playComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ How2playComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(How2playComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
