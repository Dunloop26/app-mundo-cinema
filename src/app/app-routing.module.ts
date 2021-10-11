import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasTicketGuard } from './guards/has-ticket.guard';
import { InvoiceShowResolver } from './resolvers/invoice-show.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/public/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./components/public/tickets/tickets.module').then(
        (m) => m.TicketsModule
      ),
  },
  {
    path: 'combos',
    loadChildren: () =>
      import('./components/combos/combos.module').then((m) => m.CombosModule),
    canActivate: [HasTicketGuard],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./components/public/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
    canActivate: [HasTicketGuard],
  },
  {
    path: 'invoice/:id',
    loadChildren: () =>
      import(
        './components/public/checkout-success/checkout-success.module'
      ).then((m) => m.CheckoutSuccessModule),
    canActivate: [HasTicketGuard]
  },
  {
    path: 'invoice/details/:id',
    loadChildren: () =>
      import('./components/public/invoice-show/invoice-show.module').then(
        (m) => m.InvoiceShowModule
      ),
    resolve: { invoiceInfo: InvoiceShowResolver },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./components/public/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [InvoiceShowResolver],
})
export class AppRoutingModule {}
