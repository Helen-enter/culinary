import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulinaryModalComponent } from './culinary-modal.component';

describe('CulinaryModalComponent', () => {
  let component: CulinaryModalComponent;
  let fixture: ComponentFixture<CulinaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulinaryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulinaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
