import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProductPageRoutingModule } from './user-product-routing.module';

import { UserProductPage } from './user-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProductPageRoutingModule
  ],
  declarations: [UserProductPage]
})
export class UserProductPageModule {}
