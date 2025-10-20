import { Component, inject, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDropdownModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BillTableComponent } from './bill-table/bill-table.component';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterModule,
    BillTableComponent,
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css',
})
export class BillComponent implements OnInit {
  @Input() id: any;
  loading: boolean = false;
  items: any = [
    {
      menu: [],
    },
  ];
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  item: any = [];
  cart: any = [];
  //id: string = '';
  totalAmount: number = 0;
  api: string = '';
  htmlBill: any = [];
  isChecked: boolean = false;
  paided: any = [];

  printNote: string = '';
  printNoteError: boolean = false;
  printLoading: boolean = false;

  totalItem: number = 0;
  bill: any = [];
  grandTotal: number = 0;
  data: any = [];
  closePaymentAmount: number = 1;
  unpaid: number = 0;
  activeModal = inject(NgbActiveModal);
  close: number = -1;
  cartCopyBill: any = [];
  isPrinting: boolean = false;
  printResp: string = '';
  groups: any = [];
  taxSc: any = [];
  subTotal: any = [];
  tableSendOrder: number = 0;
  env: any = environment;
  posMode: string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.posMode = this.configService.getConfigJson()['outlet']['posMode'];

    this.api = this.configService.getApiUrl();
    this.httpCart();
    this.httpCartBill();
    this.getCartCopyBill();
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
  httpCart() {
    this.loading = true;
    const url = this.api + 'payment/cart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.id,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          if (data['data']['cart'].length == 0) {
            alert('Items not found');
            this.activeModal.close();
            return;
          } else {
            this.close = data['cart']['close'];
            this.cart = data['cart'];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCartCopyBill() {
    const url = this.api + 'bill/getCartCopyBill';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.id,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.cartCopyBill = data['items'];
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
          totalGroup: this.groups.length,
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

  payment() {
    this.loading = true;
    const body = {
      id: this.id,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'payment/submit', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          console.log(data);
          //history.back();
          //  setTimeout(() => {
          this.router.navigate(['payment'], { queryParams: { id: this.id } });
          // }, 500);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fnPrint() {
    this.printResp = '';
    this.isPrinting = true;
    let htmlBill = this.htmlBill;

    // this.htmlBill.forEach((element: any) => {
    //   htmlBill += element;
    // });
    const config = this.configService.getConfigJson();
    const body = {
      message: htmlBill,
      printer: config.printer,
    };
    this.printNoteError = false;
    this.printNote = '';
    this.printLoading = true;
    console.log(body);
    this.printNote = 'Printing, please wait...';

    let printerType: string = 'ip';
    if (printerType === 'usb') {
      this.usbPrinter();
    } else {
      this.http
        .post(this.api + 'printing/print', body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.printNote = 'Print Success';
            this.printLoading = false;
          },
          (error) => {
            this.printNoteError = true;
            this.printLoading = false;
            console.log(error);
            this.printNote = 'ERROR ' + error.error.detail;
          }
        );
    }
  }

  usbPrinter() {
    console.log('usbPrinter');
    this.printResp = '';
    this.isPrinting = true;
    let htmlBill = this.htmlBill;

    const body = {
      message: htmlBill[0].html,
      printer: 'TP805L',
    };
    this.printNoteError = false;
    this.printNote = '';
    this.printLoading = true;
    console.log(body);
    this.printNote = 'Printing, please wait...';

    this.http
      .post('http://localhost/app/printing/RestPrinter.php', body)
      .subscribe(
        (data) => {
          console.log(data);
          this.printNote = 'Print Success';
          this.printLoading = false;
        },
        (error) => {
          this.printNoteError = true;
          this.printLoading = false;
          console.log(error);
          this.printNote = 'ERROR ' + error.error.detail;
        }
      );
  }

  printBill() {
    const body = {
      id: this.id,
      htmlBill: this.htmlBill,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'bill/billUpdate', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          if (data['tableSendOrder'] == 0) {
            this.tableSendOrder = data['tableSendOrder'];
            this.createPayment();
          } else {
            this.reSendOrder();
          }

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createTxtBill() {
    const body = {
      cartId: this.id,
      htmlBill: this.htmlBill, 
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'bill/createTxtBill', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reSendOrder() {
    this.loading = true;
    const body = {
      cartId: this.id,
      tableSendOrder: 1,
    };

    const url = this.api + 'menuItemPos/sendOrder';
    this.http
      .post<any>(url, body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.reload();
          this.fnPrint();
          this.createTxtBill();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createPayment() {
    // 3 process become 1 function
    // sendOrder()
    // PrintQueue()
    // Go To Payment()

    const body = {
      id: this.id,
      terminalId: this.terminalId,
    };
    this.http
      .post<any>(this.api + 'bill/createPayment', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.router.navigate([], {
            queryParams: {
              id: data['id'],
            },
            queryParamsHandling: 'merge', // Merge with existing query params
            replaceUrl: true, // Replace the current history entry
          });
          this.id = data['id'];
          this.fnPrint();
          this.reload();
          this.createTxtBill();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  printCopyBill() {
    const body = {
      id: this.id,
    };
    this.http
      .post<any>(this.api + 'bill/copyBill', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.getCartCopyBill();
          this.fnPrint();
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  splitBill(subgroup: number) {
    console.log(subgroup);
    this.router
      .navigate(['bill/splitBill'], {
        queryParams: { id: this.id, subgroup: subgroup },
      })
      .then(() => {
        this.activeModal.dismiss();
      });
  }
}
