import { Injectable } from '@angular/core';
import { HttpClient,  } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject,Subject ,Observable} from 'rxjs';
import { Router } from "@angular/router";
// import { signUp } from '../data-Type';


@Injectable({
  providedIn: 'root'
})
export class SellerService {



  isSellerSignUp = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient,private router:Router) { }

  postSignUpSeller(data: any){
    return this.http.post("http://localhost:3000/api/seller/signUp",data)

  }

  getLoginSeller(data:any){
    return this.http.post(`http://localhost:3000/api/seller/login`,data)

  }


  // getAllProduct(){
  //   this.http.get(`http://localhost:3000/api/seller/get`)
  //     .pipe(((res:any)=>{
  //       return res
  //     }))
  // }
}
