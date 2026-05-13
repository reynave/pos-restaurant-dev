# USER DOC - POS TERMINAL (UNTUK KASIR)

Dokumen ini dibuat untuk operator kasir.
Bahasa dibuat sederhana, langkah dibuat pelan-pelan.

## Cara Pakai Dokumen Ini

Pilih salah satu:
1. Kalau sudah pernah pakai POS, baca bagian **CHEAT SHEET** dulu.
2. Kalau masih baru, baca dari **MODE TRAINING** sampai selesai.

---

## CHEAT SHEET (1 HALAMAN UNTUK KASIR)

### A. Buka Shift (2-3 menit)

1. Buka aplikasi POS.
2. Login.
3. Cek Daily Start.
4. Cek printer online.
5. Masuk TABLES.

### B. Ambil Order Sampai Bayar

1. Pilih meja.
2. New order.
3. Pilih menu.
4. Pilih modifier/discount jika ada.
5. Klik SEND ORDER.
6. Klik BILL.
7. Print BILL.
8. Klik PAYMENT.
9. Selesaikan pembayaran.
10. Print RECEIPT.

### C. Jika Salah Input

1. Salah item: VOID ITEM (wajib isi alasan).
2. Salah meja: CHANGE TABLE atau TRANSFER ITEMS.
3. Sudah terlanjur bayar: buka TRANSACTION, pilih receipt, VOID PAYMENT, isi alasan.

### D. Tutup Shift (Ringkas)

1. Pastikan semua transaksi selesai.
2. Cek tidak ada pesanan tertinggal.
3. Lakukan DAILY CLOSE sesuai SOP.
4. SIGN OFF jika selesai total.

---

## MODE TRAINING (LANGKAH DETAIL)

## 1. Tujuan Dokumen

Dokumen ini menjelaskan:
1. Cara masuk ke aplikasi POS.
2. Cara membuat order sampai bayar.
3. Cara pakai fitur utama di halaman kasir.
4. Cara membatalkan item atau transaksi dengan benar.

---

## 2. Alur Paling Sering Dipakai (Ringkas)

Urutan kerja harian kasir:
1. Terminal Setup.
2. Login.
3. Masuk Main Menu.
4. Pilih TABLES.
5. Buat order baru atau buka order aktif.
6. Pilih MENU, tambah item, kirim ke kitchen (SEND ORDER).
7. Buka BILL.
8. Print BILL.
9. PAYMENT.
10. RECEIPT.

---

## 3. Halaman Awal

### 3.1 Terminal Setup

Gunakan halaman ini saat pertama kali terminal dipasang atau ganti server.

Langkah:
1. Isi data koneksi terminal.
2. Simpan.
3. Lanjut ke LOGIN.

![Terminal Setup](screenshots/TERMINAL%20SETUP.jpg)

### 3.2 Login

Langkah:
1. Masukkan user dan password.
2. Klik login.
3. Jika berhasil, akan masuk ke Main Menu.

![Login](screenshots/login.jpg)

### 3.3 Daily Start

Jika sistem meminta daily start, lakukan sesuai prosedur toko.

![Daily Start](screenshots/daily-start.jpg)

---

## 4. Main Menu (Menu Utama)

Ini adalah halaman pusat kerja kasir.

![Main Menu](screenshots/main-menu.jpg)

### 4.1 Menu General

1. TABLES: mulai transaksi meja.
2. PRINT QUEUE: lihat antrian print yang masih menunggu.
3. SETTING: pengaturan printer lokal, printer server, dan lainnya.
4. ADJUST ITEM: atur batas qty item.
5. CUSTOMER DISPLAY: layar mirror untuk customer (mode tertentu).

#### PRINT QUEUE
![Print Queue](screenshots/printQueue.jpg)

#### SETTING
![Setting](screenshots/setting.jpg)

#### ADJUST ITEM
![Adjust Item](screenshots/items.jpg)

### 4.2 Menu Operation

1. TRANSACTION: cari transaksi yang sudah terjadi.
2. REPORTS: lihat laporan.
3. CASH: kas masuk/keluar.
4. USER LOGS: jejak aktivitas user.

#### TRANSACTION
![Transaction](screenshots/transaction.jpg)

#### TRANSACTION RECEIPT
![Transaction Receipt](screenshots/transaction-receipt.jpg)

#### REPORTS
![Reports](screenshots/reports.jpg)

