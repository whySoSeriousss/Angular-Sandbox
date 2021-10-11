import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLabsComponent } from './ui-labs.component';

describe('UiLabsComponent', () => {
  let component: UiLabsComponent;
  let fixture: ComponentFixture<UiLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
