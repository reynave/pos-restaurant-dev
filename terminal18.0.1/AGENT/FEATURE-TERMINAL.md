# FEATURE TERMINAL POS - SALES DEMO GUIDE

Dokumen ini dirancang khusus untuk tim sales saat presentasi ke calon client baru.
Fokus utamanya adalah memperlihatkan kekuatan sistem POS Terminal dari sisi operasional restoran yang nyata, mudah dipahami, dan meyakinkan dari awal sampai akhir transaksi.

Dokumen ini menampilkan dua nilai besar:
1. Nilai bisnis: sistem membantu restoran bekerja lebih cepat, lebih rapi, dan lebih aman.
2. Nilai operasional: alur kasir dan pelayanan berjalan terstruktur dari login sampai payment dan receipt.

---

## 1. Cerita Besar Produk untuk Sales

Saat demo, sampaikan bahwa Terminal POS ini bukan hanya aplikasi kasir biasa. Sistem ini adalah pusat kontrol operasional outlet yang menghubungkan meja, order, kitchen, billing, payment, reporting, dan audit aktivitas user dalam satu alur yang konsisten.

Narasi yang bisa digunakan:
1. Outlet memulai hari dengan setup terminal dan login user.
2. Kasir atau waiter membuka transaksi per meja.
3. Order diproses melalui pemilihan menu, modifier, discount, lalu dikirim ke kitchen.
4. Tagihan ditutup melalui bill, payment, lalu receipt.
5. Semua aktivitas memiliki jejak data, bisa dilacak, dan bisa dikontrol melalui fitur log serta flow pembatalan dengan alasan.

Dengan narasi ini, client melihat bahwa sistem bukan hanya menjual transaksi, tetapi juga menjual disiplin operasional.

---

## 2. End-to-End Flow Sesuai Flowchart

Alur demo ini diambil dari flow utama pada file drawio:
1. Terminal Setup
2. Login
3. Daily Start decision
4. Main Menu
5. Tables
6. New Order atau Open Active Table
7. Menu selection, modifier, discount
8. Send Order
9. Bill
10. Print Bill
11. Payment
12. Receipt
13. Optional copy receipt
14. Kembali siap melayani transaksi berikutnya

Ini penting dijelaskan sebagai satu perjalanan kerja yang utuh, bukan fitur yang berdiri sendiri.

---

## 3. Fase Persiapan Operasional

### 3.1 Terminal Setup

Pada fase ini, sistem memastikan terminal siap dipakai untuk operasi harian.

Nilai jual ke client:
1. Terminal baru bisa diaktifkan dengan proses setup yang terarah.
2. Outlet bisa menyiapkan environment sesuai kebutuhan cabang.
3. Risiko salah koneksi berkurang karena proses awal dibuat jelas.

![Terminal Setup](screenshots/TERMINAL%20SETUP.jpg)

### 3.2 Login

Login menjadi pintu kontrol siapa yang menggunakan terminal pada shift berjalan.

Nilai jual ke client:
1. Akses transaksi dimulai dari identitas user.
2. Aktivitas user bisa ditelusuri melalui log.
3. Supervisi operasional menjadi lebih disiplin.

![Login](screenshots/login.jpg)

### 3.3 Daily Start

Daily Start memperkuat konsep bahwa operasional harian dimulai secara formal.

Nilai jual ke client:
1. Shift harian menjadi terukur.
2. Tim operasional tidak langsung lompat ke transaksi tanpa konteks hari kerja.
3. Kontrol pembukaan operasi lebih rapi.

![Daily Start](screenshots/daily-start.jpg)

---

## 4. Main Menu sebagai Command Center

Main Menu adalah pusat navigasi yang menggabungkan fungsi frontliner dan kontrol outlet.

Nilai jual ke client:
1. Semua kebutuhan utama ada dalam satu layar pusat.
2. User tidak bingung pindah-pindah modul.
3. Onboarding staff baru lebih cepat.

