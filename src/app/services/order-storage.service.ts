import { Injectable } from '@angular/core';
import { Combo } from '../interfaces/combo';
import { ComboInfo } from '../interfaces/combo-info';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {

  constructor() { }

  ticket!: Ticket;
  ticketCount: number = 0;
  combos!: Array<ComboInfo>;

  saveTicketInfo(ticket: Ticket, count: number) {
    this.ticket = ticket;
    this.ticketCount = count;
  }

  saveCombosInfo(combos: Array<ComboInfo>) {
    this.combos = combos;
  }
}
