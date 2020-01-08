import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestSimpleqrComponent } from './quest-simpleqr.component';

describe('QuestSimpleqrComponent', () => {
  let component: QuestSimpleqrComponent;
  let fixture: ComponentFixture<QuestSimpleqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestSimpleqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestSimpleqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
