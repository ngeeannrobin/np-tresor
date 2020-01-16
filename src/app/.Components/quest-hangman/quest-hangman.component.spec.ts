import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestHangmanComponent } from './quest-hangman.component';

describe('QuestHangmanComponent', () => {
  let component: QuestHangmanComponent;
  let fixture: ComponentFixture<QuestHangmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestHangmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestHangmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
