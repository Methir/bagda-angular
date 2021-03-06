import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RpgRoutingModule } from './rpg-routing.module';
import { RpgComponent } from './rpg/rpg.component';
import { RpgService } from './rpg.service';
import { RpgPainelComponent } from './rpg-painel/rpg-painel.component';
import { RpgGuard } from './guards/rpg.guard';
import { ShopModule } from '../shop/shop.module';
import { PlayerModule } from '../player/player.module';
import { RpgControlComponent } from './rpg-control/rpg-control.component';
import { SharedModule } from '../shared/shared.module';
import { RpgCreateFormComponent } from './rpg-create-form/rpg-create-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShopModule,
    PlayerModule,
    SharedModule,
    RpgRoutingModule
  ],
  declarations: [
    RpgComponent, 
    RpgPainelComponent, 
    RpgControlComponent, 
    RpgCreateFormComponent,
  ],
  exports: [
    RpgComponent,
    RpgCreateFormComponent,
  ],
  providers: [
    RpgService, 
    RpgGuard
  ]
})
export class RpgModule { }
