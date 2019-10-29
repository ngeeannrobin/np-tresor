import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestComponent } from './single-quest.component';

describe('SingleQuestComponent', () => {
  let component: SingleQuestComponent;
  let fixture: ComponentFixture<SingleQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
