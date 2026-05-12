Dengan flowchart XML + screenshots, saya bisa bikin USER-DOC yang akurat sesuai flow nyata.

### Yang saya butuh dari Anda:

1. Flowchart XML (bisa dari draw.io, Lucidchart, dll):

- Format: .xml atau .drawio file
- Kasih step sequence untuk:
    - Terminal operator (waiter/kasir daily workflow)
    - Admin (setup dan management)
- Clear labeling setiap node dengan nama screen/action 

2. Screenshots (untuk tiap screen utama):
    - Format: .png atau .jpg (recommended 1920x1080 or less)
    - Screenshots dari:
        - Terminal app: Setup → Login → Tables → Menu → Bill → Payment → Receipt → Daily Close
        - Admin app: Dashboard → Menu management → Reports → Employee setup
    - Nama file descriptive (contoh: 01-terminal-login.png, 02-tables-layout.png, dst)

3. Lokasi untuk upload files:
    - Saya suggest: c:\nodejs\pos-restaurant-dev\terminal18.0.1\AGENT\screenshots\ (buat folder baru)
    - Atau tempat lain kalau Anda prefer

Setelah Anda upload, saya akan:

1.Read flowchart XML → understand sequence
2.Embed screenshots di USER-DOC.md
3.Bikin step-by-step + visual guide untuk setiap role
4.Include quick reference checklist untuk masing-masing


Penjelasan menu-function.jpg di halaman table-menu
1. TRANSFER ITEMS : ini transfer item menu yang sudah dipesan ke meja baru yang kosong, dia akan otomatis buka order baru untuk table itu dan termasuk katagory beda no bill
step sbb : menu-function-transfer-item-step1.jpg -> menu-function-transfer-item-step2.jpg ->  menu-function-transfer-item-step3.jpg.
2. TRANSFER LOG :  history transfer in / out dari table lain
(menu-function-transfer-item-log.jpg).
3. CHANGE TALBE : ini untuk pindah table ke table yang kosong
(menu-function-change-table.jpg)
4. TAKE OUT : adalah take away atau dibungkus bawa pulang makanannya
(menu-function-take-out.jpg)
5. EXIT WITHOUT ORDER : keluar tanpa melakukan apa-apa, kembali ke menu table
6. SEND ORDER : kirim menu yang sudah dipesan ke kitchen (dapur), bisa print, bisa juga muncul di monitor kitchen.
7. VOID ITEM : batalkan pesanan, semua yang dibataklah wajib memberikan alasan
menu-function-void-item.jpg -> menu-function-void-item-2.jpg
8. CHANGE COVER : hanya ganti berapa orang di meja tersebut
9. MERGER : gabung dengan meja lain, hanya meja yang tersedia yang bisa dipilih 
menu-function-merger-table.jpg
10. MERGER LOG : history dari point no 9.merger
11. BILL : daftar bill pesanan (menu-bill.jpg)
12. PAYMENT : masuk kehalaman payment, tombol ini hanya bisa diklik jika sudah melakukan step print BILL.