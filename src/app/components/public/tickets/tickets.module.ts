import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { SharedModule } from '../../shared/shared.module';
import { TicketsService } from 'src/app/services/tickets.service';


@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,
  ],
  providers: [
    CurrencyPipe,
    TicketsService
  ]
})
export class TicketsModule { }
