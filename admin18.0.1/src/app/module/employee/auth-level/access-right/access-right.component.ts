import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
export class Actor {
  constructor(
    public desc1: string,
    public desc2: string,
    public desc3: string,
  ) { }
}
@Component({
  selector: 'app-access-right',
  standalone: true,
   imports: [HttpClientModule, CommonModule,RouterModule, FormsModule, NgbDropdownModule, NgbDatepickerModule],
 
  templateUrl: './access-right.component.html',
  styleUrl: './access-right.component.css'
})
export class AccessRightComponent implements OnInit {
  loading: boolean = false;
  checkboxAll: number = 0;
  disabled: boolean = true;
  items: any = [];
  selectDept: any = [];
  selectAuthLevel: any = [];
  selectOrdLevel: any = [];

  id : number = 0;
  model = new Actor('', '', '',);
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private activeRouter : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.queryParams['id'] || 0;
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    const url = environment.api + "employee/accessRight";
    this.http.get<any>(url, {
      headers: this.configService.headers(),
      params: {
        id: this.id.toString(),
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
  checkAll() {
    if (this.checkboxAll == 0) {
      this.checkboxAll = 1;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['authLevelId'] = this.id;
      }
    }
    else if (this.checkboxAll == 1) {
      this.checkboxAll = 0;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['authLevelId'] = null;
      }
    }
  }
  cancel() {
    this.disabled = true;
    this.httpGet();
  }
  onUpdate() {
    this.loading = true;
    const url = environment.api + "employee/accessRight/update";
    const body = {
      authLevelId : this.id,
      items : this.items,
    }; 
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

  onDelete() {
    if (confirm("Delete this checklist?")) { 
      this.loading = true;
      const url = environment.api + "employee/accessRight/delete";
      const body = this.items;
      this.http.post<any>(url, body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.httpGet();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onSubmit() {
    this.loading = true;
    const url = environment.api + "employee/accessRight/create";
    const body = {
      model: this.model,
    };
    this.http.post<any>(url, body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        if (data['error'] == false) {
          this.model = new Actor('', '', '');
          this.httpGet();
        } else {
          alert("INSERT ERROR");
        }

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