![Main Menu](screenshots/main-menu.jpg)

### 4.1 General Features

#### TABLES
Fitur ini menampilkan kondisi meja dan menjadi entry point transaksi dine-in.

Nilai bisnis:
1. Pelayanan meja jadi visual dan cepat.
2. Mengurangi risiko salah pilih meja saat ramai.

#### PRINT QUEUE
Fitur ini menampilkan daftar print yang masih menunggu proses.

Nilai bisnis:
1. Tim outlet bisa melihat bottleneck printing secara real-time.
2. Gangguan output kitchen/receipt bisa dipantau lebih dini.

![Print Queue](screenshots/printQueue.jpg)

#### SETTING
Fitur ini mengatur printer lokal dan skenario printer server.

Nilai bisnis:
1. Fleksibel untuk berbagai topologi outlet.
2. Mendukung adaptasi saat outlet berkembang.

![Setting](screenshots/setting.jpg)

#### ADJUST ITEM
Fitur ini mengatur kuantitas item agar sesuai kebijakan outlet.

Nilai bisnis:
1. Membantu kontrol stok operasional di front-end.
2. Mengurangi kesalahan order qty ekstrem.

![Adjust Item](screenshots/items.jpg)

#### CUSTOMER DISPLAY
Fitur mirror untuk skenario tertentu seperti food court.

Nilai bisnis:
1. Transparansi item dan nilai transaksi ke customer.
2. Pengalaman layanan lebih modern.

### 4.2 Operation Features

#### TRANSACTION
Membuka histori transaksi yang sudah terjadi.

Nilai bisnis:
1. Memudahkan pencarian transaksi lama.
2. Menjadi titik kontrol untuk kebutuhan koreksi transaksi.

![Transaction](screenshots/transaction.jpg)

![Transaction Receipt](screenshots/transaction-receipt.jpg)

#### REPORTS
Menampilkan ringkasan dan contoh laporan operasional.

Nilai bisnis:
1. Keputusan cepat berbasis data.
2. Supervisi performa outlet lebih mudah.

![Reports](screenshots/reports.jpg)

![Reports Sample](screenshots/reports-sample.jpg)

#### CASH
Mendukung kebutuhan pencatatan aliran kas operasional.

Nilai bisnis:
1. Cash movement harian lebih tertib.
2. Memudahkan rekonsiliasi akhir shift.

![Cash](screenshots/cash.jpg)

#### USER LOGS
Merekam aktivitas user.

Nilai bisnis:
1. Meningkatkan akuntabilitas tim.
2. Mempermudah investigasi jika ada kejadian khusus.

![User Logs](screenshots/userLogs.jpg)

### 4.3 System Features

#### SIGN OFF
Menghapus session user dan kembali ke login.

#### DAILY CLOSE
Menutup operasi harian sesuai SOP outlet.

#### LOG OFF
Kembali ke standby terminal tanpa menghapus session user.

Nilai bisnis:
1. Memberikan pilihan kontrol sesuai kondisi shift.
2. Membantu transisi antar staf lebih terstruktur.

---

## 5. Core Transaction Journey untuk Demo

Bagian ini adalah jantung presentasi sales. Tunjukkan dengan tempo pelan, jelas, dan meyakinkan.

### 5.1 Masuk ke Tables

Kasir memilih meja kosong untuk order baru, atau membuka meja aktif untuk melanjutkan transaksi.

![Tables](screenshots/table.jpg)

### 5.2 New Order

Saat meja dipilih, sistem memberikan jalur order baru agar alur transaksi mulai dari konteks meja yang tepat.

![New Order](screenshots/new%20order.jpg)

### 5.3 Menu Selection Experience

Order dibangun melalui tiga lapisan:
1. Pilih menu utama.
2. Pilih modifier sesuai preferensi customer.
3. Pilih discount jika tersedia.

Nilai jual ke client:
1. Pengambilan order lebih presisi.
2. Kustomisasi pesanan tercatat rapi.
3. Mengurangi miskomunikasi antara kasir dan kitchen.