#### REPORT SAMPLE
![Reports Sample](screenshots/reports-sample.jpg)

#### CASH
![Cash](screenshots/cash.jpg)

#### USER LOGS
![User Logs](screenshots/userLogs.jpg)

### 4.3 Menu System

1. SIGN OFF: keluar total, session user dihapus.
2. DAILY CLOSE: proses tutup harian.
3. LOG OFF: kembali ke standby terminal, session user tetap ada.

---

## 5. Fitur Utama Kasir: TABLES sampai PAYMENT

### 5.1 Masuk ke TABLES

1. Dari Main Menu, klik TABLES.
2. Pilih meja kosong untuk order baru, atau meja aktif untuk lanjut transaksi.

![Tables](screenshots/table.jpg)

### 5.2 Buka Order Baru

1. Pilih meja.
2. Klik new order.
3. Masuk ke halaman table menu.

![New Order](screenshots/new%20order.jpg)

### 5.3 Pilih Menu Makanan/Minuman

1. Pilih item menu.
2. Pilih modifier jika ada.
3. Pilih discount jika tersedia.

![Table Menu](screenshots/table-menu.jpg)

![Select Menu](screenshots/table-menu-select-menu.jpg)

![Select Modifier](screenshots/table-menu-select-modifier.jpg)

![Select Discount](screenshots/table-menu-select-discount.jpg)

### 5.4 Kirim Pesanan ke Kitchen

1. Setelah item benar, klik SEND ORDER.
2. Pastikan pesanan sudah terkirim.

![Table After Send Order](screenshots/table-after-send-order.jpg)

### 5.5 BILL dan PAYMENT

1. Klik BILL untuk lihat total.
2. Print BILL.
3. Klik PAYMENT untuk proses bayar.
4. Setelah selesai, cetak RECEIPT.

![Menu Bill](screenshots/menu-bill.jpg)

---

## 6. Penjelasan Tombol MENU FUNCTION (Penting)

Halaman ini berisi fungsi khusus saat menangani meja.

![Menu Function](screenshots/menu-function.jpg)

1. TRANSFER ITEMS
Pindah item pesanan ke meja kosong lain.

![Transfer Item Step 1](screenshots/menu-function-transfer-item-step1.jpg)
![Transfer Item Step 2](screenshots/menu-function-transfer-item-step2.jpg)
![Transfer Item Step 3](screenshots/menu-function-transfer-item-step3.jpg)

2. TRANSFER LOG
Lihat riwayat transfer item masuk/keluar.

![Transfer Log](screenshots/menu-function-transfer-item-log.jpg)

3. CHANGE TABLE
Pindah seluruh order ke meja kosong lain.

![Change Table](screenshots/menu-function-change-table.jpg)

4. TAKE OUT
Tandai pesanan menjadi bungkus/bawa pulang.

![Take Out](screenshots/menu-function-take-out.jpg)

5. EXIT WITHOUT ORDER
Keluar dari halaman menu meja tanpa simpan perubahan.

6. SEND ORDER
Kirim item yang dipilih ke kitchen.

7. VOID ITEM
Batalkan item pesanan. Wajib isi alasan.

![Void Item](screenshots/menu-function-void-item.jpg)
![Void Item Step 2](screenshots/menu-function-void-item-2.jpg)

8. CHANGE COVER
Ganti jumlah tamu di meja.

9. MERGER
Gabung meja dengan meja lain yang tersedia.

![Merger Table](screenshots/menu-function-merger-table.jpg)

10. MERGER LOG
Lihat riwayat penggabungan meja.

11. BILL
Lihat daftar tagihan pesanan.

12. PAYMENT
Masuk ke halaman pembayaran.

---

## 7. Cara Void Transaction yang Sudah Terjadi

Ikuti urutan ini:
1. Masuk ke menu TRANSACTION.
2. Buka halaman RECEIPT dari transaksi yang mau dibatalkan.
3. Tekan tombol VOID PAYMENT.
4. Isi alasan pembatalan.
5. Simpan.

Catatan:
1. Alasan wajib diisi.
2. Jangan lakukan void tanpa persetujuan atasan sesuai SOP toko.

---

## 8. Kesalahan yang Sering Terjadi (Versi Sederhana)

1. Lupa klik SEND ORDER.
Akibat: dapur tidak terima pesanan.
Solusi: kembali ke meja, cek item, klik SEND ORDER.

