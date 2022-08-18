import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendatiosUserComponent } from './recommendatios-user.component';

describe('RecommendatiosUserComponent', () => {
  let component: RecommendatiosUserComponent;
  let fixture: ComponentFixture<RecommendatiosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendatiosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendatiosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
