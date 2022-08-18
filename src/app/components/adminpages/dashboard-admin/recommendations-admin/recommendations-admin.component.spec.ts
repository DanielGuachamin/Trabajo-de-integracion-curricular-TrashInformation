import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsAdminComponent } from './recommendations-admin.component';

describe('RecommendationsAdminComponent', () => {
  let component: RecommendationsAdminComponent;
  let fixture: ComponentFixture<RecommendationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
