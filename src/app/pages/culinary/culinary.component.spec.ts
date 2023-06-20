import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulinaryComponent } from './culinary.component';

describe('CulinaryComponent', () => {
  let component: CulinaryComponent;
  let fixture: ComponentFixture<CulinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulinaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
