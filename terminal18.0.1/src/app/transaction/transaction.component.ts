import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderMenuComponent } from "../header/header-menu/header-menu.component";
import { BillComponent } from '../pos/bill/bill.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
   imports: [HttpClientModule, CommonModule, FormsModule, NgbDropdownModule, RouterModule, HeaderMenuComponent, NgbDatepickerModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  loading: boolean = false;
  items: any = [{
    menu: []
  }];
  item: any = []; 
  outletSelect : any = [];
  outletId : number =0;
  id: string = ''; 
  api: string = '';  
   screenWidth: number = window.innerWidth;

   startDate : any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
   };
  endDate : any = {
   year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
   };

  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { 
     window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }


  ngOnInit() { 
     this.api = this.configService.getApiUrl();
    this.outletId = this.configService.getConfigJson()['outlet']['id'];
    this.modalService.dismissAll(); 
   // this.httpOutlet(); 
     this.httpGet(); 

  }
  httpOutlet() {
    this.loading = true;
    const url = this.api + "login/outlet";
    this.http.get<any>(url, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.outletSelect = data['outletSelect']; 
       
      },
      error => {
        console.log(error);
      }
    )
  }

  httpGet() {
    this.loading = true;
    const url = this.api + "transaction";
    this.http.get<any>(url, {
      headers: this.configService.headers(),
      params: {
       // outletId:  this.outletId,
         dailyCheckId: this.configService.getDailyCheck(),
          startDate: this.activeRouter.snapshot.queryParams['startDate'] || '',
          endDate: this.activeRouter.snapshot.queryParams['endDate'] || '',
      }
    }).subscribe(
      data => {
        this.loading = false;
        this.items = data['items']; 
      },
      error => {
        console.log(error);
      }
    )
  }

  goToDetail(x : any){
    this.router.navigate(['transaction/detail'], { queryParams : {id : x.id}})
  }

  fnVoid(id: string){
    this.router.navigate(['void'], { queryParams : {id : id, module:'transaction', action: 'voidPaid'}})
    // if(confirm("Are you sure to void this transaction?")){
    //   this.loading = true;
    //   const url = this.api + "transaction/void";
    //   this.http.post<any>(url, {
    //     id: id,
    //   }, {
    //     headers: this.configService.headers(),
    //   }).subscribe(
    //     data => {
    //       this.loading = false; 
    //       history.back();
           
    //     },
    //     error => {
    //       this.loading = false;
    //       console.log(error);
    //     }
    //   );
    // }
  }
  
  back(){
    history.back();
  }

  openComponent(id : string){ 
     this.router.navigate([], {
            queryParams: {
              id: id,
            },
            queryParamsHandling: 'merge', // Merge with existing query params
            replaceUrl: true, // Replace the current history entry
          });

    console.log(id);
      const modalRef = this.modalService.open(BillComponent, {size:'lg'});
      modalRef.componentInstance.id = id;
    }
 

    loadItems(){
      this.loading = true;
      const startDateStr = `${this.startDate.year}-${String(this.startDate.month).padStart(2, '0')}-${String(this.startDate.day).padStart(2, '0')}`;
      const endDateStr = `${this.endDate.year}-${String(this.endDate.month).padStart(2, '0')}-${String(this.endDate.day).padStart(2, '0')}`;
      console.log('Loading items from', startDateStr, 'to', endDateStr);
 
       this.router.navigate([], {
            queryParams: {
              startDate: startDateStr,
              endDate: endDateStr,
            },
            queryParamsHandling: 'merge', // Merge with existing query params
            replaceUrl: true, // Replace the current history entry
      });
      setTimeout(() => {
        this.httpGet();
      }, 200);
    }
}
