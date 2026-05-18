# FEATURE-ADMIN.md

Dokumen ini menjelaskan fitur admin untuk user operasional. Penjelasan dibuat sederhana dan mengikuti urutan menu pada Route Map di [AGENT-ADMIN.md](AGENT-ADMIN.md).
 
## 1 Employee Management

Halaman ini dipakai untuk mengelola data karyawan dan hak aksesnya.

| Screenshot | Route | Fungsi |
|---|---|---|
| [employee.jpg](screenshot/2.1%20Employee%20Management/employee.jpg) | `/employee` | Daftar karyawan, tambah data, dan ubah data karyawan. |
| [employee-authLevel.jpg](screenshot/2.1%20Employee%20Management/employee-authLevel.jpg) | `/employee/authLevel` | Mengatur level atau peran akses karyawan. |
| [employee-authLevel-accessRight.jpg](screenshot/2.1%20Employee%20Management/employee-authLevel-accessRight.jpg) | `/employee/authLevel/accessRight` | Mengatur hak akses fitur untuk setiap level. |

## 2 Daily Schedule & Holiday

Halaman ini dipakai untuk mengatur jam operasional harian.

| Screenshot | Route | Fungsi |
|---|---|---|
| [dailySchedule.jpg](screenshot/2.2%20Daily%20Schedule%20%26%20Holiday/dailySchedule.jpg) | `/dailySchedule` | Mengatur jam buka dan jam tutup restoran. |

## 3 Payment Configuration

Halaman ini dipakai untuk mengatur jenis pembayaran dan komponen pembayaran.

| Screenshot | Route | Fungsi |
|---|---|---|
| [payment-paymentType.jpg](screenshot/2.3%20Payment%20Configuration/payment-paymentType.jpg) | `/payment/paymentType` | Mengatur jenis pembayaran seperti cash atau card. |
| [payment-paymentGroup.jpg](screenshot/2.3%20Payment%20Configuration/payment-paymentGroup.jpg) | `/payment/paymentGroup` | Mengelompokkan jenis pembayaran. |
| [payment-cashType.jpg](screenshot/2.3%20Payment%20Configuration/payment-cashType.jpg) | `/payment/cashType` | Mengatur pecahan atau jenis uang cash. |
| [payment-taxType.jpg](screenshot/2.3%20Payment%20Configuration/payment-taxType.jpg) | `/payment/taxType` | Mengatur jenis pajak dan tarifnya. |

## 4 Discount & Promotion

Halaman ini dipakai untuk mengatur promo dan diskon.

| Screenshot | Route | Fungsi |
|---|---|---|
| [discount-discGroup.jpg](screenshot/2.4%20Discount%20%26%20Promotion/discount-discGroup.jpg) | `/discount/discGroup` | Mengelompokkan aturan diskon. |
| [discount.jpg](screenshot/2.4%20Discount%20%26%20Promotion/discount.jpg) | `/discount` | Mengatur diskon utama yang dipakai di sistem. |

## 10 Workstation

Halaman ini dipakai untuk mengatur perangkat kerja seperti printer dan terminal.

| Screenshot | Route | Fungsi |
|---|---|---|
| [workStation-printer.jpg](screenshot/2.10%20Workstation/workStation-printer.jpg) | `/workStation/printer` | Mengatur data printer. |
| [workStation-printerGroup.jpg](screenshot/2.10%20Workstation/workStation-printerGroup.jpg) | `/workStation/printerGroup` | Mengelompokkan printer. |
| [workStation-terminal.jpg](screenshot/2.10%20Workstation/workStation-terminal.jpg) | `/workStation/terminal` | Mendaftarkan terminal POS yang dipakai. |

## 11 Outlet Management

Halaman ini dipakai untuk mengatur data outlet atau cabang.

| Screenshot | Route | Fungsi |
|---|---|---|
| [outlet.jpg](screenshot/2.11%20Outlet%20Management/outlet.jpg) | `/outlet` | Daftar outlet yang terdaftar di sistem. |
| [outlet-detail.jpg](screenshot/2.11%20Outlet%20Management/outlet-detail.jpg) | Detail outlet | Melihat atau mengubah detail outlet. |

## 12 Menu Configuration

Halaman ini dipakai untuk mengatur menu makanan dan struktur kategorinya.

| Screenshot | Route | Fungsi |
|---|---|---|
| [menu-item.jpg](screenshot/2.12%20Menu%20Configuration/menu-item.jpg) | `/menu/item` | Mengatur data item menu. |
| [menu-department.jpg](screenshot/2.12%20Menu%20Configuration/menu-department.jpg) | `/menu/department` | Mengatur department menu. |
| [menu-category.jpg](screenshot/2.12%20Menu%20Configuration/menu-category.jpg) | `/menu/category` | Mengatur kategori menu. |
| [menu-lookup.jpg](screenshot/2.12%20Menu%20Configuration/menu-lookup.jpg) | `/menu/lookUp` | Melihat struktur menu dalam bentuk tree. |
| [menu-lookup-add-item.jpg](screenshot/2.12%20Menu%20Configuration/menu-lookup-add-item.jpg) | `/menu/lookUp` | Menambahkan item ke dalam struktur menu. |

## 13 Modifiers

Halaman ini dipakai untuk mengatur pilihan tambahan pada menu.

| Screenshot | Route | Fungsi |
|---|---|---|
| [modifier.jpg](screenshot/2.13%20Modifiers/modifier.jpg) | `/modifier` | Mengatur modifier utama. |
| [modifier-group.jpg](screenshot/2.13%20Modifiers/modifier-group.jpg) | `/modifier/group` | Mengelompokkan modifier. |

## 15 Table Map & Floor Plan

Halaman ini dipakai untuk mengatur meja dan tampilan denah ruangan.

| Screenshot | Route | Fungsi |
|---|---|---|
| [tableMap.jpg](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/tableMap.jpg) | `/tableMap` | Mengatur posisi dan data meja. |
| [tableMap-template-icon.jpg](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/tableMap-template-icon.jpg) | `/tableMap/template` | Mengatur icon atau template meja. |
| [floorMap.jpg](screenshot/2.15%20Table%20Map%20%26%20Floor%20Plan/floorMap.jpg) | `/floorMap` | Mengatur gambar dan layout floor plan. |

## 16 Cashback & UX Configuration

Halaman ini dipakai untuk pengaturan cashback, tampilan tombol, dan bahasa.

| Screenshot | Route | Fungsi |
|---|---|---|
| [cashback.jpg](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/cashback.jpg) | `/cashback` | Mengatur program cashback. |
| [cashback-detail.jpg](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/cashback-detail.jpg) | `/cashback/detail` | Melihat dan mengubah detail cashback. |
| [ux.jpg](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/ux.jpg) | `/ux` | Mengatur fungsi atau tombol untuk user. |
| [global-language.jpg](screenshot/2.16%20Cashback%20%26%20UX%20Configuration/global-language.jpg) | `/language` | Mengatur bahasa atau label tampilan. |

## Belum Ada Screenshot

Bagian report belum ada screenshot di folder saat ini, jadi belum dimasukkan ke dokumen ini.

## Catatan Singkat

- Jika ada halaman yang tidak muncul di menu real case, berarti halaman tersebut legacy atau sudah tidak dipakai lagi.
- Jika nanti ada screenshot baru, bagian dokumen ini bisa ditambah tanpa mengubah format utama.
