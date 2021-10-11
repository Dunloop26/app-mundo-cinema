import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceShowComponent } from './invoice-show.component';

const routes: Routes = [{ path: '', component: InvoiceShowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceShowRoutingModule { }
