import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  table_data: any
  productQuantity: number = 1
  base_url = environment.url
  removeCart = false
  cartData:any
constructor(private route:ActivatedRoute , private api: ProductService){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.api.getProduct(id).subscribe((data :any)=>{
      this.table_data = data.data
      let cartData = localStorage.getItem('localCart')
      if (id && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item:any)=>id == item._id)
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user')
      if (user) {

        let userId = user && JSON.parse(user)._id
        this.api.getCartList(userId)
        this.api.cartData.subscribe((result)=>{
          let Item =   result.filter((item:any)=>id === item.productId)
          if (Item.length) {
            this.cartData = Item[0]
          this.removeCart = true
          }
        })
      }
    })
  }
  handleQuantity(val:string){
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity+=1;
    }else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity-=1;
    }
  }
  addToCart(){
    this.removeCart = true
    if (this.table_data) {
      console.log(this.table_data,"FFFFFFF");

      this.table_data.quantity = this.productQuantity
    if (!localStorage.getItem('user')) {
      this.api.localAddToCart(this.table_data)
    } else {
      console.log("User Loged In");
      let user  = localStorage.getItem('user')
      let userId = user && JSON.parse(user)._id
      let cartData = {
        ...this.table_data,
        userId,
        productId:this.table_data._id
      }
      delete cartData._id
      this.api.addToCart(cartData).subscribe((result)=>{
        if (result) {
          this.api.getCartList(userId)
          this.removeCart = true
          alert("Product Added To Cart")
        }
      })
    }
    }
  }
  removeToCart(id:string){
    this.removeCart = false

    if (!localStorage.getItem('user')) {
    this.api.removeFromCart(id)
    } else {
      let user  = localStorage.getItem('user')
      let userId = user && JSON.parse(user)._id
      this.cartData && this.api.removeToCart(this.cartData._id).subscribe((result)=>{
        if (result) {
          this.api.getCartList(userId)
        }
      })
      this.removeCart = false

    }
  }
}
