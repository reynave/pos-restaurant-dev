import { Component, OnInit } from '@angular/core';
import { HeaderMenuComponent } from '../../header/header-menu/header-menu.component';
import { ConfigService } from '../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../../service/user-logger.service';
import { SocketService } from '../../service/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    HeaderMenuComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent implements OnInit {
  screenWidth: number = window.innerWidth;
  api: string = '';
  terminalId: any = '';
  server: string = '';
  getConfigJson : any = {};
  getTokenJson : any = {};
  items : any = [];
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    private socketService: SocketService
  ) {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }
  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();
    this.terminalId = localStorage.getItem('pos3.terminal.mitralink');

    this.getConfigJson = this.configService.getConfigJson();
    this.getTokenJson = this.configService.getTokenJson();
    this.httpGet();
  }

  httpGet(){
    this.http
    .get<any>(this.api + 'counter/queue', {
      headers: this.configService.headers(),
      params: { 
        outletId: this.getConfigJson['outlet']['id'],
      }
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.items = data['items'];
      },
      (error) => {
        console.log(error);
      }   
    );  
  }

  openInNewTab(route: string) {
    const params = 'width=800,height=600,left=100,top=50,resizable=yes,scrollbars=yes'; 
    const baseUrl =
      window.location.origin +
      window.location.pathname.replace(/\/[^\/]*$/, '/');
    window.open(`${baseUrl}#${route}`, '_blank', params);
  }

  signOff() {}
  dailyClose() {
    this.router.navigate(['/daily-close']);
  }

  newOrder() { 
    const body = { 
      terminalId: this.terminalId,
      dailyCheckId: this.configService.getDailyCheck(),
      outletId: this.getConfigJson['outlet']['id'],

    };
    this.http
      .post<any>(this.api + 'counter/newOrder', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
    
         this.router.navigate(['/menu'], { queryParams: { id:data['cardId'] } });
          this.logService.logAction('Go to Menu', data['cardId']);
          this.socketService.emit('message-from-client', 'reload');
        },
        (error) => {
          console.log(error);
          this.logService.logAction('ERROR now order');
        }
      );
  }

  deleteOrder(id: string) {
    if (confirm('Are you sure to delete this order #' + id + '?')) {
      const body = {
        id : id
      };
      this.http
        .post<any>(this.api + 'counter/deleteOrder/',body, {  
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.logService.logAction('Delete Order', id); 
            this.httpGet();
            this.socketService.emit('message-from-client', 'reload');
          },
          (error) => {
            console.log(error);
            this.logService.logAction('ERROR delete order');
          }
        );
    }
  }
  editOrder(id: string) {
    this.router.navigate(['/menu'], { queryParams: { id: id } });
    this.logService.logAction('Go to Menu', id);
  } 
}
