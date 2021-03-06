import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './cart/cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductViewComponent } from './home/product-view/product-view.component';


const routes: Routes = [
  // direct to home component -- always on top
  {path: '', component: HomeComponent},
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'register', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  { path: 'home', component: HomeComponent,
    children: [
      {path: 'productview/:id', component: ProductViewComponent}
    ]
  },
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'productview/:id', component: ProductViewComponent},
    // for unspecified routes redirect to home component -- always at the bottom
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
