import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMealPage } from './create-meal.page';

describe('CreateMealPage', () => {
  let component: CreateMealPage;
  let fixture: ComponentFixture<CreateMealPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
