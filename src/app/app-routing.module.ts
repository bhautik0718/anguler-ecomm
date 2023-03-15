import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
// import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'seller',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent, canActivate:[AuthGuardGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent, canActivate:[AuthGuardGuard]},
  {path:'seller-update-product/:id',component:SellerAddProductComponent},
  {path:'product-details/:id',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout',component:CheckOutComponent},
  {path:'my-orders',component:MyOrderComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
