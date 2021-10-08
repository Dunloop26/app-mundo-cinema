import {CurrencyPipe} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/interfaces/combo';
import { ComboInfo } from 'src/app/interfaces/combo-info';
import { OrderStorageService } from 'src/app/services/order-storage.service';
import {ComboViewComponent} from '../shared/combo-view/combo-view.component';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss'],
})
export class CombosComponent implements OnInit {
  constructor(private router: Router, private order: OrderStorageService, private currency: CurrencyPipe) {}

  ngOnInit(): void {
    this.ticketCount = this.order.ticketCount;
    this.ticketValue = (this.order.ticket?.value ?? 0) * this.ticketCount;
  }

  combos: Array<Combo> = [
    { id: "CC-01", name: 'Combo alitas', value: 12500 },
    { id: "CC-02", name: 'Combo papas con gaseosa', value: 13450 },
    { id: "CC-03", name: 'Combo hamburguesa', value: 18500 },
  ];

  ticketValue = 0;
  ticketCount = 1;

  subtotal: number = 0;
  subtotalCombo: number = 0;
  count: number = 0;

  canContinue = false;

  updateCount(count: number, value: number) {
    this.subtotal = count * value;
  }

  transformToCurrency(value: number | string) : string {
    return this.currency.transform(value, undefined, 'symbol', '0.2-2') || value.toString();
  }

  comboViewCountChange(data : {sender: ComboViewComponent, delta: number}) : void {
    this.count += data.delta
    console.log(this.ticketCount, this.count, data.delta)
  }

  onContinue(): void {
    this.order.saveCombosInfo(this.getSelectedCombos());
    this.router.navigateByUrl('combos');
  }

  private getSelectedCombos() : Array<ComboInfo> {
    return []
  }
}
