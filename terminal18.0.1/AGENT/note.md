File img ada di folder 'screenshoot'

 
## Detail halaman Menu(main-menu.jpg)
### General
1. TABLES : POS transaction dan ada tampilan kursi 
    - lihat detail flow ada di "Flow POS FnB.drawio" dan berhubungan dengan point 'MENU'
1. PRINT QUEUE (printQueue.jpg) : list printer yang masih waiting list, printer server memproses printing setiap 1 detik, jika tidak ada waiting list maka kosong
2. SETTING (setting.jpg) : setting untuk local printer, global printer dengan printer server.. ect
3.  ADJUST ITEM (items.jpg) : untuk menanbahkan qty tiap item, atau bisa juga dibuat tidak terbatas qty nya
4. CUSTOMER DISPLAY :  ini tamilan mirror untuk customer display, ini lebih ke food court untuk saat ini bukan untuk restorant

### Operation
1. TRANSACTION : transaction.jpg >> transaction-receipt.jpg
2. REPORTS : reports.jpg >> reports-sample.jpg
3. CASH : cash.jpg
4. USER LOGS : userLogs.jpg

### SYSTEM
1. SIGN OFF :  session user dihapus dan keluar kehalaman login
2. DAILY CLOSE
3. LOG OFF :  ke halaman Stantbay terminal, user hanya bisa melihat tempat duduk yang avaiable, session user tetap disimpan.


## MENU
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



## Rules untuk void transaction yang sudah terjadi 
1. masuk ke transaction, 
2. setelah masuk halaman receipt, tekan tombol VOID PAYMENT
3. berikan alasannya