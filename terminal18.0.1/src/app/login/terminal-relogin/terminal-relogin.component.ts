import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-terminal-relogin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terminal-relogin.component.html',
  styleUrl: './terminal-relogin.component.css'
})
export class TerminalReloginComponent {
  constructor(public lang: LanguageService) {}
}
