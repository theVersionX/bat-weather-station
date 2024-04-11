import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaSettingsComponent } from './antenna-settings.component';

describe('AntennaSettingsComponent', () => {
  let component: AntennaSettingsComponent;
  let fixture: ComponentFixture<AntennaSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntennaSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntennaSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
