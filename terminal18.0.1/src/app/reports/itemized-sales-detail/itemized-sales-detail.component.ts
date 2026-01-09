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
  selector: 'app-itemized-sales-detail',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, CommonModule],
  templateUrl: './itemized-sales-detail.component.html',
  styleUrl: './itemized-sales-detail.component.css'
})
export class ItemizedSalesDetailComponent  implements OnInit {
  startDate : any = { year: 2025, month: 12, day: 18 };
  endDate : any = { year: 2026, month: 12, day: 18 };
  loading: boolean = false;
  api: string = '';
  server: string = '';
  note : string = '';  
  showData : boolean = false;
 items : any = [];
 report: any = null;
  constructor(
    private activeRouter: ActivatedRoute,  
    private http: HttpClient,
    private configService: ConfigService
  ) { }
  ngOnInit(): void { 
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();
    this.startDate = this.activeRouter.snapshot.queryParams['startDate'];
    this.endDate = this.activeRouter.snapshot.queryParams['endDate'];
    this.httpGetReport()
  } 
   
  httpGetReport(){
    this.showData = true;
    this.loading = true;
   
    this.http.get(this.api+`reports/itemizedSalesDetail`,{
      headers: this.configService.headers(),
      params: {
        startDate: this.startDate,
        endDate: this.endDate
      } 
    }).subscribe({
      next: (data:any) => {
        console.log(data); 
        // support both shapes: legacy `items` or new object with `data`/`periods`
        this.report = data;
        this.items = data.items || data.data || [];
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
