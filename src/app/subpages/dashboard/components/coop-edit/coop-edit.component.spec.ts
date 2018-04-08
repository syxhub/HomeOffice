import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopEditComponent } from './coop-edit.component';

describe('CoopEditComponent', () => {
  let component: CoopEditComponent;
  let fixture: ComponentFixture<CoopEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoopEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
