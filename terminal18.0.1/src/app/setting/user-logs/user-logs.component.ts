import { Component, OnInit } from '@angular/core';
import { HeaderMenuComponent } from '../../header/header-menu/header-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../service/config.service';
import { environment } from '../../../environments/environment';
import { UserLoggerService } from '../../service/user-logger.service';

@Component({
  selector: 'app-user-logs',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    HeaderMenuComponent,
    NgbDatepickerModule,
  ],

  templateUrl: './user-logs.component.html',
  styleUrl: './user-logs.component.css',
})
export class UserLogsComponent implements OnInit {
  items: any = [];

  startDate: any = '';
  endDate: any = '';
  today: any = new Date();
  loading: boolean = false;
  screenWidth: number = window.innerWidth;
  api: string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    public logService: UserLoggerService
  ) {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.startDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    };
    this.endDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    };
  }
  convertToCSV(items: any[]): string {
    if (!items || !items.length) {
      return '';
    }

    const headers = Object.keys(items[0]).join(',');
    const rows = items.map((item) =>
      Object.values(item)
        .map((value) => `"${value}"`)
        .join(',')
    );

    return [headers, ...rows].join('\n');
  }

  download() {
    const startDate =
      this.startDate.year +
      '-' +
      this.startDate.month.toString().padStart(2, '0') +
      '-' +
      this.startDate.day.toString().padStart(2, '0');

    const endDate =
      this.endDate.year +
      '-' +
      this.endDate.month.toString().padStart(2, '0') +
      '-' +
      this.endDate.day.toString().padStart(2, '0');

    // buatkan code donwnload csv dari json this.items
    const csvData = this.convertToCSV(this.items);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `userLog-${startDate}_to_${endDate}.csv`;
    link.click();
  }

  onSearch() {
    this.loading = true;
    const startDate =
      this.startDate.year +
      '-' +
      this.startDate.month.toString().padStart(2, '0') +
      '-' +
      this.startDate.day.toString().padStart(2, '0');

    const endDate =
      this.endDate.year +
      '-' +
      this.endDate.month.toString().padStart(2, '0') +
      '-' +
      this.endDate.day.toString().padStart(2, '0');

    this.http
      .get<any>(this.api + 'log/getLog', {
        headers: this.configService.headers(),
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.items = data['log'];
          this.loading = false;
          this.logService.logAction(
            `Search log from ${startDate} to ${endDate}`
          );
        },
        (error) => {
          console.log(error);
          alert(error['error']['error']);
          this.loading = false;
          this.logService.logAction(
            `ERROR Search log / not found from ${startDate} to ${endDate}`
          );
        }
      );
  }
}
