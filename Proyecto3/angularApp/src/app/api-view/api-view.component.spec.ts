import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiViewComponent } from './api-view.component';

describe('ApiViewComponent', () => {
  let component: ApiViewComponent;
  let fixture: ComponentFixture<ApiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
