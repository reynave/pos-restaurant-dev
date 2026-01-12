import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage: string = localStorage.getItem('pos3.language') || 'en';
  language: any = JSON.parse(localStorage.getItem('pos3.languageData') || '{}');
  constructor() { }


  get(name: string) {
    return this.language[this.currentLanguage][name] || name;
  }

  updateLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  getSelectLanguage(){
    return this.currentLanguage;
  }

  reportLabel(){
    return {
      company: this.get('PT. Mitrasys Bisnis Sinergi (FOR DEMO ONLY)'),
      endOfReport : this.get('<< End of Report >>'),
      footer: this.get('PT. Mitrasys Bisnis Sinergi (FOR DEMO ONLY) is licensed to use this program')
    }
  }

}
