import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  register_Obj : any = []
  login_Obj : any = []
  passType: string ="password"
  authError:string = ""
  showLogin = false
  constructor(private api:UserService,private router:Router,private product:ProductService){}
  signUp(){
    let params = {
      email: this.register_Obj.email,
      password: this.register_Obj.password,
    }
    this.api.postSignUpUser(params)

  }
  loginUser(){
    let params = {
      email: this.login_Obj.email,
      password: this.login_Obj.password,
    }
    this.api.getLoginUser(params)
    this.api.inValidUserAuth.subscribe((result)=>{
      if (result) {
        this.authError = "Please Enter Valid User Details"
      } else {
      console.log("RES");
        this.localCartToRemoteCart()
      }

    })
  }
  ngOnInit(): void {
    // this.api.reloadUser()
  }

  openLogin(){
    this.showLogin = true
  }
  openSignup(){
    this.showLogin = false

  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user)._id
    if (data) {
    console.log(data,"asas");

      let cartDataList:any[]= JSON.parse(data)

      cartDataList.forEach((res:any,index) => {
        let cartData = {
          ...res,
          productId :res._id,
          userId,
        }

        delete cartData._id
        this.product.addToCart(cartData).subscribe((result)=>{
          console.warn("Item Stored");
        })
        console.log(cartDataList.length,"CART");

        if (cartDataList.length===index+1) {
          localStorage.removeItem('localCart')
        }
      });
    }
    this.product.getCartList(userId)

  }
}
