import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListMapComponent } from './report-list-map.component';

describe('ReportListMapComponent', () => {
  let component: ReportListMapComponent;
  let fixture: ComponentFixture<ReportListMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportListMapComponent]
    });
    fixture = TestBed.createComponent(ReportListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
