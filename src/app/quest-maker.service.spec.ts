import { TestBed } from '@angular/core/testing';

import { QuestMakerService } from './quest-maker.service';

describe('QuestMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestMakerService = TestBed.get(QuestMakerService);
    expect(service).toBeTruthy();
  });
});
