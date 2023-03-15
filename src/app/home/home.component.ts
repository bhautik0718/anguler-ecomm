import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { environment } from "../../environments/environment";
import { Subscription, Subject } from 'rxjs';
// import { query } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  base_url = environment.url;
  constructor(private api:ProductService){}
  table_data:any=[]
  showAdd !: boolean
  showUpdate !: boolean
  public filters:any = {selectedDesignationName: ""};
  public paginationValues: Subject<any> = new Subject();
  public recordLimit: number = 10;

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });

  }
  getSlidersWithFilters(event, bodyParams?) {
    return new Promise((resolve, reject) => {
      let params = {
        page: event.page || 1,
        limit: event.limit ? event.limit : this.recordLimit,
        searchText: event.searchText || '',
      };

      this.recordLimit = params.limit;
      this.api
        .getAllSearchProduct(params, bodyParams)
        .subscribe(
          { next:
            (res: any) => {

              if (res.status == 200 && res.data) {
                this.table_data = [];
                this.table_data = JSON.parse(JSON.stringify(res.data.data));

                this.paginationValues.next({
                  type: 'page-init',
                  page: params.page,
                  totalTableRecords: res.data.total_record_count,
                });
              }
      // console.log(res.data.data);
      this.table_data=res.data.data

              return resolve(true);
            },
            error:(error) => {
              return resolve(false);
            }
          }
        );
    });
  }
  searchConcession() {
    let data = {
      searchText: this.filters.selectedConcessionName,
    };
    this.getSlidersWithFilters(data);
  }
  resetConcession() {
    this.filters.selectedConcessionName = '';
    this.getSlidersWithFilters({ page: 1 });
  }
}
