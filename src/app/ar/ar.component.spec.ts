import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ARComponent } from './ar.component';

describe('ARComponent', () => {
  let component: ARComponent;
  let fixture: ComponentFixture<ARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
