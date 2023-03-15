import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isSellerLoghedin =new BehaviorSubject<boolean>(false);
  cartData = new EventEmitter<any[] | []>()
  constructor(private http: HttpClient ,private router:Router) { }
  dialogResult: any;



  postAddProduct(data:any){
    return this.http.post("http://localhost:3000/api/product/addProduct",data)

  }
 getAllProduct(){
   return this.http.get<any>(`http://localhost:3000/api/product/getAll`)
      .pipe(((res:any)=>{
        return res
      }))
  }
  deleteProduct(id :number){
    return this.http.delete<any>("http://localhost:3000/api/product/delete/"+id)
    .pipe((res:any)=>{
      console.log(res);

      return res
    })
  }
  getProduct(id :string){
    return this.http.get<any>("http://localhost:3000/api/product/getProduct/"+id)
    .pipe((res:any)=>{
      return res
    })
  }
  sellerProductGet(id:string){
    return this.http.get<any>("http://localhost:3000/api/product/sellerProductGetId/"+id)
    .pipe(((res:any)=>{
      return res
    }))
 }
 productUpdate(data: any,id:number){
  return this.http.put<any>("http://localhost:3000/api/product/updateProduct/" + id,data,{observe:'response'})
  }
  getAllSearchProduct(params, bodyparams?){
    let queryParams = new HttpParams();
    if (params.page) {
      queryParams = queryParams.append('page', params.page);
    }
    if (params.limit) {
      queryParams = queryParams.append('limit', params.limit);
    }
    if (params.searchText) {
      queryParams = queryParams.append('searchText', params.searchText);
    }
    return this.http.post("http://localhost:3000/api/product/getAllProduct", bodyparams, {
      params: queryParams,
    });
   }
   localAddToCart(data:any){
      let cartData = []
      let localCart = localStorage.getItem('localCart')
      if (!localCart) {
        localStorage.setItem('localCart',JSON.stringify([data]))
      } else {
        cartData = JSON.parse(localCart)
        cartData.push(data)
        localStorage.setItem('localCart',JSON.stringify(cartData))
      }
      this.cartData.emit(cartData)
   }
   removeFromCart(id:string){
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items : any[] = JSON.parse(cartData)
      items = items.filter((item:any)=>id !== item._id)
      console.log(items);
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items)
    }
   }
   addToCart(cartData : any){
    return this.http.post(`http://localhost:3000/api/product/cart`,cartData)
   }
   getCartList(userId:string ){
    return this.http.get<any[]>("http://localhost:3000/api/product/getCart/"+ userId).subscribe((result:any)=>{

      this.cartData.emit(result.data)
    })
   }
   removeToCart(id:string){
    return this.http.delete<any[]>("http://localhost:3000/api/product/deleteCart/"+ id)
   }
   currentCart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<any[]>("http://localhost:3000/api/product/getCart/"+ userData.id)
   }
   orderNow(data:any){
    return this.http.post(`http://localhost:3000/api/product/order_add`,data)
   }
   orderList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<any[]>("http://localhost:3000/api/product/order_get/"+ userData.id)
   }
   deleteCartItems(id:string){
    return this.http.delete<any[]>("http://localhost:3000/api/product/deleteCart/"+ id).subscribe((result)=>{
      if (result) {
        this.cartData.emit([])
      }
    })
   }
   cancelOrders(id:string){
    return this.http.delete<any[]>("http://localhost:3000/api/product/order_delete/"+ id)
   }
}
