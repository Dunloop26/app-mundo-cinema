import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceProduct } from 'src/app/interfaces/invoice-product';
import { CheckoutService } from 'src/app/services/checkout.service';

type InvoiceData = { id: string, products: Array<InvoiceProduct>, invoiceTotal: number};
@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss'],
})
export class InvoiceShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private checkoutSrv: CheckoutService
  ) {}

  ngOnInit(): void {
    const invoiceData = this.route.snapshot.data.invoiceInfo.response.data;
    this.id = invoiceData.code;
    this.products = invoiceData.products.map((product : any) => {
      const output : InvoiceProduct = {
        name: product.name,
        count: product.no_products,
        total: product.products_value,
      }
      return output
    });
    this.products.unshift({
      name: `Ticket ${invoiceData.ticket_name}`,
      count: invoiceData.no_tickets,
      total: invoiceData.tickets_value,
    })
    this.invoiceTotal = invoiceData.total_value;
    console.log(invoiceData)
    this.date = Date.parse(invoiceData.date_time);
    console.log(this.date);
  }

  id: string = '';
  products: Array<InvoiceProduct> = [];
  invoiceTotal: number = 0;
  date: number = 0;
}
