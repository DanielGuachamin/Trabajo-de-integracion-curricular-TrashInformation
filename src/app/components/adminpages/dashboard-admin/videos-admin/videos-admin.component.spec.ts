import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosAdminComponent } from './videos-admin.component';

describe('VideosAdminComponent', () => {
  let component: VideosAdminComponent;
  let fixture: ComponentFixture<VideosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
