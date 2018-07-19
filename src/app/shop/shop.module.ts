import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop.service';
import { ItemModalComponent } from './item-modal/item-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule
  ],
  entryComponents: [
    ItemModalComponent
  ],
  declarations: [
    ShopComponent,
    ItemModalComponent
  ],
  exports: [ 
    ShopComponent 
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }