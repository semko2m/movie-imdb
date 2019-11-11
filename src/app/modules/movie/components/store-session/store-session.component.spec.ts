import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSessionComponent } from './store-session.component';

describe('StoreSessionComponent', () => {
  let component: StoreSessionComponent;
  let fixture: ComponentFixture<StoreSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
