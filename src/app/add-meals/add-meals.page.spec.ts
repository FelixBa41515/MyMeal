import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMealsPage } from './add-meals.page';

describe('AddMealsPage', () => {
  let component: AddMealsPage;
  let fixture: ComponentFixture<AddMealsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddMealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
