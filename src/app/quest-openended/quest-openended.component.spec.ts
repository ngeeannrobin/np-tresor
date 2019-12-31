import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestOpenendedComponent } from './quest-openended.component';

describe('QuestOpenendedComponent', () => {
  let component: QuestOpenendedComponent;
  let fixture: ComponentFixture<QuestOpenendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestOpenendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestOpenendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
