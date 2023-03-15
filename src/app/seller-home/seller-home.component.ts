import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  base_url = environment.url;
  constructor(private api:ProductService){}
  getProduct:any=[]
  showAdd !: boolean
  showUpdate !: boolean
  ngOnInit(): void {
    this.allProductGet()
  }
  allProductGet(){
    this.api.getAllProduct()
    .subscribe((res:any[])=>{
      this.getProduct = res
  })
  }
  deleteProduct(item:any){
    this.api.deleteProduct(item._id)
    .subscribe(res=>{
      alert("Deleted")
      this.allProductGet()
    })
  }

}
