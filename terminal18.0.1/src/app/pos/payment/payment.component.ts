import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit, 
  ViewChild,
} from '@angular/core';
import { ConfigService } from '../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { BillTableComponent } from '../bill/bill-table/bill-table.component';
import { KeyNumberComponent } from '../../keypad/key-number/key-number.component'; 
import { UserLoggerService } from '../../service/user-logger.service';
import { SocketService } from '../../service/socket.service';
export class Actor {
  constructor(public newQty: number) {}
}
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterModule,
    NgxCurrencyDirective,
    BillTableComponent,
    KeyNumberComponent, 
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('myModal', { static: true }) myModal: any;
  loading: boolean = false;
  items: any = [
    {
      menu: [],
    },
  ];
  item: any = [];
  paymentType: any = [];
  cart: any = [];
  id: string = '';
  totalAmount: number = 0;
  totalItem: number = 0;
  api: string = '';
  htmlBill: any = '';
  isChecked: boolean = false;
  paid: any = [];
  paided: any = [];
  data: any = [];
  bill: any = [];
  grandTotal: number = 0;
  closePaymentAmount: number = 1;
  unpaid: number = 0;

  paymentIndex: number = -1;
  inputField: string = '';
  discountGroup: any = [];
  paymentGroups: any = [];
  cssClass: string = 'btn btn-sm p-3 bg-warning me-2 mb-2 rounded shadow-sm';
  cssMenu: string = 'btn btn-sm py-3 bg-white me-1 lh-1  rounded shadow-sm';
  paymentGroup: any = {};
  paymentypes: any = [];
  showApplyDiscount: boolean = false;
  groups: any = [];
  screenWidth: number = window.innerWidth;
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  showPrintBill: boolean = false;
  checkCashType: any = [];
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    config: NgbModalConfig,
    private socketService: SocketService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  ngOnDestroy(): void {}
  ngAfterViewInit(): void {
    console.log('test');
    try {
      this.myDiv.nativeElement.scrollTop =
        this.myDiv.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  sendMessage() {
    console.log('MENU EMIT : sendMessage');
    const data = {
      terminalId: this.terminalId,
      id: this.id,
      tableId: this.cart.outletTableMapId,
    };
    this.socketService.emit('message-from-client', data);
  }

  ngOnInit() {
    this.api = this.configService.getApiUrl();

    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.modalService.dismissAll();
    this.httpCart();
    this.httpCartBill();
    
    this.httpPaymentType();
    this.httpCastType();
  }
  back() {
    history.back();
  }

  httpCastType() {
    //http://localhost:3000/terminal/daily/checkCashType
    this.http
      .get<any>(this.api + 'daily/checkCashType', {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.checkCashType = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }
  selectCashType(x: any) {
     if (this.inputField == 'paid') {
      this.paid[this.paymentIndex].paid = parseInt(x.value) + parseInt(this.paid[this.paymentIndex].paid);
    } else if (this.inputField == 'tips') {
      this.paid[this.paymentIndex].tips = parseInt(x.value) + parseInt(this.paid[this.paymentIndex].tips);
    }
  }

  httpPaid() {
    this.loading = true;
    const url = this.api + 'payment/paid';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.activeRouter.snapshot.queryParams['id'],
          grandTotal: this.grandTotal,
        },
      })
      .subscribe(
        (data) => {
          this.paid = data['items'];
          console.log('httpPaid', data);

          if (data['closePayment'] == 1) {
            this.openModal();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpCart() {
    this.loading = true;
    const url = this.api + 'payment/cart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.activeRouter.snapshot.queryParams['id'],
          dailyCheckId: this.configService.getDailyCheck() ?? '',
          isGrouping : 0,
        },
      })
      .subscribe(
        (data) => { 
          this.data = data['data'];
          this.discountGroup = data['data']['discountGroup'];
          this.closePaymentAmount = data['data']['closePaymentAmount'];
          this.unpaid = data['data']['unpaid'];
          this.grandTotal = data['data']['grandTotal'];
          this.httpPaid();

          this.sendMessage();
        //  this.callWithDelay();
        },
        (error) => {
          console.log(error);
        }
      );
  } 


  
  httpCartBill() {
    this.loading = true;
    const url = this.api + 'payment/bill';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.activeRouter.snapshot.queryParams['id'], 
        },
      })
      .subscribe(
        (data) => {
          console.log('httpCartBill', data);
          this.htmlBill = data['htmlBill'];
          this.groups = data['groups'];
          this.loading = false;  
        },
        (error) => {
          console.log(error);
        }
      );
  }
  renderBill(data: any) {

  }

  
    

  // async callWithDelay() {
  //   for (const el of this.groups) {
  //     await this.httpBill(el.subgroup); // kalau httpBill async
  //     await this.delay(100); // delay 1 detik
  //   }
  // }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  httpPaymentType() {
    this.loading = true;
    const url = this.api + 'payment/paymentGroup';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.paymentGroups = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpBill(subgroup: number) {
    this.loading = true;
    const url = this.api + 'bill/printing';
    this.http
      .get(url, {
        responseType: 'text' as const,
        params: {
          id: this.id,
          subgroup: subgroup,
            totalGroup : this.groups.length
        },
      })
      .subscribe(
        (data: string) => {
          console.log('httpBill', data);
          this.loading = false;
          const items = {
            subgroup: subgroup,
            html: data,
          };
          this.htmlBill.push(items);
          // this.htmlBill = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  reload() {
    this.httpCart();
  }

  addPayment(payment: any) {
    this.loading = true;
    const body = {
      cartId: this.id,
      payment: payment,
      unpaid: this.unpaid,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'payment/addPayment', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          console.log(data);
          this.httpCart();
          this.logService.logAction(
            'Add Payment ' + body['payment']['name'],
            this.id
          );
        },
        (error) => {
          console.log(error);
          this.logService.logAction(
            'ERROR Add Payment ' + body['payment']['name'],
            this.id
          );
        }
      );
  }

  deletePaid(x: any) {
    let allowDelete = true;
    if (x.submit == 1) {
      if (confirm('DELETE THIS PAYMENT?')) {
        allowDelete = true;
      } else {
        allowDelete = false;
      }
    }

    if (allowDelete == true) {
      this.loading = true;
      const body = {
        cartId: this.id,
        paid: x,
      };
      console.log(body);
      this.http
        .post<any>(this.api + 'payment/deletePayment', body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.httpPaid();
            this.httpCartBill()
            this.httpCart();
            this.logService.logAction(
              'Delete Paid ' + body.paid.name + ' @' + body.paid.paid,
              this.id
            );
          },
          (error) => {
            console.log(error);
            this.logService.logAction(
              'ERROR Delete Paid ' + body.paid.name + ' @' + body.paid.paid,
              this.id
            );
          }
        );
    }
  }

  addPaid() {
    this.loading = true;
    const body = {
      cartId: this.id,
      paid: this.paid,
      totalAmount: this.grandTotal,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'payment/addPaid', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.paymentIndex = 0;
          this.inputField = '';
          console.log(data);
          this.httpCart();
          this.httpPaid();
          this.httpCartBill();
          this.logService.logAction('Submit Payment', this.id);
        },
        (error) => {
          console.log(error);
          this.logService.logAction('ERROR Submit Payment', this.id);
        }
      );
  }

  openModal() {
    this.modalService.open(this.myModal).result.then(
      (result) => {
        console.log('result');
        this.logService.logAction('CLOSE PAYMENT', this.id);
        this.router.navigate(['tables']);

        console.log('MENU EMIT : CLOSE PAYMENT');
        const data = {
          terminalId: this.terminalId,
          id: '',
          tableId: '',
        };
        this.socketService.emit('message-from-client', data);
      },
      (reason) => {
        console.log('reason');
        this.logService.logAction('CLOSED payment without action', this.id);
        this.router.navigate(['tables']);
        console.log('MENU EMIT : CLOSE PAYMENT');
        const data = {
          terminalId: this.terminalId,
          id: '',
          tableId: '',
        };
        this.socketService.emit('message-from-client', data);
      }
    );
  }

  updateRow(x: any) {
    console.log(x);
    const body = {
      item: x,
    };
    this.http
      .post<any>(this.api + 'payment/updateRow', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.logService.logAction('Update Paid value', this.id);
        },
        (error) => {
          console.log(error);
          this.logService.logAction('ERROR Update Paid value', this.id);
        }
      );
  }

  handleData(data: string) {
    let value = '';
    if (this.inputField == 'paid') {
      value = this.paid[this.paymentIndex].paid;
    } else if (this.inputField == 'tips') {
      value = this.paid[this.paymentIndex].tips;
    }

    value = value.toString();
    if (data == 'b') {
      value = value.slice(0, -1);
    } else {
      value = value + data;
    }

    if (this.inputField == 'paid') {
      this.paid[this.paymentIndex].paid = value;
    } else if (this.inputField == 'tips') {
      this.paid[this.paymentIndex].tips = value;
    }
  }

  paymentActive(index: number, inputField: string) {
    this.paymentIndex = index;
    this.inputField = inputField;
    console.log(index, inputField);
  }

  clearCurrentValue() {
    if (this.inputField == 'paid') {
      this.paid[this.paymentIndex].paid = 0;
    } else if (this.inputField == 'tips') {
      this.paid[this.paymentIndex].tips = 0;
    }
  }

  open(content: any, paymentGroup: any) {
    this.paymentGroup = paymentGroup;
    this.modalService.open(content, { size: 'lg' });

    const url = this.api + 'payment/paymentType';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          paymentGroupId: paymentGroup.id,
        },
      })
      .subscribe(
        (data) => {
          this.paymentypes = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  tablePaymentActive(i: number, paid: any) {
    console.log(i, paid);
    if (paid.submit != 1) {
      this.paymentIndex = i;
      this.inputField = 'paid';
    }
  }
}
