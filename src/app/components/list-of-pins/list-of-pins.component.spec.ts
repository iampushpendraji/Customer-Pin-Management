import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPinsComponent } from './list-of-pins.component';

describe('ListOfPinsComponent', () => {
  let component: ListOfPinsComponent;
  let fixture: ComponentFixture<ListOfPinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfPinsComponent]
    });
    fixture = TestBed.createComponent(ListOfPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
