import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit{
  orderData : any[]
  constructor(private product : ProductService){}

  ngOnInit(): void {
   this.getOrderList()
  }
  cancelOrder(id:string){
    this.product.cancelOrders(id).subscribe((result)=>{
      this.getOrderList()
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result:any)=>{
      this.orderData = result.data
    })
  }
}
