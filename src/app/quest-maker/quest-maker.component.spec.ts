import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestMakerComponent } from './quest-maker.component';

describe('QuestMakerComponent', () => {
  let component: QuestMakerComponent;
  let fixture: ComponentFixture<QuestMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
