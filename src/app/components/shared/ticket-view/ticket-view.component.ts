import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title?: string = 'Title';
  @Input() subtitle: string = 'Subtitle';
  @Input() select: boolean = false;

}
