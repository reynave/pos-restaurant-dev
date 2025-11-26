import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../service/config.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserLoggerService } from '../../service/user-logger.service';
@Component({
  selector: 'app-void',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './void.component.html',
  styleUrl: './void.component.css',
})
export class VoidComponent implements OnInit {
  api: string = '';
  server: string = '';
  id: string = '';
  voidReason: any = [];
  noteReasonVoid: string = '';
  action : string = '';
  titleLabel : string = 'Void Transaction';
  module : string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService
  ) {}
  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();

    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.action = this.activeRouter.snapshot.queryParams['action'];
 this.module = this.activeRouter.snapshot.queryParams['module'];

    if(this.action == 'cart'){
      this.titleLabel = 'Transaction';
    }
    else if(this.action == 'payment'){
      this.titleLabel = 'Void Payment';
    }


    this.httpVoidReason();
  }

  httpVoidReason() {
    this.http
      .get<any>(this.api + 'menuItemPos/voidReason', {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.voidReason = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fnVoid(reason : string) {
    if(confirm('Are you sure to void this transaction?')){
    
      const body = {
        id: this.id,
        reason : reason, 
        action : this.action
      }
      console.log(body);
      this.http.post<any>(this.api + this.module + '/' + this.action, body, {
        headers: this.configService.headers(),
      }).subscribe( 
        (data) => {
          console.log(data); 
          localStorage.removeItem('pos3.id');
          setTimeout(() => { 
            history.go(-2);
          }, 500);
          
          
        },
        (error) => {
          console.log(error); 
        }
      );
    }
  }
  back(){
    history.back();
  }
}