2. Langsung klik PAYMENT sebelum BILL.
Solusi: buka BILL dulu, print BILL, lalu PAYMENT.

3. Salah meja saat input order.
Solusi: gunakan CHANGE TABLE atau TRANSFER ITEMS sesuai kebutuhan.

4. Void tanpa alasan.
Solusi: isi alasan setiap void item/void payment.

---

## 9. Checklist Cepat Kasir

Checklist awal shift:
1. Login berhasil.
2. Daily start sudah benar.
3. Printer online.
4. Bisa buka TABLES.

Checklist sebelum tutup transaksi:
1. Semua item sudah SEND ORDER.
2. BILL sudah dicek.
3. PAYMENT sudah selesai.
4. RECEIPT sudah tercetak.

Checklist saat serah terima shift:
1. Tidak ada meja yang "menggantung" tanpa tindakan.
2. Semua void punya alasan.
3. Print queue tidak menumpuk.
4. User berikutnya tahu status terakhir kasir.

---

## 10. Script Training Siap Baca (Untuk Trainer)

Bagian ini bisa dibacakan langsung ke kasir baru.

### 10.1 Pembukaan (2 menit)

Kalimat trainer:
1. "Hari ini kita belajar cara pakai POS dari login sampai cetak receipt."
2. "Yang paling penting: jangan lupa SEND ORDER, dan setiap VOID wajib ada alasan."
3. "Kalau bingung, ikuti urutan TABLES -> MENU -> BILL -> PAYMENT -> RECEIPT."

### 10.2 Demo Alur Utama (10 menit)

Kalimat trainer:
1. "Sekarang klik TABLES dan pilih meja kosong."
2. "Klik new order, lalu pilih item menu."
3. "Jika ada modifier, pilih dulu. Jika ada discount, pilih sesuai aturan toko."
4. "Setelah yakin benar, klik SEND ORDER agar dapur menerima pesanan."
5. "Lanjut ke BILL, cek total, lalu print BILL."
6. "Setelah tamu siap bayar, klik PAYMENT dan selesaikan pembayaran."
7. "Terakhir, cetak RECEIPT dan pastikan transaksi selesai."

### 10.3 Demo Kesalahan Umum (8 menit)

Kalimat trainer:
1. "Jika salah item, pakai VOID ITEM dan isi alasan."
2. "Jika salah meja, pakai CHANGE TABLE atau TRANSFER ITEMS."
3. "Jika sudah terlanjur bayar tapi harus batal, masuk TRANSACTION lalu VOID PAYMENT dengan alasan jelas."

### 10.4 Penutupan (2 menit)

Kalimat trainer:
1. "Sebelum ganti shift, cek tidak ada order tertinggal."
2. "Pastikan semua payment selesai dan semua receipt penting sudah tercetak."
3. "Jika ada kendala, lapor supervisor sebelum SIGN OFF."

---

## 11. Latihan Kasir Baru (Praktek)

### Latihan 1: Order Normal

Target:
1. Kasir bisa buat order sampai selesai bayar.

Langkah latihan:
1. Login.
2. Pilih 1 meja kosong.
3. Input 2 item makanan + 1 minuman.
4. Klik SEND ORDER.
5. Print BILL.
6. PAYMENT sampai selesai.
7. Print RECEIPT.

Lulus jika:
1. Tidak ada langkah yang terlewat.
2. Receipt keluar dengan total sesuai bill.

### Latihan 2: Koreksi Salah Input

Target:
1. Kasir bisa memperbaiki kesalahan tanpa panik.

Langkah latihan:
1. Buat order baru.
2. Tambah item yang sengaja salah.
3. Lakukan VOID ITEM dan isi alasan.
4. Pindah meja menggunakan CHANGE TABLE.

Lulus jika:
1. Item salah berhasil dibatalkan.
2. Alasan void terisi.
3. Order berhasil pindah ke meja tujuan.

### Latihan 3: Void Payment

Target:
1. Kasir paham alur pembatalan transaksi yang sudah dibayar.

Langkah latihan:
1. Buka TRANSACTION.
2. Pilih receipt transaksi.
3. Klik VOID PAYMENT.
4. Isi alasan pembatalan.

Lulus jika:
1. Status transaksi berubah sesuai proses void.
2. Alasan tersimpan.

---

Dokumen ini akan diupdate lagi setelah flow final dan aturan role disepakati.
