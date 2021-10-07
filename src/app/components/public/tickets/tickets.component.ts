import { Component, OnInit, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/interfaces/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tickets: Array<Ticket> = [
    {title:'Diurno', value: 45000},
    {title:'Tarde', value: 50000},
    {title:'Nocturno', value: 35000},
  ]

  selectedTicketIdx = -1;

  subtotal: number = 0;
  count: number = 1;

  canContinue = false;

  onTicketClick(idx: number) {
    this.selectedTicketIdx = idx;
    const ticketValue = this.tickets[this.selectedTicketIdx].value;
    console.log(this.count, ticketValue)
    this.updateCount(this.count, ticketValue)
    this.evaluateContinue();
  }

  updateCount(count: number, value: number) {
    this.subtotal = count * value;
  }

  onInputChange(inputRef : HTMLInputElement) {
    this.count = parseInt(inputRef.value);
    if (this.selectedTicketIdx != -1) {
      const ticketValue = this.tickets[this.selectedTicketIdx].value;
      this.updateCount(this.count, ticketValue);
    }else {
      this.subtotal = 0;
      this.count = 1;
      inputRef.value = "1";
    }
    this.evaluateContinue();
  }

  evaluateContinue() {
    this.canContinue = this.selectedTicketIdx != -1;
  }

  onContinue(): void {
    this.router.navigateByUrl('combos');
  }

}
