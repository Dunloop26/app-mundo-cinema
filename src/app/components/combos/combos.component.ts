import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/interfaces/combo';
import { ComboInfo } from 'src/app/interfaces/combo-info';
import { OrderStorageService } from 'src/app/services/order-storage.service';
import { ComboViewComponent } from '../shared/combo-view/combo-view.component';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss'],
})
export class CombosComponent implements OnInit {
  constructor(
    private router: Router,
    private order: OrderStorageService,
    private currency: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.ticketCount = this.order.ticketCount;
    this.ticketValue = (this.order.ticket?.value ?? 0) * this.ticketCount;
  }

  combos: Array<Combo> = [
    { id: 'CC-01', name: 'Combo alitas', value: 12500 },
    { id: 'CC-02', name: 'Combo papas con gaseosa', value: 13450 },
    { id: 'CC-03', name: 'Combo hamburguesa', value: 18500 },
  ];

  // Ticket values
  ticketValue = 0;
  ticketCount = 1;

  // Current View variables
  subtotal: number = 0;
  subtotalCombo: number = 0;
  count: number = 0;

  comboList: Array<{ id: string; quantity: number }> = [];

  updateCount(count: number, value: number) {
    this.subtotal = count * value;
  }

  transformToCurrency(value: number | string): string {
    return (
      this.currency.transform(value, undefined, 'symbol', '0.2-2') ||
      value.toString()
    );
  }

  comboViewCountChange(data: {
    sender: ComboViewComponent;
    delta: number;
  }): void {
    this.count += data.delta;

    const comboView = data.sender;
    const quantity = comboView.value;

    // Si existe el comboView
    if (comboView.id != undefined) {

      // Si no hay cantidad definida del combo
      if (quantity <= 0) {
        // Encuentro el combo
        const comboInfo = this.comboList.find(
          (comboInfo) => comboInfo.id == comboView.id
        );
        // Si encuentro el combo
        if (comboInfo != undefined) {
          // Remuevo el combo via el index
          const index = this.comboList.indexOf(comboInfo);
          this.comboList.splice(index, 1);
        }
      } else {
        // Si la cantidad de elementos es mayor a 0
        // Lo añado a la lista
        this.comboList.push({
          id: comboView.id,
          quantity: comboView.value,
        });
      }
    }
    this.updateSubtotalCombo();
  }

  private getComboById(id: string): Combo | undefined {
    const result = this.combos.find((combo: Combo) => combo.id == id);
    return result;
  }

  updateSubtotalCombo() {
    this.subtotalCombo = 0;
    for (let comboInfo of this.comboList) {
      const id = comboInfo.id;
      const currentCombo: Combo | undefined = this.getComboById(id);
      if (currentCombo != undefined) {
        this.subtotalCombo += currentCombo.value * comboInfo.quantity;
      }
    }

    console.log(this.subtotalCombo);
  }

  onContinue(): void {
    this.order.saveCombosInfo(this.getSelectedCombos());
    this.router.navigateByUrl('checkout');
  }

  private getSelectedCombos(): Array<ComboInfo> {
    let combos : Array<ComboInfo> = []
    for (let comboInfo of this.comboList) {
      const combo = this.getComboById(comboInfo.id);
      if (combo == undefined) continue;
      combos.push({
        combo,
        count: comboInfo.quantity
      });
    }
    return combos;
  }
}
