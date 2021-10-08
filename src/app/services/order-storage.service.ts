import { Injectable } from '@angular/core';
import { Combo } from '../interfaces/combo';
import { ComboInfo } from '../interfaces/combo-info';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {

  constructor() { }

  ticket!: Ticket | undefined;
  ticketCount: number = 0;
  combos!: Array<ComboInfo>;

  hasTicket() {
    console.log(this.ticket != undefined && this.ticketCount != 0)
    return this.ticket != undefined && this.ticketCount != 0;
  }

  hasCombos() {
    return this.combos != undefined && this.combos.length > 0;
  }

  resetState() {
    this.ticket = undefined;
    this.ticketCount = 0;
    this.combos = [];
  }

  saveTicketInfo(ticket: Ticket, count: number) {
    this.ticket = ticket;
    this.ticketCount = count;
  }

  saveCombosInfo(combos: Array<ComboInfo>) {
    this.combos = combos;
  }
}
