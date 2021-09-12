import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CModalComponent } from './c-modal.component';

describe('CModalComponent', () => {
  let component: CModalComponent;
  let fixture: ComponentFixture<CModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
