import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../service/user-logger.service';
import { DailyCloseComponent } from '../pos/daily/daily-close/daily-close.component';
import { SocketService } from '../service/socket.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  dataHeader: any = {};
  loading: boolean = false;
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  currentTime: Date = new Date();
  private intervalId: any;
  getTokenJson: any = [];
  ver: string = environment.ver;
  path: any = '';
  api: string = '';
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
    this.httpHeader();
    this.getTokenJson = this.configService.getTokenJson();
    this.path = this.activeRouter.snapshot.routeConfig?.path;
    console.log('PATH', this.path);
     if(this.path == 'bill/splitBill' ){
        localStorage.setItem('pos3.modal.bill', '1'); 
    }
  }

  

  openEnd(content: any) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  ngOnDestroy(): void {}
  sendMessage() {
    console.log('HEADER EMIT');
    this.socketService.emit('message-from-client', 'reload');
  }
  back() {
   
    history.back();
   
  }
  signOff() {
    this.logService.logAction('Sign Off');
    this.offcanvasService.dismiss();
    this.configService.removeToken().subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  dailyClose() {
    this.http
      .get<any>(this.api + 'daily/checkItems', {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);

          if (data['items'].length > 0) {
            alert('Please close ' + data['items'].length + ' tables!');
            this.logService.logAction(
              'please close ' + data['items'].length + ' tables!'
            );
          } else {
            this.offcanvasService.dismiss();
            this.modalService.open(DailyCloseComponent, { size: 'sm' });
            this.logService.logAction('WARNING Daily Close ?');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpHeader() {
    let id = this.configService.getDailyCheck();
    const url = this.api + 'daily/getDailyStart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: id,
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.dataHeader = data['item'];
        },
        (error) => {
          console.log(error);
        }
      );
  }
  logOff() {  
    this.offcanvasService.dismiss(); 

     this.configService.isLogoff();
    this.router.navigate(['/home']);
    this.logService.logAction('Log Off');
  }

  openInNewTab(route: string) {
     const params = "width=800,height=600,left=100,top=50,resizable=yes,scrollbars=yes";

    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
    window.open(`${baseUrl}#${route}`, '_blank', params);
  }
}