![Table Menu](screenshots/table-menu.jpg)

![Select Menu](screenshots/table-menu-select-menu.jpg)

![Select Modifier](screenshots/table-menu-select-modifier.jpg)

![Select Discount](screenshots/table-menu-select-discount.jpg)

### 5.4 Send Order

Fitur ini mengirim order dari front ke kitchen flow.

Nilai jual ke client:
1. Mengurangi jeda komunikasi manual.
2. Order lebih cepat diproses.
3. Meminimalkan risiko order terlewat.

![Table After Send Order](screenshots/table-after-send-order.jpg)

### 5.5 Bill hingga Payment

Penutupan transaksi dilakukan berurutan:
1. Bill review.
2. Print bill.
3. Payment.
4. Receipt.

Nilai jual ke client:
1. Alur penagihan jelas.
2. Proses kasir lebih disiplin.
3. Bukti transaksi customer tersedia langsung.

![Menu Bill](screenshots/menu-bill.jpg)

---

## 6. Menu Function sebagai Fitur Advanced Outlet

Menu Function adalah pembeda penting karena banyak POS hanya kuat di input order, tetapi lemah di kontrol perubahan operasional saat outlet sibuk.

![Menu Function](screenshots/menu-function.jpg)

### 6.1 Transfer Items

Memindahkan item tertentu ke meja lain yang kosong dan membuka order baru pada meja tujuan.

Nilai bisnis:
1. Fleksibel saat customer pindah meja.
2. Menjaga akurasi billing per meja.

![Transfer Item Step 1](screenshots/menu-function-transfer-item-step1.jpg)

![Transfer Item Step 2](screenshots/menu-function-transfer-item-step2.jpg)

![Transfer Item Step 3](screenshots/menu-function-transfer-item-step3.jpg)

### 6.2 Transfer Log

Menyediakan histori transfer masuk dan keluar antar meja.

Nilai bisnis:
1. Transparansi perubahan order.
2. Bukti audit internal saat diperlukan.

![Transfer Log](screenshots/menu-function-transfer-item-log.jpg)

### 6.3 Change Table

Memindahkan konteks order dari satu meja ke meja kosong lain.

Nilai bisnis:
1. Adaptif saat layout pelayanan berubah.
2. Menjaga continuity layanan customer.

![Change Table](screenshots/menu-function-change-table.jpg)

### 6.4 Take Out

Mengubah konteks layanan menjadi bawa pulang.

Nilai bisnis:
1. Fleksibel menangani perubahan keputusan customer.
2. Mengurangi input ulang order.

![Take Out](screenshots/menu-function-take-out.jpg)

### 6.5 Exit Without Order

Keluar dari menu meja tanpa mengeksekusi perubahan.

Nilai bisnis:
1. Mencegah perubahan tidak sengaja.
2. Menjaga keamanan alur saat user batal input.

### 6.6 Void Item

Membatalkan item dengan kewajiban mengisi alasan.

Nilai bisnis:
1. Menjaga integritas data pembatalan.
2. Mengurangi potensi penyalahgunaan diskon atau pembatalan.

![Void Item](screenshots/menu-function-void-item.jpg)

![Void Item Step 2](screenshots/menu-function-void-item-2.jpg)

### 6.7 Change Cover

Mengubah jumlah tamu pada meja.

Nilai bisnis:
1. Data layanan meja lebih akurat.
2. Membantu evaluasi operasional outlet.

### 6.8 Merger dan Merger Log

Menggabungkan meja aktif dengan meja lain yang tersedia, lengkap dengan riwayatnya.

Nilai bisnis:
1. Kuat untuk skenario rombongan.
2. Riwayat gabung meja tetap terlacak.

![Merger Table](screenshots/menu-function-merger-table.jpg)

### 6.9 Bill dan Payment Gate

Sistem menegaskan urutan hingga payment, termasuk dependensi print bill sebelum proses final tertentu.

