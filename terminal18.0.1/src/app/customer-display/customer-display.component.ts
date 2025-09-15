import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BillTableComponent } from '../pos/bill/bill-table/bill-table.component';
import { SocketService } from '../service/socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-display',
  standalone: true,
  imports: [CommonModule, BillTableComponent],
  templateUrl: './customer-display.component.html',
  styleUrl: './customer-display.component.css',
})
export class CustomerDisplayComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('myDiv') myDiv!: ElementRef;
  item: any = [];
  terminalId: string = '';
  api: string = '';
  id: string = '';
  cart: any = {
    inputDate:'2023-06-20T14:23:45.000Z',
  };
  data: any = {};
  showModifier: boolean = true;
  loading: boolean = false;
  display : string = 'idle';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private socketService: SocketService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.terminalId = localStorage.getItem('pos3.terminal.mitralink') ?? '';
    this.api = this.configService.getApiUrl();
    this.id = this.activeRoute.snapshot.queryParamMap.get('id') ?? '';
    this.httpCart();
    this.socketService.listen<any>('message-from-server').subscribe((msg) => {
      if (msg.terminalId == this.terminalId) {
        this.router.navigate([], {
          queryParams: {
            id: msg.id,
          },
          queryParamsHandling: 'merge', // Merge with existing query params
          replaceUrl: true, // Replace the current history entry
        });
        this.id = msg.id;
        if(this.id == null || this.id == ''){
          this.display = 'idle';
        }else{
          this.display = 'cart';
        }
        this.httpCart();
      }
    });
  }

  httpCart() {
    this.loading = true;
    const url = this.api + 'payment/cart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.id ?? '',
          dailyCheckId: this.configService.getDailyCheck() ?? '',
        },
      })
      .subscribe(
        (data) => {
          this.cart = data['cart'];
          this.loading = false;
          this.data = data['data'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngAfterViewInit(): void {
    console.log('test');
    try {
      this.myDiv.nativeElement.scrollTop = this.myDiv.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
  ngOnDestroy(): void {}
}
