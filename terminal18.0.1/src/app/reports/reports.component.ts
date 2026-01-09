import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../service/user-logger.service'; 
import { SocketService } from '../service/socket.service';
import { LanguageService } from '../service/language.service';
import { HeaderMenuComponent } from '../header/header-menu/header-menu.component'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [HttpClientModule, NgbDatepickerModule, FormsModule, CommonModule, RouterModule, HeaderMenuComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit, OnDestroy {
  dataHeader: any = {};
  loading: boolean = false;
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  currentTime: Date = new Date();
  private intervalId: any;
  getTokenJson: any = [];
  ver: string = environment.ver;
  path: any = '';
  api: string = '';
  // Menu definition for reports and sub-reports
  getReport : any = "";
  reportsMenu: any[] = [
    {
      id: '1',
      title: '1. Sales Summary Report',
      show: false,
      router: 'salesSummaryReport',
    },

    {
      id: '2',
      title: '2. Cashier Report',
      show: false,
      items: [
        {
          id: '21',
          title: 'POS Printer Paper',
          description: 'POS Printer Paper',
          router: 'cashierReportPosPrinterPaper',
        },
        {
          id: '22',
          title: 'Desktop Printer Paper',
          description: 'Desktop Printer Paper',
          router: 'desktopPrinterPaper',
        },
      ],
    },
     {
      id: '3',
      title: '3. Itemized Sales Report',
      show: false,
      items: [
        {
          id: '31',
          title: 'Itemized Sales Detail',
          router: 'itemizedSalesDetail',
        },
        {
          id: '32',
          title: 'Itemized Sales Summary',
          router: 'itemizedSalesSummary',
        },
      ],
    },
    {
      id: 'operational',
      title: 'Operational',
      show: false,
      items: [
        {
          id: 'open-tables',
          title: 'Open Tables',
          description: 'Meja yang masih terbuka',
          route: 'reports/operational/open-tables',
        },
        {
          id: 'staff',
          title: 'Staff Activity',
          description: 'Aktivitas staff',
          route: 'reports/operational/staff',
        },
      ],
    },
  ];

  selectedReport: any = null;
  sampleRows: any[] = [];

  today : any = new Date();
  startDate: any = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(), 
  };
  endDate: any = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(),
  }; 
titleReport : string = '';
outlets : any = [];
users : any = [];
  constructor(
    public configService: ConfigService,
    private http: HttpClient, 
    private router: Router,
    public modalService: NgbModal,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    private socketService: SocketService,
    public lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.getReport = this.activeRouter.snapshot.queryParams['category'] || '';
    this.titleReport= this.activeRouter.snapshot.queryParams['titleReport'] || '';
  }
    httpGetUsers(){
    this.http.get(this.api+`reports/getUsers`,{
      headers: this.configService.headers()
    }).subscribe({
      next: (data:any) => {
        console.log(data);
        this.users = data.users || [];
      },
      error: (error) => {
        console.error('There was an error!', error);
     
      }
    });
  }

  httpGetOtlets(){
    this.http.get(this.api+`reports/getOutlets`,{
      headers: this.configService.headers()
    }).subscribe({
      next: (data:any) => {
        console.log(data);
        this.outlets = data.outlets || [];
      }
    });
  }


  goTo(cat: any, titleReport?: any) {
    this.titleReport = titleReport; 
    console.log('navigating to', cat);
    this.router.navigate(['reports'], {
      queryParams: {
        category: cat,
        titleReport : titleReport
      },
      queryParamsHandling: 'merge', // Merge with existing query params
      replaceUrl: true, // Replace the current history entry
    });
    this.getReport = cat;
  }
  

  ngOnDestroy(): void {}
  sendMessage() {
    console.log('HEADER EMIT');
    this.socketService.emit('message-from-client', 'reload');
  }
  back() {
    history.back();
  }

  openInNewTab() {

    const startDate = `${this.startDate.year}-${String(this.startDate.month).padStart(2,'0')}-${String(this.startDate.day).padStart(2,'0')}`;
    const endDate = `${this.endDate.year}-${String(this.endDate.month).padStart(2,'0')}-${String(this.endDate.day).padStart(2,'0')}`;


    let url = 'reports/'+this.getReport + `?startDate=${startDate}&endDate=${endDate}`;
    const params =
      'width=800,height=600,left=100,top=50,resizable=yes,scrollbars=yes';

    const baseUrl =
      window.location.origin +
      window.location.pathname.replace(/\/[^\/]*$/, '/');
    window.open(`${baseUrl}#${url}`, '_blank', params);
  }
}
