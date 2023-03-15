import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,  } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject,Subject ,Observable} from 'rxjs';
import { Router } from "@angular/router";
import { AuthData } from "../data-Type";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  inValidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient,private router:Router) { }

  postSignUpUser(params:any){
   return this.http.post("http://localhost:3000/api/user/signUp",params).subscribe((res: any) => {
    if (res) {
      localStorage.setItem('user', JSON.stringify(res.data));
      this.router.navigate(['/']);

    }

 })
  }

  getLoginUser(params:any){
    return this.http.post("http://localhost:3000/api/user/login",params).subscribe((res: any) => {
      if (res) {
        this.inValidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(res.data));
        this.router.navigate(['/']);

      } else {
        this.inValidUserAuth.emit(true)
      }
    })
  }

  logout(){
    return this.http.post("http://localhost:3000/api/user/logout",{})
  }
}
