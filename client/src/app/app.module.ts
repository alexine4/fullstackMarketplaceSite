import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { NewOrderPageComponent } from './order-page/order-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';

import { ProductFormPageComponent } from './products-page/product-form-page/product-form-page.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/classes/auth.guard';
import { CategoriesService } from './shared/services/categories.service';

import { OrdersService } from './shared/services/orders.service';
import { OrderListService } from './shared/services/orderListService';
import { PositionsService } from './shared/services/position.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PositionFormComponent } from './products-page/product-form-page/position-form/position-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    NewOrderPageComponent,
    ProductsPageComponent,
    ProductFormPageComponent,
    LoaderComponent,
    HistoryFilterComponent,
    HistoryPageComponent,
    HistoryListComponent,
    PositionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoriesService,
    PositionsService,
    OrdersService,
    OrderListService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
