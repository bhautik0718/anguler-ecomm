import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../services/product.service';
import { SellerService } from "../services/seller.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private route:Router,private service:SellerService,private api:ProductService){}
  userIsAuthenticated = false
  menuType:string=''
  cartItems = 0
  ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType='seller'
        }else if (localStorage.getItem('user') ) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.menuType='user'
          this.api.getCartList(userData._id)
        }
        else{
          this.menuType=''

        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.api.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userlogout(){
    localStorage.removeItem('user')
    this.api.cartData.emit([])
    this.route.navigate(['/'])
  }
}
