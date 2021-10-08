import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ComboViewChangeEvent = { sender: ComboViewComponent; delta: number };
@Component({
  selector: 'app-combo-view',
  templateUrl: './combo-view.component.html',
  styleUrls: ['./combo-view.component.scss'],
})
export class ComboViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() title?: string = 'Title';
  @Input() subtitle?: string = 'Subtitle';
  @Input() countDisabled: boolean = false;
  @Input() value: number = 0;

  private _disableIncrement: boolean = false;
  private _disableDecrement: boolean = false;

  get disableIncrement() : boolean {
    return this._disableIncrement;
  }

  @Input('disableIncrement')
  set disableIncrement(value : boolean) {
    this._disableIncrement = value;
    if (this._disableIncrement) this.maxValue = this.value;
    else this.maxValue = Number.POSITIVE_INFINITY;
  }

  get disableDecrement() : boolean {
    return this._disableDecrement;
  }

  @Input('disableDecrement')
  set disableDecrement(value : boolean) {
    this._disableDecrement = value;
    if (this.disableDecrement) this.minValue = this.value;
    else this.minValue = 0;
  }

  @Output() countChange: EventEmitter<ComboViewChangeEvent> =
    new EventEmitter<ComboViewChangeEvent>();

  previousValue = 0;
  minValue = 0;
  maxValue = Number.POSITIVE_INFINITY;

  onCountChange(event: Event) {

    const target: any | undefined = event?.target ?? undefined;
    if (target != null && target != undefined) {

      this.value = target.valueAsNumber;
      let delta = 0;
      if (this.value != this.previousValue) {
        delta = this.value - this.previousValue;
      } else {
        delta = 0;
      }
      this.previousValue = this.value;

      this.countChange.emit({
        sender: this,
        delta: delta,
      });
    }
  }
}
