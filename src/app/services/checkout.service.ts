import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  currentInvoiceId : string | undefined;

  sendInvoiceData(data: Invoice): Observable<any> {
    return this.http.post('api/invoicing', data).pipe(
      filter((res) => res && !!res),
      tap((res) => console.log(res)),
      catchError((err) => {
        console.error(err);
        return of(err);
      })
    );
  }

  clearInvoiceId() {
    this.currentInvoiceId = undefined;
  }

  getInvoice(id: string) {
    return this.http.get('api/invoicing/' + id).pipe(
      filter((res) => res && !!res),
      catchError((err) => {
        console.error(err);
        return of(err);
      })
    );
  }
}
