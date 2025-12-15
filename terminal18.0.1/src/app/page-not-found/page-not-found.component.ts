import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  constructor(public lang: LanguageService) {}
}