Nilai bisnis:
1. Menekan potensi salah proses di kasir.
2. Menjaga disiplin SOP outlet.

---

## 7. Void Transaction dari Transaction Module

Flow pembatalan transaksi yang sudah terjadi dapat dilakukan dari modul Transaction pada detail receipt melalui aksi Void Payment dan pengisian alasan.

Nilai jual ke client:
1. Koreksi transaksi tersedia secara terkontrol.
2. Ada jejak alasan untuk kepentingan audit.
3. Membantu manajemen risiko operasional.

---

## 8. Script Demo untuk Tim Sales

### 8.1 Opening Pitch

Kalimat pembuka yang bisa dipakai:
1. Sistem ini dirancang untuk mempercepat layanan sekaligus menjaga kontrol operasional outlet.
2. Kami tidak hanya menunjukkan input transaksi, tetapi keseluruhan life cycle order sampai audit.
3. Dalam demo ini, Bapak/Ibu akan melihat bagaimana tim outlet bisa bekerja cepat, rapi, dan tetap terkontrol.

### 8.2 Demo Storyline 15 Menit

Urutan demo:
1. Tunjukkan setup dan login sebagai gerbang kontrol penggunaan.
2. Masuk main menu dan jelaskan command center.
3. Buka tables, ambil order, pilih menu, modifier, dan discount.
4. Kirim order ke kitchen flow.
5. Tutup transaksi dari bill, print bill, payment, sampai receipt.
6. Tunjukkan menu function advanced sebagai bukti kesiapan untuk kondisi outlet sibuk.
7. Tutup dengan transaction, reports, cash, dan user logs untuk menegaskan aspek kontrol bisnis.

### 8.3 Closing Pitch

Kalimat penutup yang bisa dipakai:
1. Dengan alur ini, outlet bukan hanya bertransaksi, tetapi menjalankan operasi yang terukur.
2. Sistem membantu tim frontliner tetap cepat saat jam sibuk, sambil tetap menjaga kontrol manajerial.
3. Hasil akhirnya adalah service yang konsisten, data yang rapi, dan keputusan bisnis yang lebih percaya diri.

---

## 9. Keunggulan yang Bisa Ditekankan ke Client

1. End-to-end flow jelas dari awal shift sampai penutupan transaksi.
2. Visual table-based operation cocok untuk restoran dine-in.
3. Order detail mendukung menu, modifier, discount, dan pengiriman kitchen flow.
4. Advanced operation tersedia untuk kondisi nyata: transfer item, change table, merger table, take out.
5. Kontrol dan audit kuat melalui transaction history, user logs, dan alasan pembatalan.
6. Struktur menu terminal menyatukan kecepatan pelayanan dengan disiplin operasional.

---

## 10. Ringkasan untuk Proposal Sales

Terminal POS ini menonjol karena menggabungkan tiga kekuatan sekaligus:
1. Kecepatan layanan di front counter dan area meja.
2. Fleksibilitas operasional saat kondisi lapangan berubah cepat.
3. Kontrol bisnis yang dapat dipertanggungjawabkan melalui jejak aktivitas dan alur pembatalan terstruktur.

Untuk client baru, pesan yang paling kuat adalah bahwa sistem ini siap dipakai bukan hanya saat kondisi ideal, tetapi juga saat outlet ramai, dinamis, dan penuh perubahan order. Inilah nilai praktis yang membuat implementasi POS tidak berhenti di kasir, tetapi menjadi fondasi operasi restoran yang profesional.

---

## 11. Objection Handling untuk Tim Sales

Bagian ini membantu tim sales menjawab pertanyaan kritis dari client saat demo atau negosiasi.

### 11.1 Objection: "Kasir kami tidak terlalu tech-savvy"

Jawaban yang disarankan:
1. UI terminal dibuat berbasis alur kerja lapangan, bukan alur teknis.
2. Proses inti sangat sederhana: pilih meja, pilih menu, kirim order, bill, payment.
3. Sistem mendukung onboarding bertahap, termasuk mode training yang mudah diikuti.
4. Struktur Main Menu dibuat sebagai command center agar user tidak tersesat ke modul yang tidak diperlukan.

