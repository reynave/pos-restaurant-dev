import { Component, OnInit } from '@angular/core'; 
import { ConfigService } from '../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserLoggerService } from '../../service/user-logger.service';
import { SocketService } from '../../service/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [
     HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent implements OnInit {
  screenWidth: number = window.innerWidth;
  api: string = '';
  terminalId: any = '';
  server: string = '';
  getConfigJson : any = {};
  getTokenJson : any = {};
  items : any = [];
  ver : string = environment.ver;
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
    .get<any>(this.api + 'cashier/queue', {
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

 
  newOrder() { 
    const body = { 
      terminalId: this.terminalId,
      dailyCheckId: this.configService.getDailyCheck(),
      outletId: this.getConfigJson['outlet']['id'],

    };
    this.http
      .post<any>(this.api + 'cashier/newOrder', body, {
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
        .post<any>(this.api + 'cashier/deleteOrder/',body, {  
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

  goToMenu(id: string) { 
    const url = this.api + 'menuItemPos/lockTable';
    const body = {
      cartId:  id,
      terminalId: this.terminalId,
    };
 
    this.http
      .post<any>(url, body, { headers: this.configService.headers() })
      .subscribe(
        (data) => {
          console.log(data); 
          this.router.navigate(['/menu'], { queryParams: { id: id } });
          this.logService.logAction('Go to Menu', id);
        },
        (error) => {
          console.log(error);
        }
      );
  
  } 

   signOff() {
      this.logService.logAction('Sign Off'); 
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
              this.logService.logAction('WARNING Daily Close ?');
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  
}
