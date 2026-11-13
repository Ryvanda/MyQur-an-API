Aplikasi React sederhana untuk membaca daftar surah dan ayat Al-Qur'an
dengan terjemahan Bahasa Indonesia.

## Fitur

- Menampilkan 114 surah.
- Mencari surah berdasarkan nama.
- Membaca detail surah dan ayat.
- Memuat ayat berikutnya dengan pagination.
- Navigasi ke surah sebelumnya dan berikutnya.
- Memutar audio surah dan ayat.

## API

Base URL:

```text
https://api.myquran.com/v3
```

Endpoint yang digunakan:

```text
GET /quran
GET /quran/{nomor}?page=1&limit=100
```

Pencarian surah dilakukan di sisi client dari data `GET /quran`.

## Alur Program

Saat aplikasi dijalankan, `src/main.jsx` memuat komponen `App` dan
`src/index.css`. Komponen `App` membaca URL untuk menentukan halaman yang
ditampilkan. Pada halaman utama, aplikasi memanggil endpoint `/quran` melalui
`src/services/surahService.js`. Request tersebut diproses oleh
`src/services/api.js`, lalu data surah dikirim ke `HomePage.jsx` untuk
ditampilkan sebagai beberapa `SurahCard`. Pencarian dilakukan langsung di
browser dengan memfilter nama surah yang sudah diterima dari API.

Saat salah satu surah dipilih, URL berubah menjadi `/surah/{nomor}` dan
`DetailPage.jsx` mengambil data dari endpoint `/quran/{nomor}` melalui
`detailService.js`. Informasi surah ditampilkan bersama ayat-ayatnya melalui
`AyahCard`. Jika jumlah ayat belum selesai dimuat, tombol pagination akan
mengambil halaman berikutnya dari API. Halaman detail juga menyediakan audio
surah dan ayat serta navigasi ke surah sebelumnya atau berikutnya. Komponen
`Navbar`, `SearchBar`, dan `Loading` membantu menampilkan navigasi, pencarian,
dan status pemuatan data, sedangkan `index.css` mengatur tampilan sederhana
berwarna hitam putih.

