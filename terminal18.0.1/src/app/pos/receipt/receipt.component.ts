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
import { KeyNumberComponent } from '../../keypad/key-number/key-number.component';
import { UserLoggerService } from '../../service/user-logger.service';
import { SocketService } from '../../service/socket.service';
import { LanguageService } from '../../service/language.service';
@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterModule,
    NgxCurrencyDirective,
    KeyNumberComponent,
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('myDiv') myDiv!: ElementRef;
  screenWidth: number = window.innerWidth;
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  loading: boolean = false;

  api: string = '';
  id: string = '';
  htmlBill: any = '';
  htmlReceipt: any = '';
  selectHtml: string = 'receipt';
  dailyCheckId: string = '';
  
  printBill = 1;
  alertColor = 'alert-danger';
  note = '';
  isReturn : string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    config: NgbModalConfig,
    private socketService: SocketService,
    public lang: LanguageService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }
  voidBtn : boolean = false;
  ngOnInit() {
    this.isReturn = this.activeRouter.snapshot.queryParams['return'] || '';
    localStorage.removeItem('pos3.id');
    this.dailyCheckId = localStorage.getItem('pos3.dailyCheck.mitralink') || '';
    this.api = this.configService.getApiUrl();
    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.modalService.dismissAll();
    this.httpBill();
    this.httpReceipt();
  }

  httpBill() {
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
          this.htmlBill = data['htmlBill'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpReceipt() {
    this.loading = true;
    const url = this.api + 'receipt';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.activeRouter.snapshot.queryParams['id'],
        },
      })
      .subscribe(
        (data) => {
          this.htmlReceipt = data['htmlBill'];
         // console.log("data['cart']['dailyCheckId'] : ",data['cart']['dailyCheckId'], "this.dailyCheckId : "+this.dailyCheckId);
          if(data['cart']['dailyCheckId'] == this.dailyCheckId){
            this.voidBtn = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fnPrint() {
    this.printBill = 0;
    this.note = 'Printing bill, Please wait...';
    console.log('print bill utama');
    this.configService.getConfigJson();
    const body = {
      message: this.selectHtml === 'bill' ? this.htmlBill : this.htmlReceipt,
      printer: {
        address: this.configService.getConfigJson()['printer']['address'],
        port: this.configService.getConfigJson()['printer']['port'],
      },
    };
    this.http
      .post<any>(this.api + 'printing/print', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.printBill = 1;
          this.note = 'Printing completed.';
          console.log('Print Bill', data);
          this.http
            .post<any>(
              this.api + 'payment/markPrintBill',
              { id: this.id },
              { headers: this.configService.headers() }
            )
            .subscribe(
              (data) => {
                console.log('Mark Print Bill', data);
                this.httpReceipt();
              },
              (error) => {
                console.log('Mark Print Bill Error', error);
              }
            );

    
        },
        (error) => {
          this.printBill = 1;
          console.log('Print Bill Error', error);
          this.alertColor = 'alert-danger';
          this.note = error.error['detail'] || 'ERROR printing';
        }
      );
  }

  ngOnDestroy(): void {}
  ngAfterViewInit(): void { 
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
    };
    this.socketService.emit('message-from-client', data);
  }
  back() {
    //  history.back();
    if(this.isReturn == 'transaction'){
       history.back();
    }else{
      this.router.navigate(['tables']);
    }
  
  }
}
