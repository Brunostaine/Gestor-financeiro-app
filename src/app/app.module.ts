import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './modules/pages/login/login.component';
import { RegisterComponent } from './modules/pages/register/register.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ToastModule,

    // COMPONENTS STANDALONE
    LoginComponent,
    RegisterComponent,
  ],

  providers: [CookieService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
