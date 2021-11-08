import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadanddownloadComponent } from './uploadanddownload.component';

describe('UploadanddownloadComponent', () => {
  let component: UploadanddownloadComponent;
  let fixture: ComponentFixture<UploadanddownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadanddownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadanddownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
