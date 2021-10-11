import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CheckoutService } from '../services/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceShowResolver implements Resolve<any> {
  constructor(private checkoutSrv: CheckoutService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.params.id;
    return this.checkoutSrv.getInvoice(id);
  }
}
