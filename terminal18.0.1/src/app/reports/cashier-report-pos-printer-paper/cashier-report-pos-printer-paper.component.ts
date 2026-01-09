import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../service/language.service';
import { SocketService } from '../../service/socket.service';
import { UserLoggerService } from '../../service/user-logger.service';
import {
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../service/config.service';
@Component({
  selector: 'app-cashier-report-pos-printer-paper',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, CommonModule],
  templateUrl: './cashier-report-pos-printer-paper.component.html',
  styleUrl: './cashier-report-pos-printer-paper.component.css',
})
export class CashierReportPosPrinterPaperComponent implements OnInit {
  startDate: any = [];
  endDate: any = [];
  loading: boolean = false;
  api: string = '';
  server: string = '';
  note: string = '';
  showData: boolean = false;
  items : any = [];
  constructor(
    private activeRouter: ActivatedRoute,
    private socketService: SocketService,
    private languageService: LanguageService,
    private userLoggerService: UserLoggerService,
    private http: HttpClient,
    private configService: ConfigService
  ) {}
  ngOnInit(): void {
    console.log(this.activeRouter.snapshot.queryParams['date']);
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();
  }

  onSubmit() {
    this.showData = true;
    this.loading = true;
    const startDate = `${this.startDate.year}-${String( this.startDate.month ).padStart(2, '0')}-${String(this.startDate.day).padStart(2, '0')}`;
    const endDate = `${this.endDate.year}-${String(this.endDate.month).padStart( 2,'0')}-${String(this.endDate.day).padStart(2, '0')}`;

    this.http
      .get(this.api + `reports/cashierReports`, {
        headers: this.configService.headers(),
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.items = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.loading = false;
          this.note = error.message;
        },
      });
  }
}
