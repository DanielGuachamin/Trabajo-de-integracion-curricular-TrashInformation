import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAdminComponent } from './contacts-admin.component';

describe('ContactsAdminComponent', () => {
  let component: ContactsAdminComponent;
  let fixture: ComponentFixture<ContactsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
