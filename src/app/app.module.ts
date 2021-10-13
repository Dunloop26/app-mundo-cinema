import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
