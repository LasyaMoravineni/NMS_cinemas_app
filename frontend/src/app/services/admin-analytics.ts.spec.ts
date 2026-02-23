import { TestBed } from '@angular/core/testing';

import { AdminAnalyticsTs } from './admin-analytics.ts';

describe('AdminAnalyticsTs', () => {
  let service: AdminAnalyticsTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAnalyticsTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
