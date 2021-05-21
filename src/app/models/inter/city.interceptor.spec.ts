import { TestBed } from '@angular/core/testing';

import { CityInterceptor } from './city.interceptor';

describe('CityInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CityInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CityInterceptor = TestBed.inject(CityInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
