import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeuserComponent } from './seeuser.component';

describe('SeeuserComponent', () => {
  let component: SeeuserComponent;
  let fixture: ComponentFixture<SeeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
