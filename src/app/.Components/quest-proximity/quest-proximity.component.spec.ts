import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestProximityComponent } from './quest-proximity.component';

describe('QuestProximityComponent', () => {
  let component: QuestProximityComponent;
  let fixture: ComponentFixture<QuestProximityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestProximityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestProximityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
