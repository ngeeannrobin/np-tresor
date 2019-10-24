import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleQuestComponent } from './view-single-quest.component';

describe('ViewSingleQuestComponent', () => {
  let component: ViewSingleQuestComponent;
  let fixture: ComponentFixture<ViewSingleQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
