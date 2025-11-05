import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
export class Actor {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public earningStartDate: any,
    public earningEndDate: any,

    public redeemStartDate: any,
    public redeemEndDate: any,
    public status: number,
    public x1: number,
    public x2: number,
  ) {}
}
@Component({
  selector: 'app-cashback-detail',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    RouterModule,
    NgxCurrencyDirective
  ],
  templateUrl: './cashback-detail.component.html',
  styleUrl: './cashback-detail.component.css',
})
export class CashbackDetailComponent implements OnInit {
  loading: boolean = false;
  checkboxAll: number = 0;
  disabled: boolean = true;
  items: any = [];
  outletSelect: any = [];
  api: string = environment.api;
  id: string = '';
  model = new Actor('', '', '', '', '', '', '', 1,0,0);
  cashbackAmounts: any = [];
  paymentMethods: any;
  selectPaymentMethods : any = [];
  outlets: any;
   payment : any;
  optCurrencyMask = { prefix: '', thousands: '.', decimal: ',', precision : 0, allowNegative: false, align: 'right' };
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id') || '';
    if (this.id) {
      this.getDetail();
      this.httpGetPaymentMethods();
      this.httpAmount();
    }
  }
  httpGetPaymentMethods() {
    this.http
      .get<any>(this.api + 'cashback/selectPaymentMethod', {
        headers: this.configService.headers(),
        params: { id: this.id },
      })
      .subscribe(
        (data) => {
          this.selectPaymentMethods = data.items;
        
          
        },
        (error) => {
          console.error('Error fetching payment methods:', error);
        }
      );
  }

  getDetail() {
    this.loading = true;
    this.http
      .get<any>(this.api + 'cashback/detail/', {
        headers: this.configService.headers(),
        params: { id: this.id },
      })
      .subscribe(
        (data) => {
          this.model = data.items;
          // tolong bukain format string date yyyy-mm-dd ke array date { year: yyyy, month: mm, day: dd }
          this.model.earningStartDate = this.model.earningStartDate
            ? {
                year: new Date(this.model.earningStartDate).getFullYear(),
                month: new Date(this.model.earningStartDate).getMonth() + 1,
                day: new Date(this.model.earningStartDate).getDate(),
              }
            : {};
          this.model.earningEndDate = this.model.earningEndDate
            ? {
                year: new Date(this.model.earningEndDate).getFullYear(),
                month: new Date(this.model.earningEndDate).getMonth() + 1,
                day: new Date(this.model.earningEndDate).getDate(),
              }
            : {};
          this.model.redeemStartDate = this.model.redeemStartDate
            ? {
                year: new Date(this.model.redeemStartDate).getFullYear(),
                month: new Date(this.model.redeemStartDate).getMonth() + 1,
                day: new Date(this.model.redeemStartDate).getDate(),
              }
            : {};
          this.model.redeemEndDate = this.model.redeemEndDate
            ? {
                year: new Date(this.model.redeemEndDate).getFullYear(),
                month: new Date(this.model.redeemEndDate).getMonth() + 1,
                day: new Date(this.model.redeemEndDate).getDate(),
              }
            : {};

          this.loading = false;
          this.payment = data.payment;
        },
        (error) => {
          this.loading = false;
          console.error('Error fetching cashback detail:', error);
        }
      );
  }

  httpAmount() {
    this.http
      .get<any>(this.api + 'cashback/amount/', {
        headers: this.configService.headers(),
        params: { id: this.id },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.cashbackAmounts = data.items;
        },
        (error) => {
          console.error('Error fetching cashback amounts:', error);
        }
      );
  }

  addAmount() {
    const body = {
      id: this.id,
    };
    this.http
      .post<any>(this.api + 'cashback/addAmount/', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.httpAmount();
        },
        (error) => {
          console.error('Error adding cashback amount:', error);
        }
      );
  }

  onSubmit() {
    console.log(this.model);

    // tolong ubah format array date { year: yyyy, month: mm, day: dd } ke string date yyyy-mm-dd
    let earningStartDate = this.model.earningStartDate
      ? `${this.model.earningStartDate.year}-${String(
          this.model.earningStartDate.month
        ).padStart(2, '0')}-${String(this.model.earningStartDate.day).padStart(
          2,
          '0'
        )}`
      : null;
    let earningEndDate = this.model.earningEndDate
      ? `${this.model.earningEndDate.year}-${String(
          this.model.earningEndDate.month
        ).padStart(2, '0')}-${String(this.model.earningEndDate.day).padStart(
          2,
          '0'
        )}`
      : null;
    let redeemStartDate = this.model.redeemStartDate
      ? `${this.model.redeemStartDate.year}-${String(
          this.model.redeemStartDate.month
        ).padStart(2, '0')}-${String(this.model.redeemStartDate.day).padStart(
          2,
          '0'
        )}`
      : null;
    let redeemEndDate = this.model.redeemEndDate
      ? `${this.model.redeemEndDate.year}-${String(
          this.model.redeemEndDate.month
        ).padStart(2, '0')}-${String(this.model.redeemEndDate.day).padStart(
          2,
          '0'
        )}`
      : null;
    this.loading = true;
    const body = {
      id: this.id,
      model: this.model,
      date: {
        earningStartDate: earningStartDate,
        earningEndDate: earningEndDate,
        redeemStartDate: redeemStartDate,
        redeemEndDate: redeemEndDate,
      },
    };
    this.http.post<any>(this.api + 'cashback/updateDetail/', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.loading = false;
          console.log('Cashback updated successfully:', data);
        },
        (error) => {
          this.loading = false;
          console.error('Error updating cashback:', error);
        }
      );
  }

  updateAmount() {
    const body = {
      id: this.id,
      amounts: this.cashbackAmounts,
    };
    this.http
      .post<any>(this.api + 'cashback/updateAmount/', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log('Cashback amounts updated successfully:', data);
        },
        (error) => {
          console.error('Error updating cashback amounts:', error);
        }
      );  
  }

   deleteAmount() {
    const body = {
      id: this.id,
      amounts: this.cashbackAmounts,
    };
    this.http
      .post<any>(this.api + 'cashback/deleteAmount/', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.httpAmount();
          console.log('Cashback amounts deleted successfully:', data);
        },
        (error) => {
          console.error('Error deleting cashback amounts:', error);
        }
      );  
  }

  updatePaymentLink(){

    const selectPaymentMethods = this.selectPaymentMethods;
    let model = [];

    for(let i = 0; i < selectPaymentMethods.length; i++){
        for(let j = 0; j < selectPaymentMethods[i].linkToPayment.length; j++){
            if(selectPaymentMethods[i].linkToPayment[j].checkbox == 1){
                let temp = {
                    cashbackId : this.id,
                    paymentId : selectPaymentMethods[i].linkToPayment[j].id 
                }
                model.push(temp);
            }
        }
    }

    const body = {
      id: this.id,
      paymentMethods: model, 
    };
 

    console.log(body);
    this.http
      .post<any>(this.api + 'cashback/updatePaymentLink/', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log('Cashback payment methods updated successfully:', data);
          this.getDetail();
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error updating cashback payment methods:', error);
        }
      );
  }
  open(content: any) { 
    this.modalService.open(content, {size: 'lg'}); 
  } 
}
