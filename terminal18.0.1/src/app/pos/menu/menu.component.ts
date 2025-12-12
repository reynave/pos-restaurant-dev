import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ConfigService } from '../../service/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderMenuComponent } from '../../header/header-menu/header-menu.component';
import { BillComponent } from '../bill/bill.component';
import { KeyNumberComponent } from '../../keypad/key-number/key-number.component';
import { TransferLogComponent } from './transfer-log/transfer-log.component';
import { UserLoggerService } from '../../service/user-logger.service';
import { MergerLogComponent } from './merger-log/merger-log.component';
import { TablePrintQueueComponent } from '../print-queue/table-print-queue/table-print-queue.component';
import { SocketService } from '../../service/socket.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LanguageService } from '../../service/language.service';
export class Actor {
  constructor(
    public newQty: number,
    public note: string,
    public price: number
  ) {}
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterModule,
    HeaderMenuComponent,
    KeyNumberComponent,
    TablePrintQueueComponent,
    NgxCurrencyDirective,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild('myInput') myInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('remarkInput') remarkInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('modalInfoPrinting') modalInfoPrinting!: ElementRef<HTMLInputElement>;
  
  loading: boolean = false;
  current: number = 0;
  checkboxAll: number = 0;
  disabled: boolean = true;
  env: any = environment;
  items: any = [
    {
      menu: [],
    },
  ];
  questCheckTemp: string = '';

  sendOrderItems: any = [];
  zoom: number = parseInt(localStorage.getItem('pos3.zoom') || '100');
  public: string = '';
  summary: any = {
    totalItem: 0,
    discount: 0,
    subTotal: 0,
    sc: 0,
    tax: 0,
    grandTotal: 0,
  };
  modifiers: any = [];
  item: any = [];
  cart: any = [];

  discountGroup: any = [];
  menuSet: any = [];
  id: string = '';
  totalAmount: number = 0;
  totalAmountOrdered: number = 0;

  api: string = '';
  server: string = '';
  isChecked: boolean = false;
  model = new Actor(0, '', 0);

  cssClass: string = 'btn btn-sm py-3   rounded shadow-sm';
  cssMenu: string = 'btn btn-sm py-3 bg-white  me-1 lh-1  rounded shadow-sm';
  cssMenuDisable: string =
    'btn btn-sm py-3 btn-light me-1 lh-1 text-danger rounded shadow-sm';

  showHeader: boolean = true;

  printNote: string = '';
  printNoteError: boolean = false;
  printLoading: boolean = false;

  showApplyDiscount: boolean = false;
  showMenu: boolean = false;
  showModifier: boolean = false;

  checkBoxAllModifier: boolean = true;
  checkBoxAllScTax: boolean = false;
  modifierDetail: any = [];
  totalCard: number = 0;
  totalCardOrder: number = 0;