Nilai yang perlu ditekankan:
1. Sistem ini dibuat untuk operator harian, bukan untuk pengguna teknis.
2. Waktu adaptasi user baru bisa dipercepat karena navigasi berbasis tugas.

### 11.2 Objection: "Kalau outlet sedang ramai, apakah tetap aman?"

Jawaban yang disarankan:
1. Sistem menyediakan fitur advanced untuk kondisi ramai, seperti transfer items, change table, merger, dan log perubahannya.
2. Print queue memberikan visibilitas atas status antrian print, sehingga hambatan bisa dideteksi cepat.
3. User logs dan alasan void membantu manajemen menjaga disiplin operasional saat tekanan tinggi.

Nilai yang perlu ditekankan:
1. POS ini bukan hanya untuk kondisi normal, tetapi juga siap untuk skenario peak hour.
2. Fleksibilitas operasional tetap berjalan tanpa kehilangan kontrol data.

### 11.3 Objection: "Bagaimana kalau banyak koreksi transaksi?"

Jawaban yang disarankan:
1. Koreksi item bisa dilakukan lewat Void Item dengan alasan wajib.
2. Koreksi transaksi yang sudah terjadi dapat dikelola dari modul Transaction melalui Void Payment.
3. Histori dan log membantu proses audit internal.

Nilai yang perlu ditekankan:
1. Koreksi transaksi tersedia, tetapi tetap terkontrol.
2. Manajemen mendapatkan jejak keputusan, bukan perubahan tanpa catatan.

### 11.4 Objection: "Kami butuh data, bukan hanya kasir"

Jawaban yang disarankan:
1. Modul Reports memberi ringkasan operasional yang relevan untuk evaluasi.
2. Modul Cash membantu disiplin pencatatan aliran kas.
3. User Logs memberi transparansi aktivitas tim.

Nilai yang perlu ditekankan:
1. Terminal POS ini mendukung keputusan operasional harian.
2. Data tidak berhenti di receipt, tetapi naik menjadi insight manajerial.

### 11.5 Objection: "Kalau proses print bermasalah bagaimana?"

Jawaban yang disarankan:
1. Sistem memisahkan kontrol print melalui print queue, sehingga status pending dapat dipantau.
2. Pengaturan printer tersedia di modul setting untuk menyesuaikan skenario outlet.
3. Struktur proses print membantu tim outlet menelusuri titik gangguan lebih cepat.

Nilai yang perlu ditekankan:
1. Sistem dirancang dengan visibilitas operasional, bukan black box.
2. Tim outlet bisa bertindak cepat sebelum gangguan membesar.

---

## 12. Before vs After Implementasi Terminal POS

### 12.1 Sebelum Implementasi

Kondisi yang sering terjadi:
1. Informasi order berpindah manual, rawan salah komunikasi.
2. Pergantian meja atau perubahan order memakan waktu dan sering tidak tercatat rapi.
3. Proses billing dan payment sering tidak konsisten antar staf.
4. Koreksi transaksi sulit ditelusuri karena alasan perubahan tidak terdokumentasi dengan baik.
5. Data operasional tersebar, sulit dipakai untuk evaluasi cepat.

### 12.2 Sesudah Implementasi

Perubahan yang terlihat:
1. Alur order menjadi standar dari Tables sampai Receipt.
2. Perubahan operasional lapangan ditangani oleh fitur khusus, bukan improvisasi manual.
3. Payment dan receipt berjalan dalam alur yang konsisten.
4. Void item dan void payment memiliki alasan serta jejak aktivitas.
5. Laporan, cash, dan log membuat kontrol outlet lebih kuat.

### 12.3 Dampak Bisnis yang Bisa Dijual

