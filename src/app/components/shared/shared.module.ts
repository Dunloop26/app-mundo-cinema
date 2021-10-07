import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PageDescriptionHeaderComponent } from './page-description-header/page-description-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageDescriptionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageDescriptionHeaderComponent
  ]
})
export class SharedModule { }
