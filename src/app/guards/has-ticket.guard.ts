import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrderStorageService } from '../services/order-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HasTicketGuard implements CanActivate {
  constructor(private order: OrderStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.order.hasTicket()) {
      return this.router.parseUrl('home');
    } else {
      return true;
    }
  }
}
