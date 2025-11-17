import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../service/config.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-ux',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './ux.component.html',
  styleUrls: ['./ux.component.css'],
})
export class UxComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  items: any[] = [];
  api: string = environment.api + 'global/uxFunction'; // URL API
  itemsTemp: any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    public configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.httpGet();
  }

  ngAfterViewInit(): void {
    this.initializeSortable();
  }

  // Fetch data from API
  httpGet() {
    this.loading = true;
    this.http
      .get<any>(this.api, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.items = data['items'];
          this.itemsTemp = [...this.items]; // Simpan salinan awal
          this.modalService.dismissAll();
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
  }

  // Initialize jQuery UI Sortable
  initializeSortable() {
    console.log('jQuery version:', $.fn.jquery); // Periksa versi jQuery
    console.log('jQuery UI loaded:', typeof $.fn.sortable === 'function'); // Periksa apakah sortable tersedia

    var self = this;
    $(function () {
      $('#sortable').sortable({
        axis: 'y',
        placeholder: 'ui-state-highlight',
        handle: '.handle',
        update: function (event: any, ui: any) {
          const order: any[] = [];
          $('.handle').each((index: number, element: any) => {
            const itemId = $(element).data('id');
            order.push(itemId);
          });
          const body = {
            order: order,
          };
          console.log(body);
          self.onSaveOrder(order);
        },
      });
    });
  }
  checkboxAll: number = 0;
  checkAll() {
    if (this.checkboxAll == 0) {
      this.checkboxAll = 1;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['status'] = 1;
      }
    } else if (this.checkboxAll == 1) {
      this.checkboxAll = 0;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['status'] = 0;
      }
    }
  }
  // Save the new order
  onSaveOrder(order: any) {
    console.log('Saved Order:', this.items);
    // Kirim data ke server jika diperlukan
    const url = `${this.api}/onSaveOrder`;
    const body = {
      order : order
    };
    this.http
      .post<any>(url, body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log('Order saved successfully:', data);
        },
        (error) => {
          console.error('Error saving order:', error);
        }
      );
  }

  // Save the new order
  onSave() {
   
    const url = `${this.api}/onSaveStatus`;
    const body = {
      items : this.items
    };
    this.http
      .post<any>(url, body, {
        headers: this.configService.headers(),
      })
      .subscribe(
        (data) => {
          console.log('Order saved successfully:', data);
        },
        (error) => {
          console.error('Error saving order:', error);
        }
      );
  }

  // Cancel changes and reload data
  cancel() {
    this.items = [...this.itemsTemp]; // Reset ke urutan awal
    this.initializeSortable(); // Reinitialize sortable
  }
}
