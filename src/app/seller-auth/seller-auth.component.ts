import { Component,OnInit } from '@angular/core';
import { SellerService } from "../services/seller.service";
import {  } from "src/environments/environment";
import { Router } from "@angular/router";
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  formData : any = []
  formDatas : any = []

  showLogin = false
  constructor(private api:SellerService,private router:Router){}
  addSeller(){
    const data = new FormData()
    let params = {
      email: this.formData.email,
      password: this.formData.password,

    }
    this.api.postSignUpSeller(params).subscribe((res: any) => {
      if (res.status.toString() == "200" && res.data) {
        localStorage.setItem('seller', JSON.stringify(res.data));
        this.router.navigate(['/seller-home']);

      }
    }, (error) => {
      console.log("Seller Not Created");

    })

  }
  loginSeller(){
    let params = {
      email: this.formDatas.email,
      password: this.formDatas.password,

    }
    this.api.getLoginSeller(params).subscribe((res: any) => {
      console.log(res.data,"AAAA");

      if (res.status == 200 && res.data) {
        localStorage.setItem('seller', JSON.stringify(res.data));
        this.router.navigate(['/seller-home']);

      }
    }, (error) => {
      console.log("Seller Not Loged In");

    })

  }
  ngOnInit(): void {
    // this.api.reloadSeller()
  }

  openLogin(){
    this.showLogin = true
  }
  openSignup(){
    this.showLogin = false
  }
}
