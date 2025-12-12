import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderMenuComponent } from '../header/header-menu/header-menu.component';
import { UserLoggerService } from '../service/user-logger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderMenuComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit, OnDestroy {
  config: any = [];
  printTest: string = `Test`;
  printTestGlobal: string = `Global Test`;
  restPrinter: string = '';
  loading: boolean = false;
  terminal: any = [];
  keyLicense: any = {};
  api: string = '';
  timerLogoff: number = 30;
  checkTotal: number = 0;
  isCheckAll: number = 0;
  note1: string = '';
  restPrinterGlobal: string = '';
  itemsPrinter: any = [];

  private printerLogIntervalId: any;
  constructor(
    public configService: ConfigService,
    public logService: UserLoggerService,
    private http: HttpClient,
    public lang: LanguageService
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.printerLogIntervalId);
  }
  ngOnInit(): void {
    this.timerLogoff =
      parseInt(localStorage.getItem('pos3.inactivityTimeout') || '30000') /
      1000;
    this.api = this.configService.getApiUrl();
    this.config = this.configService.getConfigJson();
    this.httpCheckKey();
    this.httpGetPrinters();
    this.httpGetPrintersLogs();
    this.printerLogIntervalId = setInterval(() => {
      this.httpGetPrintersLogs();
    }, 4000);
  }
  back() {
    history.back();
  }

  httpGetPrinters() {
    const url = this.api + 'printing/viewPrinters';
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log(data);
        this.itemsPrinter = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  printerGlobalLogs: any = [];
  httpGetPrintersLogs() {
    const url = this.api + 'printing/viewPrintersLogs';
    this.http
      .get<any>(url, {
        headers: this.configService.headers(),
        params: {
          dailyCheckId: this.configService.getDailyCheck(),
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.printerGlobalLogs = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkBoxAll() {
    if (this.isCheckAll == 0) this.isCheckAll = 1;
    else this.isCheckAll = 0;

    this.checkTotal = this.isCheckAll;
    for (let i = 0; i < this.itemsPrinter.length; i++) {
      this.itemsPrinter[i]['checkBox'] = this.isCheckAll;
    }
  }
  fnCheck(index: number) {
    this.itemsPrinter[index].checkBox == 0
      ? (this.itemsPrinter[index].checkBox = 1)
      : (this.itemsPrinter[index].checkBox = 0);

    this.checkTotal = 0;
    this.itemsPrinter.forEach((el: any) => {
      if (el['checkBox'] == 1) {
        this.checkTotal += 1;
      }
    });
  }
  onUpdatePrinter() {
    this.logService.logAction('Update Printer');
  }

  onTestPrinting() {
    this.loading = true;
    this.logService.logAction(
      'Test printing ' +
        this.config['printer']['address'] +
        ':' +
        this.config['printer']['port']
    );

    this.restPrinter = 'Connecting printer...';
    const body = {
      printer: this.config['printer'],
      note: this.printTest,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'printing/test', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.restPrinter = 'Success print';
          this.logService.logAction('Success print');
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.restPrinter = error['error']['detail'];
          this.logService.logAction(
            'ERROR test printing ' + error['error']['detail']
          );
          this.loading = false;
        }
      );
  }

  httpCheckKey() {
    if (localStorage.getItem('pos3.terminal.mitralink')) {
      const url = this.api + 'login/checkTerminal';
      this.http
        .get<any>(url, {
          params: {
            address: localStorage.getItem('pos3.address.mitralink') ?? '',
            terminalId: localStorage.getItem('pos3.terminal.mitralink') ?? '',
          },
        })
        .subscribe(
          (data) => {
            this.terminal = data;
            this.keyLicense = data['keyLicense'];
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  update1() {
    const timerdata = this.timerLogoff * 1000;
    localStorage.setItem('pos3.inactivityTimeout', timerdata.toString());
    this.note1 = 'Saved';
  }

  globalPrinter() {
    this.loading = true;
    this.logService.logAction('Global Test printing to selected printers');
    const body = {
      message: this.printTestGlobal,
      printers: this.itemsPrinter.filter((el: any) => el['checkBox'] == 1),
      dailyCheckId: this.configService.getDailyCheck(),
      userId: this.terminal['userId'] || 1,
    };
    console.log(body);
    this.http
      .post<any>(this.api + 'printing/printQueue', body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.restPrinterGlobal = 'Success print to global printers';
          this.logService.logAction('Success print to global printers');
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.restPrinterGlobal = error['error']['detail'];
          this.logService.logAction(
            'ERROR global test printing ' + error['error']['detail']
          );
          this.loading = false;
        }
      );
  }

  getSelectLanguage() {
    return this.lang.getSelectLanguage();
  }
  langLoading: boolean = false;
  setLanguage(lang: string) {
    this.langLoading = true;
    this.http
      .get<any>(this.api + 'language', {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          // json to stringify
          const languages = JSON.stringify(data);
          localStorage.setItem('pos3.languageData', languages);
          this.langLoading = false;
        },
        (error) => {
          console.log(error);
          this.langLoading = false;
          alert('Error loading language data');
        }
      );
    this.lang.updateLanguage(lang);
    localStorage.setItem('pos3.language', lang);
  }
}
