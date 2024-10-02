import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewEntityComponent } from './create-new-entity.component';

describe('CreateNewEntityComponent', () => {
  let component: CreateNewEntityComponent;
  let fixture: ComponentFixture<CreateNewEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewEntityComponent]
    });
    fixture = TestBed.createComponent(CreateNewEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
