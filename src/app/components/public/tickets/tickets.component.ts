import { Component, OnInit, ViewRef } from '@angular/core';
import { Router } from '@angular/router';

import { OrderStorageService } from 'src/app/services/order-storage.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { CurrencyPipe } from '@angular/common';
import { TicketsService } from 'src/app/services/tickets.service';
import { ProductResponse } from 'src/app/interfaces/product-response';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  constructor(private router: Router, private order: OrderStorageService, public currency: CurrencyPipe, private ticketSrv: TicketsService) {}

  ngOnInit(): void {
    this.ticketSrv.getAll().subscribe(res => this.parseData(res.response.data))
  }

  parseData(data : Array<ProductResponse>) {
    this.tickets = [];
    for(let ticketInfo of data) {
      this.tickets.push(
        {
          code: ticketInfo.code,
          title: ticketInfo.name,
          value: ticketInfo.price,
        }
      )
    }
  }

  tickets: Array<Ticket> = [];

  selectedTicketIdx = -1;

  subtotal: number = 0;
  count: number = 1;

  canContinue = false;

  onTicketClick(idx: number) {
    this.selectedTicketIdx = idx;
    const ticketValue = this.tickets[this.selectedTicketIdx].value;
    console.log(this.count, ticketValue);
    this.updateCount(this.count, ticketValue);
    this.evaluateContinue();
  }

  updateCount(count: number, value: number) {
    this.subtotal = count * value;
  }

  onInputChange(inputRef: HTMLInputElement) {
    this.count = parseInt(inputRef.value);
    if (this.selectedTicketIdx != -1) {
      const ticketValue = this.tickets[this.selectedTicketIdx].value;
      this.updateCount(this.count, ticketValue);
    } else {
      this.subtotal = 0;
      this.count = 1;
      inputRef.value = '1';
    }
    this.evaluateContinue();
  }

  evaluateContinue() {
    this.canContinue = this.selectedTicketIdx != -1;
  }

  onContinue(): void {
    this.order.saveTicketInfo(this.tickets[this.selectedTicketIdx], this.count);
    this.router.navigateByUrl('combos');
  }
}
