import { TestBed } from '@angular/core/testing';

import { GameorganiserService } from './gameorganiser.service';

describe('GameorganiserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameorganiserService = TestBed.get(GameorganiserService);
    expect(service).toBeTruthy();
  });
});
