import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
export class Actor {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public earningStartDate: any, 
 public earningEndDate: any, 

  public redeemStartDate: any, 
 public redeemEndDate: any, 
    public status: number,
  ) { }
}
@Component({
  selector: 'app-cashback',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgbDropdownModule, NgbDatepickerModule, RouterModule ],
  templateUrl: './cashback.component.html',
  styleUrl: './cashback.component.css'
})
export class CashbackComponent implements OnInit {
  loading: boolean = false;
  checkboxAll: number = 0;
  disabled: boolean = true;
  items: any = [];
  outletSelect: any = [];
  api: string = environment.api;
  id: string = "";
  model = new Actor('', '', '', '', '', '', '', 1);
  path: string = environment.api + "public/floorMap/icon/";

  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpGet();
  }



  httpGet() {
    this.loading = true;
    const url = environment.api + "cashback";
    this.http.get<any>(url, {
      headers: this.configService.headers(),
      params: {
        id: this.id,
        startDate: '',
        endDate: '',
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
        this.items[i]['checkbox'] = 1;
      }
    }
    else if (this.checkboxAll == 1) {
      this.checkboxAll = 0;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['checkbox'] = 0;
      }
    }
  }

  cancel() {
    this.disabled = true;
    this.httpGet();
  }

  onUpdate() {
    this.loading = true;
    const url = environment.api + "cashback/update";
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

  onDelete() {
    if (confirm("Delete this checklist?")) {
      this.loading = true;
      const url = environment.api + "cashback/delete";
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
    const url = environment.api + "cashback/create";
    const body = {
      model: this.model,
    };
    this.http.post<any>(url, body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.modalService.dismissAll();
        this.model.name = '';
        this.router.navigate(['/cashback/detail'], { queryParams: { id: data.id } });

        this.httpGet();


      },
      error => {
        console.log(error);
      }
    )
  }
  item: any = {}
  open(content: any, item: any = [], size: string = 'md') {
    this.item = item;
    this.modalService.open(content, { size: size });
     
  } 

  onDuplicate() {
    
    this.loading = true;
    const url = environment.api + 'cashback/duplicate';
    const body = this.items;


    //tolong buatkan array yang di check box saja yang di post ke backend
    let duplicateItems = [];
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]['checkbox'] == 1) {
        duplicateItems.push(this.items[i]);
      }
    } 
    console.log(duplicateItems);

    this.http
      .post<any>(url, duplicateItems, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.httpGet();
        },
        (error) => {
          console.log(error);
        }
      ); 
  }
}
