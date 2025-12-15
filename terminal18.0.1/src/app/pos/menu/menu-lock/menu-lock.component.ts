import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-menu-lock',
  standalone: true,
  imports: [],
  templateUrl: './menu-lock.component.html',
  styleUrl: './menu-lock.component.css'
})
export class MenuLockComponent {
  constructor(private router: Router, public lang: LanguageService) {}

  back(){
    this.router.navigate(['tables']);
  }
}
