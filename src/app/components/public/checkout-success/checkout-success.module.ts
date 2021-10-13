import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutSuccessRoutingModule } from './checkout-success-routing.module';
import { CheckoutSuccessComponent } from './checkout-success.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    CheckoutSuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutSuccessRoutingModule,
    RouterModule,
    SharedModule,
    QRCodeModule
  ]
})
export class CheckoutSuccessModule { }
