import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../service/language.service';
import { SocketService } from '../../service/socket.service';
import { UserLoggerService } from '../../service/user-logger.service';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-summary-report',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, CommonModule],
  templateUrl: './sales-summary-report.component.html',
  styleUrl: './sales-summary-report.component.css'
})
export class SalesSummaryReportComponent  implements OnInit {
  startDate : any = [];
  endDate : any = [];
  loading: boolean = false
  constructor(
    private activeRouter: ActivatedRoute, 
    private socketService: SocketService,
    private languageService: LanguageService,
    private userLoggerService: UserLoggerService
  ) { }
  ngOnInit(): void {
     console.log(this.activeRouter.snapshot.queryParams['date'])
  }

}
