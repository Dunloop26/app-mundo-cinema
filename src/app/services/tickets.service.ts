import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Ticket|any> {
    return this.http.get<Ticket|any>('/tickets').pipe(
      filter(res => res && !!res),
      tap((res) => {
        console.log(res);
      }),
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    )
  }


}
