import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewOrderPageComponent } from './order-page/order-page.component';


import { ProductFormPageComponent } from './products-page/product-form-page/product-form-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: 'history', component: HistoryPageComponent },

      { path: 'order', component: NewOrderPageComponent },
      { path: 'order/:id', component: NewOrderPageComponent },

      { path: 'categories', component: ProductsPageComponent },
      { path: 'categories/new', component: ProductFormPageComponent },
      { path: 'categories/:id', component: ProductFormPageComponent },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
