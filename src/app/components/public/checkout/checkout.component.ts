import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from 'src/app/interfaces/invoice-product';
import { Product } from 'src/app/interfaces/product';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderStorageService } from 'src/app/services/order-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutSrv: CheckoutService, private orderSrv: OrderStorageService) { }

  ngOnInit(): void {
    console.log(this.checkoutSrv.currentInvoiceId);
    this.id = this.checkoutSrv.currentInvoiceId?.toString() ?? "";
    this.buildProductList();
  }

  id: string = '';
  date: Date = new Date();
  products: Array<InvoiceProduct> = [];
  invoiceTotal = 0;

  buildProductList() : void{
    this.products = [];
    this.invoiceTotal = 0;

    const ticket = this.orderSrv.ticket;
    const count = this.orderSrv.ticketCount;
    const ticketProduct = {
        name: `Ticket ${ticket?.title}` ?? '',
        count,
        total: (ticket?.value ?? 0) * count,
      }
    this.products.push(ticketProduct)
    this.invoiceTotal += ticketProduct.total;

    if (this.orderSrv.hasCombos()) {
      const combos = this.orderSrv.combos;
      for (let comboInfo of combos) {
        let product : InvoiceProduct = {
          name: comboInfo.combo.name,
          count: comboInfo.count,
          total: comboInfo.combo.value * comboInfo.count,
        }
        this.invoiceTotal += product.total;
        this.products.push(product);
      }
    }
  }

  formatId(id :string) {
    const pad = "00000000";
    const result = (pad + id).slice(-pad.length);
    return result;
  }

}
