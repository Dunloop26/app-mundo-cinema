import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, catchError } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product|any> {
    return this.http.get("/products").pipe(
      filter(res => res && !!res),
      tap(
        (res) => {
          console.log(res);
        }
      ),
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    )
  }
}
