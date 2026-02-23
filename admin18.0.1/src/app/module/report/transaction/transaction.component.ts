import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDropdownModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent implements OnInit {
  loading: boolean = false;
  checkboxAll: number = 0;
  disabled: boolean = true;
  items: any = [];
  outletId: string = '';
  startDate: any = {};
  endDate: any = {};
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.startDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.endDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Query Params changed:', params);
      this.outletId = params['outletId'];
      this.httpGet();
    });
  }

  formatDate(date: NgbDateStruct): string {
    if (!date) return '';
    const m = date.month.toString().padStart(2, '0');
    const d = date.day.toString().padStart(2, '0');
    return `${date.year}-${m}-${d}`;
  }

  httpGet() {
    this.loading = true;
    const url = environment.api + 'transaction/';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          outletId: this.outletId,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate),
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.items = data['items'];
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
