import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lock',
  standalone: true,
  imports: [],
  templateUrl: './menu-lock.component.html',
  styleUrl: './menu-lock.component.css'
})
export class MenuLockComponent {
  constructor(private router: Router) {}

  back(){
    this.router.navigate(['tables']);
  }
}
