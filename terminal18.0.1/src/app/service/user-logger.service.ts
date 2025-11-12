import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoggerService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  logAction(action: string, cartId : string = '') {

    const timezoneOffset = parseInt(localStorage.getItem("pos3.timezone") || '7'); // Set your desired timezone offset here
    const logData = {
      actionDate : new Date(new Date().getTime() + (timezoneOffset * 60 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' '),
      bill : cartId,
      action : action,
      dailyCheckId : this.configService.getDailyCheck(),
      actionBy : this.configService.getTokenJson()['name'],
      actionId :  this.configService.getTokenJson()['id'],
      actionRelated : '',
      terminalId : localStorage.getItem( this.configService.nameOfterminal()), 
      outletId : this.configService.getConfigJson()['outlet']['id'],  
      url: window.location.href
    };

    this.http.post<any>(this.configService.getApiUrl() + 'log', logData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
