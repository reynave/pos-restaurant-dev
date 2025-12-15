import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-factory',
  standalone: true,
  imports: [],
  templateUrl: './factory.component.html',
  styleUrl: './factory.component.css'
})
export class FactoryComponent {
  constructor(
      private router: Router,
      public lang: LanguageService,
    ) { }
    
  resetdata() {
    localStorage.clear();
    setTimeout(()=>{
        this.router.navigate(['/']).then(()=>{
           location.reload();
        });
    },200)
  }

}
