import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestComponent } from './view-quest.component';

describe('ViewQuestComponent', () => {
  let component: ViewQuestComponent;
  let fixture: ComponentFixture<ViewQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
