import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CombosRoutingModule } from './combos-routing.module';
import { CombosComponent } from './combos.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CombosComponent
  ],
  imports: [
    CommonModule,
    CombosRoutingModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class CombosModule { }
