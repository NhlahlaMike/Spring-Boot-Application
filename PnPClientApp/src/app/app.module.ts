import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CartComponent } from './cart/cart.component';
import { TokenStorageService } from './auth/token-storage.service';
import { ProductViewComponent } from './home/product-view/product-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPanelComponent,
    NavMenuComponent,
    CartComponent,
    ProductViewComponent,
  ],
  imports: [
    NgbModule,
    ModalModule.forRoot(),
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [httpInterceptorProviders, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
