import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarMobileComponent } from './radar-mobile.component';

describe('RadarMobileComponent', () => {
  let component: RadarMobileComponent;
  let fixture: ComponentFixture<RadarMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
