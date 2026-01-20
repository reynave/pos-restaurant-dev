import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbModal,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../service/user-logger.service';
import { SocketService } from '../service/socket.service';
import { LanguageService } from '../service/language.service';
import { HeaderMenuComponent } from '../header/header-menu/header-menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    HttpClientModule,
    NgbDatepickerModule,
    FormsModule,
    CommonModule,
    RouterModule,
    HeaderMenuComponent,
  ],
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
  getReport: any = '';
  reportsMenu: any[] = [];

  selectedReport: any = null;
  sampleRows: any[] = [];

  today: any = new Date();
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
  titleReport: string = '';
  outlets: any = [];
  outletId: string = '';
  users: any = [];
  usersId: string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    public modalService: NgbModal,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    private socketService: SocketService,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.api = this.configService.getApiUrl();

    this.httpGet();
    this.httpGetUsers();
    this.httpGetOtlets();
  }

  httpGet() {
    this.http
      .get(this.api + `menuReports/selectReports`, {
        headers: this.configService.headers(),
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.reportsMenu = data.data || [];
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  httpGetUsers() {
    this.http
      .get(this.api + `menuReports/getUsers`, {
        headers: this.configService.headers(),
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.users = data.users || [];
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  httpGetOtlets() {
    this.http
      .get(this.api + `reports/getOutlets`, {
        headers: this.configService.headers(),
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.outlets = data.outlets || [];
        },
      });
  }

  goTo(a: any) {
    this.titleReport = a.title;

    console.log('navigating to', a.router);
    this.router.navigate(['reports'], {
      queryParams: {
        category: a.router,
      },
      queryParamsHandling: 'merge', // Merge with existing query params
      replaceUrl: true, // Replace the current history entry
    });
    this.getReport = a;
  }

  ngOnDestroy(): void {}
  sendMessage() {
    console.log('HEADER EMIT');
    this.socketService.emit('message-from-client', 'reload');
  }
  back() {
    history.back();
  }

  postRequestToken() {
    return this.http.post(
      this.api + `menuReports/createReportToken`,
      {
        createdName: this.configService.getTokenJson()['name'] || 'System',
        inputBy: this.configService.getTokenJson()['id'] || 0,
      },
      {
        headers: this.configService.headers(),
      },
    );
  }

  externalTab() {
    this.postRequestToken().subscribe({
      next: (data: any) => {
        console.log(data);

        const startDate = `${this.startDate.year}-${String(this.startDate.month).padStart(2, '0')}-${String(this.startDate.day).padStart(2, '0')}`;
        const endDate = `${this.endDate.year}-${String(this.endDate.month).padStart(2, '0')}-${String(this.endDate.day).padStart(2, '0')}`;

        const getRouter = this.getReport.router || '';

        let url =
          this.api +
          `reports/${getRouter}?startDate=${startDate}&endDate=${endDate}&view=printable&outletId=${this.outletId}&userId=${this.usersId}`;
        url += `&t=${data.token || ''}`;
        const params =
          'width=800,height=600,left=100,top=50,resizable=yes,scrollbars=yes';

        const baseUrl =
          window.location.origin +
          window.location.pathname.replace(/\/[^\/]*$/, '/');
        window.open(`${url}`, '_blank', params);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
