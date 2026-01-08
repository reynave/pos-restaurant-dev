import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../service/user-logger.service'; 
import { SocketService } from '../service/socket.service';
import { LanguageService } from '../service/language.service';
import { HeaderMenuComponent } from '../header/header-menu/header-menu.component';
import { SalesSummaryReportComponent } from "./sales-summary-report/sales-summary-report.component";
import { CashierReportPosPrinterPaperComponent } from "./cashier-report-pos-printer-paper/cashier-report-pos-printer-paper.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, HeaderMenuComponent, SalesSummaryReportComponent, CashierReportPosPrinterPaperComponent],
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
      title: 'Cashier Report',
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
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public offcanvasService: NgbOffcanvas,
    private router: Router,
    public modalService: NgbModal,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    private socketService: SocketService,
    public lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.getReport = this.activeRouter.snapshot.url[1]?.path || "";
    console.log('this.getReport', this.getReport);
  }

  goTo(cat: any) {
    console.log('navigating to', cat);
    this.router.navigate(['reports', cat], {
      queryParams: {
        //id: data['id'],
      },
      queryParamsHandling: 'merge', // Merge with existing query params
      replaceUrl: true, // Replace the current history entry
    });
    this.getReport = cat;
  }
  selectReport(cat: any, sub: any) {
    this.selectedReport = { ...sub, category: cat.id };
    // populate sampleRows with small mock data for UI preview
    this.sampleRows = [
      {
        field: 'Total',
        value: 'Rp 1.250.000',
        notes: this.selectedReport.title,
      },
      { field: 'Transactions', value: '45', notes: 'Count' },
      { field: 'Top Item', value: 'Nasi Goreng', notes: 'Qty 12' },
    ];
  }

  ngOnDestroy(): void {}
  sendMessage() {
    console.log('HEADER EMIT');
    this.socketService.emit('message-from-client', 'reload');
  }
  back() {
    history.back();
  }

  openInNewTab(route: string) {
    const params =
      'width=800,height=600,left=100,top=50,resizable=yes,scrollbars=yes';

    const baseUrl =
      window.location.origin +
      window.location.pathname.replace(/\/[^\/]*$/, '/');
    window.open(`${baseUrl}#${route}`, '_blank', params);
  }
}
