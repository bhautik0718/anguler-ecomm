import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { ProductService } from '../services/product.service';
import {NgForm} from '@angular/forms'
import { ActivatedRoute,ParamMap } from "@angular/router";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{

  constructor(private api:ProductService,private router:Router,private sanitizer:DomSanitizer,private route:ActivatedRoute){}
  formData : any = []
  dialogResult: any;
  newImageUploaded: boolean = false;
  isImageChanged = false;
  // showUpdate !: boolean
  showAdd = false
  // dialogType: string = "add";

  private id:string
  base_url = environment.url
  clearCLFile() {
    this.formData.sliderImageUrl = '';
    this.formData.sliderImageFile = null;
    this.newImageUploaded = false;
  }
  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newImageUploaded = true;
      this.isImageChanged = true;
      this.formData.sliderImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.formData.sliderImageFile = event.target.files[0];
    }
  }

  addProduct(){
      const data = new FormData();
      this.showAdd = true

      data.append('employee_image',this.formData.sliderImageFile);
      let params = {
        name: this.formData.name,
        category: this.formData.category,
        price: this.formData.price,
        description: this.formData.description
      }
      data.append('body', JSON.stringify(params));
      this.api.postAddProduct(data).subscribe((res:any) =>{
        if (res.status == 200 && res.data) {
          this.dialogResult = res.data;

        }
        localStorage.setItem('seller',JSON.stringify(res))
        this.router.navigate(['seller-home'])
      })

  }
  updateProduct(){
      const data = new FormData();
      this.showAdd = false

      data.append('employee_image',this.formData.sliderImageFile);
      let params = {
        name: this.formData.name,
        category: this.formData.category,
        price: this.formData.price,
        description: this.formData.description,
      }
      console.log(params,"PAR");
      data.append('body', JSON.stringify(params));
      this.api.productUpdate(data,this.formData._id)
      // console.log(this.formData._id,"HD");
      .subscribe((res:any) =>{
        if (res.status == 200 && res.data) {
          this.dialogResult = res.data;

        }
        localStorage.setItem('seller',JSON.stringify(res))
        this.router.navigate(['seller-home'])
      })
  }
  ngOnInit(): void {
    if (this.showAdd = true) {
      let _id = this.route.snapshot.paramMap.get('id')
      if(_id) {
        this.api.getProduct(_id).subscribe((data :any)=>{
          this.formData = data.data
          this.showAdd = false
        })
      }
    }
  }
}
