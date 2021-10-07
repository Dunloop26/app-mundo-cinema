import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new Subject<boolean>();

  public showSpinner(): void {
    this.isLoading$.next(true);
  }

  public hideSpinner(): void {
    this.isLoading$.next(false);
  }

}