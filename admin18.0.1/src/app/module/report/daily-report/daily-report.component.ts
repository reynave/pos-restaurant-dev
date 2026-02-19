import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-daily-report',
  standalone: true,
   imports: [HttpClientModule, CommonModule, FormsModule, NgbDropdownModule, NgbDatepickerModule],
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.css'
})
export class DailyReportComponent implements OnInit {
  loading: boolean = false;
  checkboxAll: number = 0;
  disabled: boolean = true;
  items: any = [];
  startDate: any = null;
  endDate: any = null; 
 
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const now = new Date();
    this.startDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: 1 };
    this.endDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.httpGet();
  }

  formatDateStruct(d: any): string {
    if (!d) return '';
    const mm = String(d.month).padStart(2, '0');
    const dd = String(d.day).padStart(2, '0');
    return `${d.year}-${mm}-${dd}`;
  }

  onFilter() {
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    const url = environment.api + "dailyClose/";
    this.http.get<any>(url, {
      headers: this.configService.headers(),
      params: {
        startDate: this.formatDateStruct(this.startDate),
        endDate: this.formatDateStruct(this.endDate),
      }
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.items = data['items'];
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
      }
    )
  }
  
  
  onUpdate() {
    this.loading = true;
    const url = environment.api + "specialHour/update";
    const body = this.items;
    this.http.post<any>(url, body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    )
  }

   
  open(content: any) {
    this.modalService.open(content);
  }

}
