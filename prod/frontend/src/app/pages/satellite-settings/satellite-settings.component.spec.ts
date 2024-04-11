import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteSettingsComponent } from './satellite-settings.component';

describe('SatelliteSettingsComponent', () => {
  let component: SatelliteSettingsComponent;
  let fixture: ComponentFixture<SatelliteSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatelliteSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SatelliteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
