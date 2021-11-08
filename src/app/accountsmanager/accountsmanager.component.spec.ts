import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsmanagerComponent } from './accountsmanager.component';

describe('AccountsmanagerComponent', () => {
  let component: AccountsmanagerComponent;
  let fixture: ComponentFixture<AccountsmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
