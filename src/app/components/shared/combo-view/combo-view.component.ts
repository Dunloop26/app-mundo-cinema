import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-view',
  templateUrl: './combo-view.component.html',
  styleUrls: ['./combo-view.component.scss']
})
export class ComboViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title?: string = 'Title';
  @Input() subtitle?: string = 'Subtitle';
  @Input() countDisabled : boolean = false;

  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  onCountChange(newCount: number) {
    this.countChange.emit(newCount);
  }

}
