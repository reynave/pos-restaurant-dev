import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private inactivityTimer: any;
  private readonly inactivityTimeout = parseInt(localStorage.getItem('pos3.inactivityTimeout') || '30000')  ; // 30 detik
  public inactivityDetected$ = new Subject<void>(); // Observable untuk mendeteksi ketidakaktifan

  constructor(private ngZone: NgZone) {}

  startMonitoring(): void {
    this.resetInactivityTimer();

    // Tambahkan event listener untuk aktivitas pengguna
    ['mousemove', 'keydown', 'click'].forEach((event) => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  private resetInactivityTimer(): void {
    this.clearInactivityTimer();
    this.ngZone.runOutsideAngular(() => {
      this.inactivityTimer = setTimeout(() => {
        this.ngZone.run(() => {
          this.inactivityDetected$.next(); // Emit event jika tidak ada aktivitas
        });
      }, this.inactivityTimeout);
    });
  }

  private clearInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }
}