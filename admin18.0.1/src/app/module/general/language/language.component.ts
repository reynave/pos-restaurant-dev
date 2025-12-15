import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-language',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],

  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
})
export class LanguageComponent implements OnInit {
  loading: boolean = false;
  disabled: boolean = true;
  items: any = [];
  api: string = environment.api;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    const url = environment.api + 'language';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.items = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onFieldKeydown(event: KeyboardEvent, item: any) {
    if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
      event.preventDefault();
      this.saveItem(item);
    }
  }

  saveItem(item: any) {
    if (this.disabled || this.loading) {
      return;
    } 
    const url = environment.api + 'language/update';
    this.http
      .post<any>(url, [item], {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
            console.log(data)
        },
        (error) => {
          console.log(error);
           
        }
      );
  }
}
