import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PageDescriptionHeaderComponent } from './page-description-header/page-description-header.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { ComboViewComponent } from './combo-view/combo-view.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageDescriptionHeaderComponent,
    TicketViewComponent,
    ComboViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageDescriptionHeaderComponent,
    TicketViewComponent,
    ComboViewComponent
  ]
})
export class SharedModule { }
