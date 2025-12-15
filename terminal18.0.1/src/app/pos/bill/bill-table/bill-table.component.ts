import { Component, Input  } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LanguageService } from '../../../service/language.service';
 
@Component({
  selector: 'app-bill-table',
  standalone: true,
 imports: [  CommonModule],
  templateUrl: './bill-table.component.html',
  styleUrl: './bill-table.component.css'
})
export class BillTableComponent   {
  @Input() data: any  = [];
  @Input() showApplyDiscount: boolean  = false;
 
  constructor(public lang: LanguageService) {}

}
