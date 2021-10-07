import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/interfaces/combo';
import { ComboInfo } from 'src/app/interfaces/combo-info';
import { OrderStorageService } from 'src/app/services/order-storage.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss'],
})
export class CombosComponent implements OnInit {
  constructor(private router: Router, private order: OrderStorageService) {}

  ngOnInit(): void {}

  combos: Array<Combo> = [
    { id: "CC-01", name: 'Combo alitas', value: 12500 },
    { id: "CC-02", name: 'Combo papas con gaseosa', value: 13450 },
    { id: "CC-03", name: 'Combo hamburguesa', value: 18500 },
  ];

  selectedComboIdx = -1;

  subtotal: number = 0;
  subtotalCombo: number = 0;
  count: number = 1;

  canContinue = false;

  updateCount(count: number, value: number) {
    this.subtotal = count * value;
  }

  onInputChange(inputRef: HTMLInputElement) {
    this.count = parseInt(inputRef.value);
    if (this.selectedComboIdx != -1) {
      const comboValue = this.combos[this.selectedComboIdx].value;
      this.updateCount(this.count, comboValue);
    } else {
      this.subtotal = 0;
      this.count = 1;
      inputRef.value = '1';
    }
    this.evaluateContinue();
  }

  evaluateContinue() {
    this.canContinue = this.selectedComboIdx != -1;
  }

  onContinue(): void {
    this.order.saveCombosInfo(this.getSelectedCombos());
    this.router.navigateByUrl('combos');
  }

  private getSelectedCombos() : Array<ComboInfo> {
    return []
  }
}
