import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  totalPrice : number
  formData : any = []
  constructor(private product:ProductService,private router:Router){}
  ngOnInit(): void {

    this.product.currentCart().subscribe((result:any)=>{
      this.formData = result
      let price= 0
      result.data.forEach((item) => {
        price = price + (+ item.price * + item.quantity)
      });
      this.totalPrice = price + (price/10) + 100 - (price/10)
      console.log(this.totalPrice,"totalPrice");

    })
  }
  addCheckOut(){
    const data = new FormData();
    let params = {
      email: this.formData.email,
      phone: this.formData.phone,
      address: this.formData.address
    }
    let user  = localStorage.getItem('user')
    let userId = user && JSON.parse(user)._id
    if (this.totalPrice) {
      let order = {
        ...params,
        totalPrice:this.totalPrice,
        userId
      }
      this.formData.data.forEach((item)=>{
        this.product.deleteCartItems(item._id)
      })
      this.product.orderNow(order).subscribe((result)=>{
        if (result) {
          alert('order Placed')
          this.router.navigate(['my-orders'])
        }
      })
    }
}
}
