import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceShowRoutingModule } from './invoice-show-routing.module';
import { InvoiceShowComponent } from './invoice-show.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InvoiceShowComponent
  ],
  imports: [
    CommonModule,
    InvoiceShowRoutingModule,
    SharedModule,
  ]
})
export class InvoiceShowModule { }
