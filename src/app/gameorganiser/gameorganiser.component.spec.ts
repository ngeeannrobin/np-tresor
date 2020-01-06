import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameorganiserComponent } from './gameorganiser.component';

describe('GameorganiserComponent', () => {
  let component: GameorganiserComponent;
  let fixture: ComponentFixture<GameorganiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameorganiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameorganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
