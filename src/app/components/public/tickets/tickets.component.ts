import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/interfaces/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tickets: Array<Ticket> = [
    {title:'Diurno', value: 50000},
    {title:'Tarde', value: 50000},
    {title:'Nocturno', value: 50000},
  ]

  selectedTicketIdx = -1;

  onTicketClick(idx: number) {
    this.selectedTicketIdx = idx;
  }

}
