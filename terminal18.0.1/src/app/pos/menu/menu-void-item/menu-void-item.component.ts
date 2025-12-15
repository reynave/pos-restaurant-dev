import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../../service/config.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { UserLoggerService } from '../../../service/user-logger.service';
import { HeaderMenuComponent } from '../../../header/header-menu/header-menu.component';
import { KeyNumberComponent } from '../../../keypad/key-number/key-number.component';
import { LanguageService } from '../../../service/language.service';
@Component({
  selector: 'app-menu-void-item',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, HeaderMenuComponent, KeyNumberComponent],
  templateUrl: './menu-void-item.component.html',
  styleUrl: './menu-void-item.component.css'
})
export class MenuVoidItemComponent implements OnInit {
  table: any = [];
  id: string = '';
  item: any = {};
  items: any = [];
  itemsTransfer: any = [];
  subgroup: any = [];
  current: number = 0;
  loading: boolean = false;
  tablesMaps: any = [];
  qty: any = 0;
  screenWidth: number = window.innerWidth;
 indexNumber: number = 0;
  zoom: number = parseInt(localStorage.getItem('pos3.zoom') || '100');
  public: string = '';
voidReason : any = [];
 noteReasonVoid : string = '';
  api: string = '';
  server: string = '';
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    	config: NgbModalConfig,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    public lang: LanguageService,
    
  ) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }
  ngOnInit(): void {
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl(); 

    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.modalService.dismissAll();
     this.httpVoidReason();
    if (this.id == undefined) {
      alert(this.lang.get('ERROR, ngOnInit() id == undefined '));
      this.router.navigate(['tables']);
    } else {
      this.httpGet();
   
    }
  }

  reload() { 
    this.httpGet();
  }

  httpGet() {
    this.http
      .get<any>(this.api + 'menuItemPos/transferItemsGroup', {
        headers: this.configService.headers(),
        params: {
          id: this.id,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.items = data['items'];  
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onMap(index: number) {
    localStorage.setItem('pos3.onMap', index.toString());
    this.current = index;
  }

  httpVoidReason() {
    this.http.get<any>(this.api + 'menuItemPos/voidReason', {
      headers: this.configService.headers(),
    }).subscribe(
      (data) => {
        console.log(data);
        this.voidReason = data['items']; 
      },
      (error) => {
        console.log(error);
      }
    );
  }


  open(content: any, size: string = 'xl') {
    this.modalService.open(content, { size: size });
  }

  fnTransferItems(table: any) {
    if (this.table['outletTableMapId'] == table.id) {
      alert(this.lang.get('Select other table'));
      this.logService.logAction(
        'WARNING fnTransferItems - Select other table',
        this.id
      );
    } else {
      this.logService.logAction('fnTransferItems', this.id);

      const items: any[] = [];
      this.items.forEach((el: any) => {
        if (el.checkBox == 1) {
          items.push(el);
        }
      });
      console.log(table, items);

      const body = {
        cart: this.table,
        table: table,
        itemsTransfer: this.itemsTransfer,
        dailyCheckId: this.configService.getDailyCheck(),
        outletId: this.table['outletId'],
      };
      console.log(body);

      this.http
        .post<any>(this.api + 'menuItemPos/transferTable', body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.itemsTransfer = [];
            console.log(data);
            this.modalService.dismissAll();
            this.reload();
            this.logService.logAction(
              'fnTransferItems Items table ' +
                table.tableName +
                '(' +
                table.id +
                ') to ' +
                items[0]['tableName'] +
                '(' +
                this.table['outletTableMapId'] +
                ')',
              this.id
            );
          },
          (error) => {
            console.log(error);
            this.logService.logAction('ERROR fnTransferItems', this.id);
          }
        );
    }
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
      const targetId = this.items[this.indexNumber]['id'];
      const index = this.itemsTransfer.findIndex(
        (item: { id: number }) => item.id === targetId
      );
      console.log(index);
      if (index == -1) {
        if (this.items[this.indexNumber]['total'] < total) {
          total = this.items[this.indexNumber]['total'];
        }

        const data = {
          price: this.items[this.indexNumber]['price'],
          menuId: this.items[this.indexNumber]['menuId'],
          total: total,
          totalOriginal: this.items[this.indexNumber]['totalReset'],
          name: this.items[this.indexNumber]['name'],
          id: this.items[this.indexNumber]['id'],
        };
        this.itemsTransfer.push(data);
      } else {
        if (this.items[this.indexNumber]['total'] > 0) {
          if (this.items[this.indexNumber]['total'] < total) {
            this.itemsTransfer[index]['total'] =
              parseInt(this.itemsTransfer[index]['total']) +
              this.items[this.indexNumber]['total'];
          } else {
            this.itemsTransfer[index]['total'] =
              parseInt(this.itemsTransfer[index]['total']) + total;
          }
        }
      }
      // ITEMS
      if (this.items[this.indexNumber]['total'] - parseInt(this.qty) < 0) {
        this.items[this.indexNumber]['total'] = 0;
      } else {
        this.items[this.indexNumber]['total'] =
          this.items[this.indexNumber]['total'] - parseInt(this.qty);
      }
      // this.qty = 0;
      // this.modalService.dismissAll();
    }
    this.modalService.dismissAll();
  }

  fnCancel(index: number) { 
    const itemIndex = this.items.findIndex(
      (item: { id: number }) => item.id === this.itemsTransfer[index]['id']
    );
    console.log('itemIndex', itemIndex);
    if (itemIndex !== -1) {
      this.items[itemIndex]['total'] = this.items[itemIndex]['totalReset'];
    }

    console.log(index);
    this.itemsTransfer.splice(index, 1);
  }

  fnVoid(reason : string) {
    if(confirm(this.lang.get('Are you sure to void this transfer item?'))){
      console.log(reason);
      const body = {
        id: this.id,
        reason : reason,
        items : this.items,
        itemsTransfer : this.itemsTransfer
      }
      console.log(body);
      this.http.post<any>(this.api + 'menuItemPos/voidItemSo', body, {
        headers: this.configService.headers(),
      }).subscribe( 
        (data) => {
          console.log(data); 
          history.back();
        },
        (error) => {
          console.log(error); 
        }
      );
    }
  }
}
