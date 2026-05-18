# FEATURE-ADMIN.md

Dokumen ini adalah panduan singkat fitur admin untuk user operasional. Isinya dibuat seperti buku cerita pendek: lihat gambarnya, pahami tujuannya, lalu ikuti alur penggunaannya. Acuan menu mengikuti [Route Map](AGENT-ADMIN.md#2-route-map-frontend) di [AGENT-ADMIN.md](AGENT-ADMIN.md).

## Cara Membaca

1. Buka bagian modul yang ingin dipelajari.
2. Lihat gambar layar yang tersedia.
3. Baca penjelasan singkat di bawah gambar.
4. Jika sebuah halaman tidak ada di sini, berarti belum ada screenshot atau fitur itu sudah tidak dipakai lagi di real case.

## 1. Employee Management

Bagian ini dipakai saat admin ingin mengurus data karyawan dan hak aksesnya. Gambarnya membantu Anda mengenali halaman yang harus dibuka.

### Halaman daftar karyawan

![Daftar karyawan](screenshot/2.1%20Employee%20Management/employee.jpg)

Route: `/employee`

Gunanya untuk melihat daftar karyawan, menambah data baru, dan mengubah data karyawan yang sudah ada.

### Halaman level akses

![Level akses karyawan](screenshot/2.1%20Employee%20Management/employee-authLevel.jpg)

Route: `/employee/authLevel`

Gunanya untuk mengatur level atau peran akses karyawan.

### Halaman hak akses fitur

![Hak akses fitur](screenshot/2.1%20Employee%20Management/employee-authLevel-accessRight.jpg)

Route: `/employee/authLevel/accessRight`

Gunanya untuk menentukan fitur apa saja yang boleh dibuka oleh level tersebut.

## 2. Daily Schedule & Holiday

Bagian ini dipakai untuk mengatur jam operasional harian.

### Halaman jam operasional

![Jam operasional](screenshot/2.2%20Daily%20Schedule%20%26%20Holiday/dailySchedule.jpg)

Route: `/dailySchedule`

Gunanya untuk mengatur jam buka dan jam tutup restoran.

## 3. Payment Configuration

Bagian ini dipakai untuk mengatur cara pembayaran di sistem.

### Jenis pembayaran

![Jenis pembayaran](screenshot/2.3%20Payment%20Configuration/payment-paymentType.jpg)

Route: `/payment/paymentType`

Gunanya untuk mengatur jenis pembayaran seperti cash atau card.

### Kelompok pembayaran

![Kelompok pembayaran](screenshot/2.3%20Payment%20Configuration/payment-paymentGroup.jpg)

Route: `/payment/paymentGroup`

Gunanya untuk mengelompokkan jenis pembayaran.

### Jenis uang cash

![Jenis uang cash](screenshot/2.3%20Payment%20Configuration/payment-cashType.jpg)

Route: `/payment/cashType`

Gunanya untuk mengatur pecahan atau jenis uang cash.

### Jenis pajak

![Jenis pajak](screenshot/2.3%20Payment%20Configuration/payment-taxType.jpg)

Route: `/payment/taxType`

Gunanya untuk mengatur jenis pajak dan tarifnya.

## 4. Discount & Promotion

Bagian ini dipakai untuk mengatur promo dan diskon.

### Kelompok diskon

![Kelompok diskon](screenshot/2.4%20Discount%20%26%20Promotion/discount-discGroup.jpg)

Route: `/discount/discGroup`

Gunanya untuk mengelompokkan aturan diskon.

### Diskon utama

![Diskon utama](screenshot/2.4%20Discount%20%26%20Promotion/discount.jpg)

Route: `/discount`

Gunanya untuk mengatur diskon utama yang dipakai di sistem.

## 10. Workstation

Bagian ini dipakai untuk mengatur perangkat kerja seperti printer dan terminal.

### Printer

![Printer](screenshot/2.10%20Workstation/workStation-printer.jpg)

Route: `/workStation/printer`

Gunanya untuk mengatur data printer.

### Kelompok printer

![Kelompok printer](screenshot/2.10%20Workstation/workStation-printerGroup.jpg)

Route: `/workStation/printerGroup`

Gunanya untuk mengelompokkan printer.

### Terminal POS

![Terminal POS](screenshot/2.10%20Workstation/workStation-terminal.jpg)

Route: `/workStation/terminal`

Gunanya untuk mendaftarkan terminal POS yang dipakai.

## 11. Outlet Management

Bagian ini dipakai untuk mengatur data outlet atau cabang.

### Daftar outlet

![Daftar outlet](screenshot/2.11%20Outlet%20Management/outlet.jpg)

Route: `/outlet`

Gunanya untuk melihat outlet yang terdaftar di sistem.

### Detail outlet

![Detail outlet](screenshot/2.11%20Outlet%20Management/outlet-detail.jpg)

Route: detail outlet dari halaman outlet

Gunanya untuk melihat atau mengubah detail outlet.

## 12. Menu Configuration

Bagian ini dipakai untuk mengatur menu makanan dan struktur kategorinya.

### Item menu

![Item menu](screenshot/2.12%20Menu%20Configuration/menu-item.jpg)

Route: `/menu/item`

Gunanya untuk mengatur data item menu.

### Department menu

![Department menu](screenshot/2.12%20Menu%20Configuration/menu-department.jpg)

Route: `/menu/department`

Gunanya untuk mengatur department menu.

### Kategori menu

![Kategori menu](screenshot/2.12%20Menu%20Configuration/menu-category.jpg)

Route: `/menu/category`

Gunanya untuk mengatur kategori menu.

### Struktur menu

![Struktur menu](screenshot/2.12%20Menu%20Configuration/menu-lookup.jpg)

Route: `/menu/lookUp`

Gunanya untuk melihat struktur menu dalam bentuk tree.

### Tambah item ke struktur menu

![Tambah item menu](screenshot/2.12%20Menu%20Configuration/menu-lookup-add-item.jpg)

Route: `/menu/lookUp`

Gunanya untuk menambahkan item ke dalam struktur menu.

## 13. Modifiers

Bagian ini dipakai untuk mengatur pilihan tambahan pada menu.

### Modifier utama

![Modifier utama](screenshot/2.13%20Modifiers/modifier.jpg)

Route: `/modifier`

Gunanya untuk mengatur modifier utama.

### Kelompok modifier

![Kelompok modifier](screenshot/2.13%20Modifiers/modifier-group.jpg)

Route: `/modifier/group`

Gunanya untuk mengelompokkan modifier.

## 15. Table Map & Floor Plan

Bagian ini dipakai untuk mengatur meja dan tampilan denah ruangan.

### Table map

![Table map](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/tableMap.jpg)

Route: `/tableMap`

Gunanya untuk mengatur posisi dan data meja.

### Icon atau template meja

![Template meja](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/tableMap-template-icon.jpg)

Route: `/tableMap/template`

Gunanya untuk mengatur icon atau template meja.

### Floor plan

![Floor plan](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/floorMap.jpg)

Route: `/floorMap`

Gunanya untuk mengatur gambar dan layout floor plan.

## 16. Cashback & UX Configuration

Bagian ini dipakai untuk pengaturan cashback, tampilan tombol, dan bahasa.

### Cashback

![Cashback](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/cashback.jpg)

Route: `/cashback`

Gunanya untuk mengatur program cashback.

### Detail cashback

![Detail cashback](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/cashback-detail.jpg)

Route: `/cashback/detail`

Gunanya untuk melihat dan mengubah detail cashback.

### UX

![UX](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/ux.jpg)

Route: `/ux`

Gunanya untuk mengatur fungsi atau tombol untuk user.

### Bahasa

![Bahasa](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/global-language.jpg)

Route: `/language`

Gunanya untuk mengatur bahasa atau label tampilan.

## Report

Bagian report belum saya tulis di sini karena belum ada screenshot di folder saat ini.

## Catatan Singkat

- Jika ada halaman yang tidak muncul di menu real case, berarti halaman tersebut legacy atau sudah tidak dipakai lagi.
- Jika nanti ada screenshot baru, bagian dokumen ini bisa ditambah tanpa mengubah format utama.
