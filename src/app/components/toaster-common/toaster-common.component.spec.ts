import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterCommonComponent } from './toaster-common.component';

describe('ToasterCommonComponent', () => {
  let component: ToasterCommonComponent;
  let fixture: ComponentFixture<ToasterCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToasterCommonComponent]
    });
    fixture = TestBed.createComponent(ToasterCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
