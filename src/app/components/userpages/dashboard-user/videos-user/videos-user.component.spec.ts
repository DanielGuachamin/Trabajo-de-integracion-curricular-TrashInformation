import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosUserComponent } from './videos-user.component';

describe('VideosUserComponent', () => {
  let component: VideosUserComponent;
  let fixture: ComponentFixture<VideosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
