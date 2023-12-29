import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './modules/pages/login/login.component';
import { RegisterComponent } from './modules/pages/register/register.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,

    // COMPONENTS STANDALONE
    LoginComponent,
    RegisterComponent
  ],

  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
