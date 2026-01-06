import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../service/language.service';
import { SocketService } from '../../service/socket.service';
import { UserLoggerService } from '../../service/user-logger.service';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-sales-summary-report',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, CommonModule],
  templateUrl: './sales-summary-report.component.html',
  styleUrl: './sales-summary-report.component.css'
})
export class SalesSummaryReportComponent  implements OnInit {
  startDate : any = [];
  endDate : any = [];
  loading: boolean = false;
  api: string = '';
  server: string = '';
  note : string = '';
  overall : any;
  salesByMode : any = [];
  salesByDepartment : any = []
  salesByPeriod : any = [];
  paymentAndTipsDetails : any = [];
  paymentAndTipsSummary : any;
  voidItemSummary: any = [];
  voidPaymentSummary: any = [];
  unpaid: any = [];
  taxSummary: any = null;
  constructor(
    private activeRouter: ActivatedRoute, 
    private socketService: SocketService,
    private languageService: LanguageService,
    private userLoggerService: UserLoggerService,
    private http: HttpClient,
    private configService: ConfigService
  ) { }
  ngOnInit(): void {
    console.log(this.activeRouter.snapshot.queryParams['date']);
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();

  }

  onSubmit(){
    this.loading = true;
    const startDate = `${this.startDate.year}-${String(this.startDate.month).padStart(2,'0')}-${String(this.startDate.day).padStart(2,'0')}`;
    const endDate = `${this.endDate.year}-${String(this.endDate.month).padStart(2,'0')}-${String(this.endDate.day).padStart(2,'0')}`;

    this.http.get(this.api+`reports/salesSummaryReport`,{
      headers: this.configService.headers(),
      params: {
        startDate: startDate,
        endDate: endDate
      } 
    }).subscribe({
      next: (data:any) => {
        console.log(data);
        this.overall = data.overall;
        this.salesByMode = data.salesByMode;
        this.salesByDepartment = data.salesByDepartment;
        this.salesByPeriod = data.salesByPeriod;
        this.paymentAndTipsDetails = data.paymentAndTipsSummary?.details || [];
        this.paymentAndTipsSummary = data.paymentAndTipsSummary || null;
        this.voidItemSummary = data.voidItemSummary || [];
        this.voidPaymentSummary = data.voidPaymentSummary || [];
        this.unpaid = data.unpaid || [];
        this.taxSummary = data.taxSummary || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loading = false;
        this.note = error.message;
      }
    });
  }

}
