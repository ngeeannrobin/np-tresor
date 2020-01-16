import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestMcqComponent } from './quest-mcq.component';

describe('QuestMcqComponent', () => {
  let component: QuestMcqComponent;
  let fixture: ComponentFixture<QuestMcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestMcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestMcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