1. Kecepatan layanan meningkat karena alur kerja jelas.
2. Kesalahan operasional menurun karena sistem memandu langkah.
3. Kualitas kontrol manajerial meningkat lewat data dan jejak aktivitas.
4. Onboarding staf baru lebih cepat karena sistem terstruktur.

---

## 13. Use Case per Tipe Outlet

### 13.1 Restoran Dine-In

Karakter kebutuhan:
1. Banyak meja aktif dengan perubahan kondisi yang dinamis.
2. Butuh alur order yang rapi dari pelayanan meja ke kitchen dan kasir.

Fitur yang paling relevan:
1. Tables visual.
2. New order per meja.
3. Send order.
4. Change table.
5. Transfer items.
6. Merger table.
7. Bill - payment - receipt.

Pesan sales:
1. Sistem menjaga layanan meja tetap cepat tanpa mengorbankan kontrol transaksi.

### 13.2 Cafe dengan Perubahan Order Cepat

Karakter kebutuhan:
1. Volume transaksi cepat, sering ada request perubahan item.
2. Tim butuh antarmuka yang sederhana namun fleksibel.

Fitur yang paling relevan:
1. Menu select cepat.
2. Modifier dan discount.
3. Void item dengan alasan.
4. Print queue monitoring.
5. Transaction lookup.

Pesan sales:
1. Sistem membantu tim tetap cepat di jam sibuk sambil menjaga jejak koreksi.

### 13.3 Food Court

Karakter kebutuhan:
1. Interaksi langsung customer-kasir tinggi.
2. Transparansi nilai transaksi ke customer menjadi penting.

Fitur yang paling relevan:
1. Customer display.
2. Payment dan receipt cepat.
3. Print queue.
4. Cash module.

Pesan sales:
1. Sistem memperkuat pengalaman transaksi langsung dan kecepatan pelayanan.

### 13.4 Multi-Shift Outlet

Karakter kebutuhan:
1. Serah terima antar staf harus jelas.
2. Risiko miss komunikasi antar shift perlu ditekan.

Fitur yang paling relevan:
1. Daily start.
2. Daily close.
3. Log off / sign off sesuai kebutuhan shift.
4. User logs untuk jejak aktivitas.

Pesan sales:
1. Sistem menjaga kesinambungan operasional antar shift dengan jejak data yang jelas.

---

## 14. Paket Demo 20 Menit untuk Presentasi Client

### Menit 1-3: Framing

1. Jelaskan tantangan umum outlet: kecepatan, akurasi, dan kontrol.
2. Posisikan Terminal POS sebagai solusi operasional end-to-end.

### Menit 4-8: Core Transaction

1. Setup dan login singkat.
2. Tables -> new order -> menu -> modifier/discount -> send order.

### Menit 9-12: Closing Transaction

1. Bill -> print bill -> payment -> receipt.
2. Tunjukkan bahwa alur penutupan transaksi disiplin dan jelas.

### Menit 13-16: Advanced Operation

1. Transfer items.
2. Change table.
3. Merger.
4. Void item dengan alasan.

### Menit 17-19: Control & Insight

1. Transaction.
2. Reports.
3. Cash.
4. User logs.

### Menit 20: Closing Value

1. Rangkum value: cepat, fleksibel, terkontrol.
2. Tautkan ke kebutuhan outlet client yang sedang dipresentasikan.

---

## 15. Closing Statement Siap Pakai untuk Sales

Kalimat penutup yang bisa langsung dipakai:

"Melalui Terminal POS ini, outlet Bapak/Ibu tidak hanya mendapatkan sistem kasir, tetapi mendapatkan alur operasi yang lengkap dari awal layanan sampai audit aktivitas. Pada saat outlet ramai, sistem tetap menjaga kecepatan pelayanan. Pada saat manajemen butuh kontrol, sistem menyediakan data dan jejak aktivitas yang jelas. Kombinasi inilah yang membuat implementasi POS bukan sekadar digitalisasi transaksi, melainkan peningkatan kualitas operasi bisnis secara menyeluruh."
