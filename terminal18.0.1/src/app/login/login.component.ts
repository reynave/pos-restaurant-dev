import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ConfigService } from '../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeyNumberComponent } from '../keypad/key-number/key-number.component';
import { LanguageService } from '../service/language.service';

export class Actor {
  constructor(
    public username: string,
    public password: string,
    public outletId: string
  ) {}
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    KeyNumberComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  error: string = '';
  model: any = new Actor('', '', '');
  loading: boolean = false;
  ver: string = environment.ver;
  outletSelect: any = [];
  employeeSelect: any = [];
  api: string = '';

  constructor(
    private config: ConfigService,
    private router: Router,
    private http: HttpClient,
    public lang: LanguageService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
  
    this.api = this.config.getApiUrl();
    this.httpGet();


    if (this.config.getConfigJson() !== null) {
      this.router.navigate(['tables']);
    }

     
  }

  saveOutlet(){
    console.log(this.model.outletId);
    localStorage.setItem('pos3.outlet.mitralink', this.model.outletId);
  }

  httpGet() {
    this.loading = true;
    const url = this.api + 'login/outlet';
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log(data);
        this.loading = false;
        this.outletSelect = data['outletSelect'];
        this.employeeSelect = data['employeeSelect']; 

         this.model.outletId = localStorage.getItem('pos3.outlet.mitralink')?.toString() || data['outletSelect'][0]['id'];

        console.log('Outlet ID from localStorage:', this.model.outletId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
  localStorage.setItem('pos3.outlet.mitralink', this.model.outletId);
    this.error = '';
    const getIndexById = this.outletSelect.findIndex(
      (obj: { id: any }) => obj.id === parseInt(this.model.outletId)
    );

    const url = this.api + 'login/signin';
    const body = {
      // username: this.employeeSelect[this.model.username]['id'],
      username: this.model['username'],
      password: this.model['password'],
      outletId: this.model['outletId'],
    };
    //console.log(body, this.employeeSelect[this.model.username]['id'], this.employeeSelect[this.model.username]['name'])
    this.http.post<any>(url, body).subscribe(
      (data) => {
        console.log(data);
        this.loading = false;
        const outlet = data['outlet'][0];
        const myJSONString = JSON.stringify({
          outlet: {
            id: this.model.outletId,
            name: this.outletSelect[getIndexById]['name'],
            posMode: outlet['posMode'],
          },
          printer: {
            con: data['printer']['con'],
            address: data['printer']['address'],
            port: data['printer']['port'],
            name: data['printer']['name'],
          },
        });
        //  console.log(myJSONString);
        let dailyCheck = data['dailyCheck'];
        this.config.setToken(myJSONString, data['token']).subscribe((data) => {
          this.config.isLogin();
          console.log(dailyCheck);
          if (dailyCheck[0] == null) {
            this.router.navigate(['/daily/start']);
          } else {
            localStorage.setItem('pos3.dailyCheck.mitralink', dailyCheck[0]['id']); 
            console.log('posMode', outlet['posMode']);
            if (outlet['posMode'] == 'cashier') {
              this.router.navigate(['/cashier']);
            } else {
              this.router.navigate(['/navBar']);
            }
          }
        });
        this.error = '';
      },
      (error) => {
        console.log(error);
        this.error = error['error']['message'];
      }
    );
  }

  handleData(data: string) {
    console.log(data);

    if (data == 'b') {
      this.model.password = this.model.password.slice(0, -1);
      console.log(data);
    } else {
      this.model.password = this.model.password + data;
    }
  }
}
