import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasTicketGuard } from './guards/has-ticket.guard';

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
})
export class AppRoutingModule {}
