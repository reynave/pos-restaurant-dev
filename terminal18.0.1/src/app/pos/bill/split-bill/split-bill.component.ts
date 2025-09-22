import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../../service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { HeaderMenuComponent } from '../../../header/header-menu/header-menu.component';
import { KeyNumberComponent } from '../../../keypad/key-number/key-number.component';

@Component({
  selector: 'app-split-bill',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderMenuComponent,
    KeyNumberComponent,
  ],
  templateUrl: './split-bill.component.html',
  styleUrl: './split-bill.component.css',
})
export class SplitBillComponent implements OnInit {
  id: string = '';
  items: any = [];
  subgroup: number = 1;
  api: string = '';
  screenWidth: number = window.innerWidth;
  qty: any = 0;
  tablesMaps: any = [];
  item: any = {};
  parentGroup: number = 0;
  indexNumber: number = 0;
  itemsTransfer: any = [];
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }
  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.subgroup = this.activeRouter.snapshot.queryParams['subgroup'] || 1;
    this.parentGroup =
      this.activeRouter.snapshot.queryParams['parentGroup'] || 0;

    this.modalService.dismissAll();

    if (this.id == undefined) {
      alert('ERROR, ngOnInit() id == undefined ');
      this.router.navigate(['tables']);
    } else {
      this.httpGet();
    }
  }

  httpGet() {
    this.http
      .get<any>(this.api + 'bill/splitBill', {
        headers: this.configService.headers(),
        params: {
          id: this.id,
          subgroup: this.subgroup, 
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.items = data['items'];
          this.itemsTransfer = data['itemsTransfer'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleData(data: any) {
    if (data == 'b') {
      let qty = this.qty.toString();
      qty = qty.slice(0, -1);

      if (qty == '') {
        qty = '0';
      }
      this.qty = parseInt(qty);
    } else {
      if (this.qty == 0) {
        this.qty = data;
      } else {
        this.qty = this.qty + data;
      }

      this.qty = parseInt(this.qty);
    }
  }

  openKey(content: any, item: any, index: number) {
    this.qty = 0;
    this.item = item;
    this.indexNumber = index;
    console.log(this.item, this.indexNumber);
    this.modalService.open(content, { size: 'sm' });
  }
  onSubmit() {
    let total = 0;
    total = this.qty;

    if (this.qty > 0) { 
      this.updateGroup(this.items[this.indexNumber], this.qty);
    }
    this.modalService.dismissAll();
  }

  fnCancel(index: number) {
    
    const body = {
      id: this.id,
      parentGroup: this.parentGroup,
      subgroup: this.subgroup,
      item: this.itemsTransfer[index] 
    }; 
    console.log(body)
    this.http
      .post<any>(this.api + 'bill/resetGroup', body, {
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

  updateGroup(item: any, qty: number) {
    const body = {
      id: this.id, 
      subgroup: this.subgroup,
      itemTransfer: item,
      qty: qty
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'bill/updateGroup', body, {
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
