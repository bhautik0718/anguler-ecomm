import { HttpClientModule,HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { FooterComponent } from './footer/footer.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SharedPaginationModule } from "src/app/shared-pagination/shared-pagination.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrderComponent } from './my-order/my-order.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    FooterComponent,
    SellerAddProductComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckOutComponent,
    MyOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedPaginationModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
