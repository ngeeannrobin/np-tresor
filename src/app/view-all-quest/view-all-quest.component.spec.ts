import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuestComponent } from './view-all-quest.component';

describe('ViewAllQuestComponent', () => {
  let component: ViewAllQuestComponent;
  let fixture: ComponentFixture<ViewAllQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
