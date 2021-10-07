import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {

  constructor() { }

  ticket!: Ticket;

  saveTicketInfo(ticket: Ticket) {
    this.ticket = ticket;
  }
}