  remark: string = '';
  results: any = [];
  discountGroupSelect: any = {};
  lock: boolean = true;
  lookUpHeader: string = '';
  menuLookUp: any = [];
  menuLookupId: number = 0;
  menuLookUpParent: any = [];
  terminalId: any = localStorage.getItem('pos3.terminal.mitralink');
  tablesMaps: any = [];
  table: any = [];
  screenWidth: number = window.innerWidth;
  checkBoxAll: boolean = false;
  activeTab: string = 'menu';
  selectedItem: any;
  posMode: string = 'table'; // counter / table
  autoBack: boolean = true;
  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    public modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public logService: UserLoggerService,
    private socketService: SocketService,
    config: NgbModalConfig,
    public lang: LanguageService
  ) {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnDestroy(): void {
    console.log('MENU EMIT : ngOnDestroy');
    const data = {
      terminalId: this.terminalId,
      id: '',
      tableId: this.table.id,
    };
    this.socketService.emit('message-from-client', data);
  }

  fnCheckBoxAll() {
    if (this.checkBoxAll == false) {
      this.checkBoxAll = true;
      this.isChecked = true;
    } else {
      this.checkBoxAll = false;
      this.isChecked = false;
    }

    this.cart.forEach((el: any) => {
      el['checkBox'] = this.checkBoxAll;
      el['modifier'].forEach((mod: any) => {
        mod['checkBox'] = this.checkBoxAll;
      });
    });
  }

  sendMessage() {
    console.log('MENU EMIT : sendMessage');
    const data = {
      terminalId: this.terminalId,
      id: this.id,
      tableId: this.table.id,
    };
    this.socketService.emit('message-from-client', data);
  }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.posMode = localStorage.getItem('pos3.mode') || 'table';
    this.api = this.configService.getApiUrl();
    this.server = this.configService.getServerUrl();
    this.public = this.server + 'public/floorMap/';

    this.modalService.dismissAll();
    console.log(this.posMode);

    if (this.id == undefined) {
      alert('ERROR, ngOnInit() id == undefined ');
      this.router.navigate(['error']);
    } else {
      this.uxFunction();

      this.httpMenuLookUp(0);
      this.httpMenu();
      this.httpGetDiscountGroup();
      this.httpCart();
      this.httpBillGrandTotal();
      this.httpGetModifier();
      this.httpTables();
      this.httpDailyStart();

      if (localStorage.getItem('pos3.modal.bill') == '1') {
        this.openComponent(this.id);
        localStorage.removeItem('pos3.modal.bill');
      }
    }
  }
  uxMenu : any = [];
  uxFunction(){
    this.http
      .get(this.api + 'ux', {
        headers: this.configService.headers(), 
      })
      .subscribe(
        (data: any) => {
          const menu = data['menu']
          console.log('uxFunction', data); 
        
          // Transformasi array menjadi objek
        const transformedMenu = menu.reduce((acc : any, item :any) => {
          acc[item.name.toLowerCase().replace(/\s+/g, "_")] = item;
          return acc;
        }, {});
        this.uxMenu = transformedMenu;

          console.log('uxFunction', this.uxMenu); 

        },
        (error) => {
          console.log(error);
        }
      );
  }


  httpBillGrandTotal() {
    this.http
      .get(this.api + 'payment/cart', {
        headers: this.configService.headers(),
        params: {
          id: this.id,
        },
      })
      .subscribe(
        (data: any) => {
          console.log('httpBill', data);
          this.summary = data['data']['summary'];
          // data['data']['discountGroup'].forEach(
          //   (element: { [x: string]: any }) => {
          //     console.log(element);
          //     this.billDiscount += parseInt(element['amount'] || 0);
          //   }
          // );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fnLock() {}

  httpDailyStart() {
    let id = this.configService.getDailyCheck();
    const url = this.api + 'daily/getDailyStart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: id,
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          if (data['item']['closeDateWarning'] > 0) {
            this.lock = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpMenuLookUp(id: number) {
    this.logService.logAction('Menu Lookup ' + id, this.id);
    this.loading = true;
    const url = this.api + 'menuItemPos/menuLookUp';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          parentId: id,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.menuLookUpParent = data['parent'];
          this.menuLookUp = data['results'];
          if (data['parent'].length) {
            this.menuLookupId = data['parent'][0]['id'];
          }

          this.httpMenu();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  btnFinish() {
    this.showHeader = true;
    this.showMenu = false;
    this.showModifier = false;
    this.showApplyDiscount = false;
    this.httpMenuLookUp(0);
  }

  backMenu(menuLookUpParent: any = []) {
    if (menuLookUpParent.length <= 0) {
      this.showHeader = true;
      this.showMenu = false;
      this.showModifier = false;
      this.showApplyDiscount = false;
    } else {
      this.httpMenuLookUp(menuLookUpParent[0]['parentId']);
    }
  }

  httpMenu() {
    this.loading = true;
    const url = this.api + 'menuItemPos/lookUpMenu';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          menuLookupId: this.menuLookupId,
          outletId: this.configService.getConfigJson()['outlet']['id'],
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.items = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpGetDiscountGroup() {
    this.loading = true;
    const url = this.api + 'menuItemPos/discountGroup';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          outletId: this.configService.getConfigJson()['outlet']['id'],
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.discountGroup = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpGetModifier() {
    this.loading = true;
    const url = this.api + 'menuItemPos/getModifier';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          outletId: this.configService.getConfigJson()['outlet']['id'],
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.modifiers = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  httpCart() {
    this.loading = true;
    const url = this.api + 'menuItemPos/cart';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          id: this.id,
          posMode: this.posMode,
        },
      })
      .subscribe(
        (data) => {
          if(data['table'].length == 0){
            alert("ERROR / EMPTY SESSION");
            this.router.navigate(['/']);
          }
          console.log('httpCart', data);
          this.cart = data['items'];
          this.totalCard = data['totalItem'];
          this.totalAmount = data['totalAmount'];
          this.table = data['table'][0];
          const lockBy = this.table['lockBy'] != '' ? this.table['lockBy'] : 0;
          console.log(this.terminalId, lockBy);
          if (this.terminalId != lockBy) {
            alert(
              'This table is being used by another user. Please select another table.'
            );
            this.router.navigate(['menu/lock'], {
              queryParams: { id: this.id },
            });
          } else {
            this.sendMessage();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reload() {
    this.checkBoxAll = false;
    this.httpMenu();
    this.httpGetDiscountGroup();
    this.httpCart();
    this.httpBillGrandTotal();
  }

  onSubmitMenuSet() {
    console.log(this.item, this.menuSet);

    const menuSetMinQty = this.item['menuSetMinQty'];
    let total = 0;

    this.menuSet.forEach((row: any) => {
      total += row['select'];
    });

    if (total >= menuSetMinQty) {
      const body = {
        id: this.id,
        menuSet: this.menuSet,
        menu: this.item,
      };
      console.log(body);
      this.http
        .post<any>(this.api + 'menuItemPos/addToCart', body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.logService.logAction('Add MenuSet', this.id);
            this.reload();
            this.modalService.dismissAll();
          },
          (error) => {
            console.log(error);
            this.logService.logAction('ERROR Add MenuSet ', this.id);
          }
        );
    } else {
      alert(menuSetMinQty + ' menu required!');
    }
    console.log(total);
  }

  openSelectOrder(x: any) {
    this.selectedItem = x;
  }

  fnShowModifierDetail(index: number) {
    this.modifierDetail = this.modifiers[index];
  }

  fnSubmitModifier() {
    const body = {
      cart: this.cart,
      cartId: this.id,
      modifiers: this.modifierDetail['detail'],
    };
    this.http
      .post<any>(this.api + 'menuItemPos/addToItemModifier', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.logService.logAction(
            'Add Modifier ' +
              this.modifierDetail['descs'] +
              '(' +
              this.modifierDetail['id'] +
              ') @' +
              this.modifierDetail['price'],
            this.id
          );
          this.reload();
          this.results = data['results'];

          for (let i = 0; i < this.modifierDetail['detail'].length; i++) {
            this.modifierDetail['detail'][i]['checkBox'] = 0;
          }
        },
        (error) => {
          console.log(error);
          this.logService.logAction(
            'ERROR Add Modifier ' +
              this.modifierDetail['descs'] +
              '(' +
              this.modifierDetail['id'] +
              ') @' +
              this.modifierDetail['price'],
            this.id
          );
        }
      );
  }

  open(
    content: any,
    x: any,
    i: number,
    size: string = 'sm',
    name: string = ''
  ) {
    this.item = x;
    this.modalService.open(content, { size: size });
    if (name == 'SELECT') {
      this.http
        .get<any>(this.api + 'menuItemPos/selectMenuSet', {
          headers: this.configService.headers(),
          params: {
            itemId: x.id,
            menuSetMinQty: x.menuSetMinQty,
          },
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.menuSet = data['menuSet'];
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  modal(content: any, size: string = 'sm') {
    this.isChecked = false;
    this.checkIfAnyItemChecked();
    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      const modalRef = this.modalService.open(content, { size: size });
      // Tunggu sampai modal selesai terbuka (after animation)
      setTimeout(() => {
        const inputElement = this.myInputRef?.nativeElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.setSelectionRange(
            inputElement.value.length,
            inputElement.value.length
          );
        }
      }, 300);
    }
  }

  addCustomNotes() {
    const qty = this.model.newQty;
    const items: any = [];
    this.cart.forEach((row: any) => {
      if (row['checkBox']) {
        items.push({
          id: row['id'],
        });
      }
    });

    const body = {
      model: this.model,
      items: items,
      cartId: this.id,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'menuItemPos/addCustomNotes', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.logService.logAction(
            'Modifier Custom  Notes :' + this.model.note,
            this.id
          );
          console.log(data);
          this.modalService.dismissAll();
          this.model.newQty = 1;
          this.model.note = '';
          this.reload();
        },
        (error) => {
          console.log(error);
          this.logService.logAction(
            'ERROR Add Qty ' + qty + ' ' + this.item['name'],
            this.id
          );
        }
      );
  }

  openSm(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  openComponent(id: string) {
    console.log('openComponent', id);
    const modalRef = this.modalService.open(BillComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;

    modalRef.result.then(
      (result) => {
        // result berisi data yang dikirim dari BillComponent saat modal ditutup
        console.log('Data dari BillComponent:', result);
        this.id = this.activeRouter.snapshot.queryParams['id'];
        //this.reload();
      },
      (reason) => {
        // modal ditutup tanpa data (dismiss)
        this.id = this.activeRouter.snapshot.queryParams['id'];
       // this.reload();
        console.log('Modal dismissed:', reason);
      }
    );
  }

  back() {
    this.logService.logAction('Clear Lock Table');
    const body = { cartId: this.id };
    this.http
      .post<any>(this.api + 'menuItemPos/clearLockTable', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.sendMessage();
          history.back();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addToCart(menu: any, openPrice: number = 0) {
    if (menu.qty > 0) {
      const body = {
        id: this.id,
        menu: menu,
        price: this.model.price,
        openPrice: openPrice,
      };
      console.log(body);
      this.http
        .post<any>(this.api + 'menuItemPos/addToCart', body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.logService.logAction(
              'Add Menu ' +
                menu['name'] +
                '(' +
                menu['id'] +
                ') @' +
                menu['price'],
              this.id
            );
            this.reload();
          },
          (error) => {
            console.log(error);
            this.logService.logAction(
              'ERROR Add Menu ' +
                menu['name'] +
                '(' +
                menu['id'] +
                ') @' +
                menu['price'],
              this.id
            );
          }
        );

      if (openPrice == 1) {
        this.modalService.dismissAll();
      }
    }
  }

  updateQty() {
    const qty = this.model.newQty;
    const body = {
      model: this.model,
      item: this.item,
      cartId: this.id,
    };

    this.http
      .post<any>(this.api + 'menuItemPos/updateQty', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.modalService.dismissAll();
          this.model.newQty = 1;
          this.reload();
          if (data['warning']) {
            this.logService.logAction(
              'WARNING Add Qty ' + qty + ' ' + this.item['name'],
              this.id
            );
            alert(data['warning']);
          } else {
            this.logService.logAction(
              'Add Qty ' + qty + ' ' + this.item['name'],
              this.id
            );
          }
        },
        (error) => {
          console.log(error);
          this.logService.logAction(
            'ERROR Add Qty ' + qty + ' ' + this.item['name'],
            this.id
          );
        }
      );
  }

  updateCover() {
    const qty = this.model.newQty;
    const body = {
      model: this.model,
      cartId: this.id,
    };

    this.http
      .post<any>(this.api + 'menuItemPos/updateCover', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.table['cover'] = this.model.newQty;
          this.modalService.dismissAll();
        },
        (error) => {
          alert('ERROR');
          console.log(error);
        }
      );
  }

  fnChecked(index: number) {
    this.cart[index].checkBox == 0
      ? (this.cart[index].checkBox = 1)
      : (this.cart[index].checkBox = 0);

    // Jika parent di-check (checkBox == 1), semua modifier anak juga di-check
    if (
      this.cart[index].checkBox == 1 &&
      Array.isArray(this.cart[index].modifier)
    ) {
      this.cart[index].modifier.forEach((el: { checkBox: number }) => {
        el.checkBox = 1;
      });
    } else if (Array.isArray(this.cart[index].modifier)) {
      this.cart[index].modifier.forEach((el: { checkBox: number }) => {
        el.checkBox = 0;
      });
    }
  }

  fnCheckedModifier(index: number, subIndex: number) {
    if (
      this.cart[index].modifier[subIndex].sendOrder == '' ||
      this.cart[index].modifier[subIndex].allowVoid == 1
    ) {
      this.cart[index].modifier[subIndex].checkBox == 0
        ? (this.cart[index].modifier[subIndex].checkBox = 1)
        : (this.cart[index].modifier[subIndex].checkBox = 0);
      // check apakah ada modifier yang di-check
      let isModifierChecked = this.cart[index].modifier.some(
        (mod: { checkBox: number }) => mod.checkBox == 1
      );
      console.log(isModifierChecked);
    }
  }

  onVoid() {
    this.isChecked = false;
    // bisa buatkan coding untuk mengecek apakah ada item yang di-check dan anak modifiernya juga di-check
    this.checkIfAnyItemChecked();

    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      if (confirm('Are you sure  void this select items ?')) {
        console.log(this.cart);
        this.logService.logAction('Void item ', this.id);
        this.loading = true;
        const body = {
          cart: this.cart,
          cartId: this.id,
          posMode: this.configService.getConfigJson()['outlet']['posMode'],
        };
        const url = this.api + 'menuItemPos/voidItem';
        this.http
          .post<any>(url, body, {
            headers: this.configService.headers(),
          })
          .subscribe(
            (data) => {
              console.log(data);
              this.reload();
            },
            (error) => {
              console.log(error);
              this.logService.logAction('ERROR Void item ', this.id);
            }
          );
      }
    }
  }

  fnCustomNotes() {
    this.isChecked = false;
    // bisa buatkan coding untuk mengecek apakah ada item yang di-check dan anak modifiernya juga di-check
    this.checkIfAnyItemChecked();
    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
    }
  }

  addToItemModifier(a: any) {
    this.isChecked = false;
    // bisa buatkan coding untuk mengecek apakah ada item yang di-check dan anak modifiernya juga di-check
    this.checkIfAnyItemChecked();
    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      this.loading = true;
      const body = {
        cart: this.cart,
        cartId: this.id,
        modifiers: a,
      };
      console.log(body);
      const url = this.api + 'menuItemPos/addToItemModifier';
      this.http
        .post<any>(url, body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.logService.logAction(
              'Add Modifier ' + a['descs'] + '(' + a['id'] + ') @' + a['price'],
              this.id
            );
            this.reload();
            this.results = data['results'];
          },
          (error) => {
            console.log(error);
            this.logService.logAction(
              'ERROR Add Modifier ' +
                a['descs'] +
                '(' +
                a['id'] +
                ') @' +
                a['price'],
              this.id
            );
          }
        );
    }
  }

  addDiscountGroupWithRemark(content: any, a: any) {
    this.isChecked = false;
    // bisa buatkan coding untuk mengecek apakah ada item yang di-check dan anak modifiernya juga di-check
    this.checkIfAnyItemChecked();
    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      this.discountGroupSelect = a;
      const modalRef = this.modalService.open(content, { size: 'md' });
      setTimeout(() => {
        this.remarkInputRef?.nativeElement.focus();
      }, 300);
    }
  }

  addDiscountGroup(a: any) {
    this.isChecked = false;
    let access = false;
    this.checkIfAnyItemChecked();

    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      //  access = true;
    }

    console.log(this.cart);
    outer: for (let i = 0; i < this.cart.length; i++) {
      const mods = this.cart[i]['modifier'] || [];
      for (let j = 0; j < mods.length; j++) {
        if (mods[j]['applyDiscount'] == 1) {
          // jika user menolak, keluar dari fungsi dan jangan jalankan if(access) di bawah
          if (
            !confirm(
              'A discount has already been applied. Do you want to proceed?'
            )
          ) {
            return;
          }
          // jika user setuju, set access dan keluar dari kedua loop untuk melanjutkan ke if(access)
          access = true;
          break outer;
        }
      }
    }

    // Jika tidak ada applyDiscount yang bernilai 1, set access ke true
    if (!access) {
      access = true;
    }

    if (access) {
      this.loading = true;
      const body = {
        cart: this.cart,
        remark: this.remark,
        cartId: this.id,
        discountGroup: a,
      };
      console.log(body);
      const url = this.api + 'menuItemPos/addDiscountGroup';
      this.http
        .post<any>(url, body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.remark = '';
            this.modalService.dismissAll();
            console.log(data);
            this.reload();
            this.results = data['results'];
            this.logService.logAction(
              'Apply Discount Group ' +
                a['name'] +
                '(' +
                a['id'] +
                ') @' +
                a['discRate'] +
                '%',
              this.id
            );
          },
          (error) => {
            console.log(error);
            this.logService.logAction(
              'ERROR Apply Discount Group ' +
                a['name'] +
                '(' +
                a['id'] +
                ') @' +
                a['discRate'] +
                '%',
              this.id
            );
          }
        );
    }
  }

  sendOrder() {
    this.loading = true;
    const body = {
      cartId: this.id,
      tableSendOrder: this.table.sendOrder,
    };
    if (this.cart.length == 0) {
      alert('Cart is empty');
    } else {
      const url = this.api + 'menuItemPos/sendOrder';
      this.http
        .post<any>(url, body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.logService.logAction('Send Order & Print Queue', this.id);
            if(data['printQueue'] && data['printQueue'].length > 0){ 
           
               this.tableCheckerDetail(data['sendOrder']);
            }else{
                this.back();
            }
           
          },
          (error) => {
            console.log(error);
            this.logService.logAction('ERROR Send Order', this.id);
          }
        );
    }
  }

  tableCheckerDetail(so: string) {
    this.http
      .get(this.api + 'menuItemPos/tableCheckerDetail', {
           headers: this.configService.headers(),
        params: {
          so: so,
        },
        responseType: 'text',
      })
      .subscribe(
        (data) => { 
          this.fnDirectPrint(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  


 
  fnDirectPrint(htmlBill: string) {
    const a = this.modalService.open(this.modalInfoPrinting, { size: 'md' });
    // a.result.finally(() => {
    //   this.back();
    // });
 

    this.printNote = "Printing, please wait...";
    console.log("fnDirectPrint", htmlBill);
    this.printLoading = true;
    const config = this.configService.getConfigJson();
    const body = {
      message: htmlBill,
      printer: config.printer,
    };

    this.http
      .post(this.api + 'printing/print', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
             this.modalService.dismissAll();
          this.printNote = 'Print Success';
          this.printLoading = false;
           this.back();
        },
        (error) => {
          this.printNoteError = true;
          this.printLoading = false;
          console.log(error);
          this.printNote = 'ERROR ' + error.error.detail; 
          this.modalService.dismissAll();
           
        }
      );
  }

  exitWithoutOrder() {
    const body = {
      cartId: this.id,
    };
    const url = this.api + 'menuItemPos/exitWithoutOrder';
    this.http
      .post<any>(url, body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.logService.logAction('Exit Without Order', this.id);
          console.log(data);
          this.back();
        },
        (error) => {
          console.log(error);
          this.logService.logAction('ERROR Exit Without Order', this.id);
        }
      );
  }

  onVoidTransaction() {
    // if (confirm('Are you sure  void this transaction ?')) {
    //   const body = {
    //     cartId: this.id,
    //   };
    //   const url = this.api + 'menuItemPos/voidTransacton';
    //   this.http
    //     .post<any>(url, body, {
    //       headers: this.configService.headers(),
    //     })
    //     .subscribe(
    //       (data) => {
    //         this.logService.logAction('Exit Without Order', this.id);
    //         console.log(data);
    //         this.back();
    //       },
    //       (error) => {
    //         console.log(error);
    //         this.logService.logAction('ERROR Exit Without Order', this.id);
    //       }
    //     );
    // }
    this.router
      .navigate(['void'], { queryParams: { id: this.id , module:'menuItemPos', action:'voidTransaction'} })
      .then(() => {
        this.modalService.dismissAll();
      });
  }

  payment() {
    this.logService.logAction('Click PAYMENT', this.id);
    this.loading = true; 
    const body = {
      id: this.id,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'payment/submit', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          console.log(data);
          //history.back();
          //  setTimeout(() => {
          this.router.navigate(['payment'], { queryParams: { id: this.id } });
          // }, 500);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  printToKitchen() {
    window.open(this.api + 'printQueue?cartId=' + this.id);
  }

  fnTableChecker(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.http
      .get<any>(this.api + 'menuItemPos/tableChecker', {
        params: {
          id: this.id,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.sendOrderItems = data['data'];
        },
        (error) => {
          console.log(error);
        }
      );
  }
  isSO : string = '';
  printTableChecker(so: string) {
    this.isSO = so;
    this.http
      .get(this.api + 'menuItemPos/tableCheckerDetail', {
        params: {
          so: so,
        },
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          this.questCheckTemp = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fnPrint() {
    this.printNoteError = false;
    this.printNote = '';
    this.printLoading = true;
    const body = {
      id: this.id,
      printer: {
        address: this.configService.getConfigJson()['printer']['address'],
        port: this.configService.getConfigJson()['printer']['port'],
      },
      message: this.questCheckTemp,
    };
    this.printNote = 'Printing, please wait...';
    this.http
      .post(this.api + 'printing/print', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.printNote = 'Print Success';
          this.printLoading = false;
        },
        (error) => {
          this.printNoteError = true;
          this.printLoading = false;
          console.log(error);
          this.printNote = 'ERROR ' + error.error.detail;
        }
      );
  }

  handleData(data: string) {
    let newQty = this.model.newQty.toString();
    if (data == 'b') {
      newQty = newQty.slice(0, -1);
    } else {
      newQty = newQty + data;
    }
    this.model.newQty = parseInt(newQty || '0'); // fallback kalau cover kosong
  }

  handleDataOpenPrice(data: string) {
    let newPrice = this.model.price.toString();
    if (data == 'b') {
      newPrice = newPrice.slice(0, -1);
    } else {
      newPrice = newPrice + data;
    }
    this.model.price = parseInt(newPrice || '0'); // fallback kalau cover kosong
  }

  transferItems() {
    this.logService.logAction('menu/transferItems', this.id);
    this.router
      .navigate(['menu/transferItems'], { queryParams: { id: this.id } })
      .then(() => {
        this.modalService.dismissAll();
      });
  }

  transferItemsGroup() {
    this.logService.logAction('menu/transferItemsGroup', this.id);
    this.router
      .navigate(['menu/transferItemsGroup'], { queryParams: { id: this.id } })
      .then(() => {
        this.modalService.dismissAll();
      });
  }

  transferLog() {
    this.logService.logAction('Popup transfer Log', this.id);
    const modalRef = this.modalService.open(TransferLogComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.cartId = this.id;
  }
  mergerLog() {
    this.logService.logAction('Popup transfer Log', this.id);
    const modalRef = this.modalService.open(MergerLogComponent, { size: 'lg' });
    modalRef.componentInstance.cartId = this.id;
  }

  takeOut() {
    this.isChecked = false;
    // bisa buatkan coding untuk mengecek apakah ada item yang di-check dan anak modifiernya juga di-check
    this.checkIfAnyItemChecked();
    if (this.isChecked == false) {
      alert('Please check item first!');
    } else {
      let cart: any[] = [];
      this.cart.forEach((el: any) => {
        if (el['checkBox'] == 1) {
          cart.push(el);
        }
      });

      console.log(this.cart);

      this.loading = true;
      const body = {
        cart: cart,
        cartId: this.id,
      };
      const url = this.api + 'menuItemPos/takeOut';
      this.http
        .post<any>(url, body, {
          headers: this.configService.headers(),
        })
        .subscribe(
          (data) => {
            this.logService.logAction('Item TA ' + cart.length, this.id);
            console.log(data);
            this.reload();
          },
          (error) => {
            console.log(error);
            this.logService.logAction('ERROR Item TA' + cart.length, this.id);
          }
        );
    }
  }

  httpTables() {
    this.modalService.dismissAll();
    this.loading = true;
    const url = this.api + 'tableMap';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          outletId: this.configService.getConfigJson()['outlet']['id'],
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          console.log('httpTables', data);
          this.tablesMaps = data['items'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openTables(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }
  onMap(index: number) {
    localStorage.setItem('pos3.onMap', index.toString());
    this.current = index;
  }

  mergerCheck(x: any) {
    console.log(x);

    if (x.cardId != '' && x.cardId != this.table['id']) {
      this.logService.logAction(
        'Merge table with ' + x.tableName + ' ?',
        this.id
      );
      if (confirm('Merge table with ' + x.tableName + ' ?')) {
        this.loading = true;
        const body = {
          cartId: this.id,
          table: this.table,
          newTable: x,
          dailyCheckId: this.configService.getDailyCheck(),
        };
        console.log(body);
        const url = this.api + 'menuItemPos/mergerCheck';
        this.http
          .post<any>(url, body, {
            headers: this.configService.headers(),
          })
          .subscribe(
            (data) => {
              console.log(data);
              this.back();
              this.logService.logAction(
                'Merge to table :' + x.tableName,
                this.id
              );
            },
            (error) => {
              console.log(error);
              this.logService.logAction(
                'ERROR Merge to table :' + x.tableName,
                this.id
              );
            }
          );
      }
    } else {
      alert('Please select active table');
    }
  }

  changeTable(x: any) {
    console.log('changeTable', x);

    if (x.cardId == '' && x.tableMapStatusId == '1') {
      this.logService.logAction(
        'Change table with ' + x.tableName + ' ?',
        this.id
      );
      if (confirm('Change table with ' + x.tableName + ' ?')) {
        this.loading = true;
        const body = {
          cartId: this.id,
          table: this.table,
          newTable: x,
          dailyCheckId: this.configService.getDailyCheck(),
        };
        console.log(body);
        const url = this.api + 'menuItemPos/changeTable';
        // buatkah http.post disini
        this.http
          .post<any>(url, body, {
            headers: this.configService.headers(),
          })
          .subscribe(
            (data) => {
              console.log(data);
              this.back();
              this.logService.logAction(
                'Change to table :' + x.tableName,
                this.id
              );
            },
            (error) => {
              alert("ERROR changing table, please try again");
              console.log(error);
              this.logService.logAction(
                'ERROR Change to table :' + x.tableName,
                this.id
              );
            }
          );
      } else {
        alert('Please select available table');
      }
    }
  }

  fnDeleteItems(item: any) {}

  checkIfAnyItemChecked() {
    // Checks if any item or its modifiers are checked in cart
    let checked = false;
    for (const item of this.cart) {
      if (item.checkBox == 1) {
        checked = true;
        break;
      }
      if (Array.isArray(item.modifier)) {
        if (item.modifier.some((mod: any) => mod.checkBox == 1)) {
          checked = true;
          break;
        }
      }
    }

    this.isChecked = checked;
  }

  selectItemOpenPrice: any = [];
  modalOpenPrice(content: any, menu: any) {
    this.selectItemOpenPrice = menu;
    this.model.price = menu.price;
    this.modalService.open(content);
  }

  onVoidItem() {
    this.router.navigate(['menu/voidItem'], { queryParams: { id: this.id } });
  }
}
