import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  base_url = environment.url
  cartData:any

  priceSummary:any = {
    price : 0,
    discount : 0,
    tax : 0,
    delivery : 0,
    total : 0,

  }
  constructor(private product:ProductService,private router:Router){}

  ngOnInit(): void {
    this.getCartdetails()
  }
  getCartdetails(){
    this.product.currentCart().subscribe((result:any)=>{

      this.cartData = result.data
      let price= 0
      result.data.forEach((item) => {
        price = price + (+ item.price * + item.quantity)
      });
      this.priceSummary.price = price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/10
      this.priceSummary.delivery = 100
      this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount
      if (!this.cartData.length) {
    this.router.navigate(['/'])

      }
    })
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
  removeToCart(id:string){
    if (!localStorage.getItem('user')) {
    } else {
      let user  = localStorage.getItem('user')
      let userId = user && JSON.parse(user)._id
      this.cartData && this.product.removeToCart(id).subscribe((result)=>{
        if (result) {
          this.product.getCartList(userId)
          this.getCartdetails()

        }
      })

    }
  }
}
