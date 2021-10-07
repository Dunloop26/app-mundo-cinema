import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/interfaces/combo';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss'],
})
export class CombosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  combos: Array<Combo> = [
    { name: 'Diurno', value: 45000 },
    { name: 'Tarde', value: 50000 },
    { name: 'Nocturno', value: 35000 },
  ];

  selectedComboIdx = -1;

  subtotal: number = 0;
  subtotalCombo: number = 0;
  count: number = 1;

  canContinue = false;

  onComboClick(idx: number) {
    this.selectedComboIdx = idx;
    const comboValue = this.combos[this.selectedComboIdx].value;
    this.updateCount(this.count, comboValue);
    this.evaluateContinue();
  }

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
    this.router.navigateByUrl('combos');
  }
}
