import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsAdminComponent } from './suggestions-admin.component';

describe('SuggestionsAdminComponent', () => {
  let component: SuggestionsAdminComponent;
  let fixture: ComponentFixture<SuggestionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
