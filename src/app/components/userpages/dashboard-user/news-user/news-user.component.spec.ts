import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsUserComponent } from './news-user.component';

describe('NewsUserComponent', () => {
  let component: NewsUserComponent;
  let fixture: ComponentFixture<NewsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
