import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceProduct } from 'src/app/interfaces/invoice-product';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  @Input() id: string = '';
  @Input() products: Array<InvoiceProduct> = [];
  @Input() invoiceTotal: number = 0;
  @Input() date: number = 0;

  zeroFill(value: string){
    const pad = '00000000';
    const result = (pad + value).slice(-pad.length);
    return result;
  }
}
