import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProductPage } from './user-product.page';

const routes: Routes = [
  {
    path: '',
    component: UserProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProductPageRoutingModule {}
