import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsUserComponent } from './suggestions-user.component';

describe('SuggestionsUserComponent', () => {
  let component: SuggestionsUserComponent;
  let fixture: ComponentFixture<SuggestionsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
