import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from 'src/app/interfaces/invoice-product';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutSrv: CheckoutService) { }

  ngOnInit(): void {
    console.log(this.checkoutSrv.currentInvoiceId);
    this.id = this.checkoutSrv.currentInvoiceId?.toString() ?? "";
  }

  id: string = '';
  date: Date = new Date();
  products: Array<InvoiceProduct> = [];

  buildProductList() : void{
    this.products = [];

  }

  formatId(id :string) {
    const pad = "00000000";
    const result = (pad + id).slice(-pad.length);
    return result;
  }

}
