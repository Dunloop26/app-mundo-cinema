import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/interfaces/combo';
import { ComboInfo } from 'src/app/interfaces/combo-info';
import { Product } from 'src/app/interfaces/product';
import { ProductResponse } from 'src/app/interfaces/product-response';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderStorageService } from 'src/app/services/order-storage.service';
import { ProductsService } from 'src/app/services/products.service';
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
    private currency: CurrencyPipe,
    private productSrv: ProductsService,
    private checkoutSrv: CheckoutService,
  ) {}

  ngOnInit(): void {
    this.ticketCount = this.order.ticketCount;
    this.ticketValue = (this.order.ticket?.value ?? 0) * this.ticketCount;
    if (this.order.ticket == undefined) {
      this.router.navigateByUrl('tickets');
    } else {
      this.productSrv.getAll(this.order.ticket.code).subscribe((res) => {
        this.combosAvailable = res.response.available;
        if (this.combosAvailable)
          this.parseData(res.response.data);
      });
    }
  }

  parseData(data: Array<ProductResponse>): void {
    this.combos = [];
    for(let response of data) {
      this.combos.push(
        {
          id: response.code,
          name: response.name,
          value: response.price
        }
      )
    }
  }

  combos: Array<Combo> = [];

  // Ticket values
  ticketValue = 0;
  ticketCount = 1;

  // Current View variables
  subtotal: number = 0;
  subtotalCombo: number = 0;
  count: number = 0;

  comboList: Array<{ id: string; quantity: number }> = [];
  combosAvailable = false;

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
          console.log(this.comboList);
          this.comboList.splice(index, 1);
          console.log(this.comboList, 'AFTER');
        }
      } else {
        // Si la cantidad de elementos es mayor a 0
        // Lo añado a la lista
        let combo = this.comboList.find(
          (comboInfo) => comboInfo.id == comboView.id
        );
        if (combo != undefined) {
          combo.quantity = comboView.value;
        } else {
          this.comboList.push({
            id: comboView.id,
            quantity: comboView.value,
          });
        }
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
    console.log('Combo list', this.comboList);
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
    this.order.saveDate(Date.now());
    this.checkoutSrv.clearInvoiceId()
    const currentTicket = this.order.ticket;
    const amount = this.order.ticketCount;
    if (currentTicket != undefined){
      this.checkoutSrv.sendInvoiceData({
        ticket: {code: currentTicket?.code, amount},
        products: this.parseToProducts(this.order.combos)
      }).subscribe(res => {
        this.checkoutSrv.currentInvoiceId = res.response.invoice
        this.router.navigate(['checkout']);
      });
    }
  }

  parseToProducts(combos: Array<ComboInfo>) : Array<Product> {
    const products : Array<Product>= []
    for(let comboInfo of combos) {
      let combo = comboInfo.combo
      let product : Product = {
        code: combo.id,
        amount: comboInfo.count,
      }
      products.push(product);
    }
    return products;
  }

  private getSelectedCombos(): Array<ComboInfo> {
    let combos: Array<ComboInfo> = [];
    for (let comboInfo of this.comboList) {
      const combo = this.getComboById(comboInfo.id);
      if (combo == undefined) continue;
      combos.push({
        combo,
        count: comboInfo.quantity,
      });
    }
    return combos;
  }
}
