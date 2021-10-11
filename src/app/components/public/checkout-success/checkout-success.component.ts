import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.invoiceId = params['id'])
  }

  invoiceId : string = '';

  zeroFill(id: string) {
    const pad = '00000000';
    const result = (pad + id).slice(-pad.length);
    return result;
  }
}
