import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProductPage } from './user-product.page';

describe('UserProductPage', () => {
  let component: UserProductPage;
  let fixture: ComponentFixture<UserProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
