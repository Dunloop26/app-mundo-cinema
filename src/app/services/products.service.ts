import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, catchError } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAll(ticket: string): Observable<Product | any> {
    const params = new HttpParams();
    params.set('ticket', ticket);
    return this.http.get(`api/products?ticket=${ticket}`).pipe(
      filter((res) => res && !!res),
      tap((res) => {
        console.log(res);
      }),
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }
}
