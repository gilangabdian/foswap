# FoSwap API Documentation

Selamat datang di Dokumentasi API FoSwap! Sistem ini dirancang sebagai fondasi komunikasi data (REST API) yang kokoh, cepat, dan terstruktur. Kami mematuhi standar internasional **OpenAPI 3.0.3** untuk memastikan struktur API mudah dibaca baik oleh manusia maupun alat (seperti Postman atau Swagger).

## 🗂️ Struktur Folder API

Di dalam folder `docs/` ini, kamu akan menemukan arsitektur pembagian API:
- `openapi.json`: File utama (*root*) yang bertindak sebagai jembatan yang menghubungkan semua komponen API.
- `openapi/`: Folder tempat kami memecah _endpoints_ menjadi kepingan modul yang lebih kecil (*Authentication, Users, Templates, Projects*, dll.) agar terorganisir.
- `openapi-bundled.json`: File akhir (*build result*) yang merangkum semua kepingan modul menjadi 1 buah file utuh. **File inilah yang harus kamu *Import* ke dalam Postman atau Swagger UI!**

## 💻 Script Pengembangan (NPM Scripts)

Jika kamu mengubah sesuatu di dalam folder `openapi/` atau `openapi.json`, jalankan perintah berikut (dari direktori `/backend`):

1. **Memvalidasi Penulisan OpenAPI**
   Untuk memastikan tidak ada kesalahan _typo_ atau *schema* yang rusak:
   ```bash
   npm run docs:lint
   ```

2. **Menggabungkan Semua File API**
   Untuk menyatukan pecahan modul menjadi file `openapi-bundled.json` baru:
   ```bash
   npm run docs:bundle
   ```

---

## 🚀 Panduan Endpoint API (Overview)

Sistem FoSwap API memiliki dua buah gerbang: **Public API** (Bebas diakses oleh siapa saja tanpa _login_) dan **Protected API** (Wajib mengirimkan token autentikasi rahasia di dalam *Header*).

> **Penting (Otorisasi):**
> Untuk semua rute bertanda 🔒 **(Membutuhkan Token)**, kamu WAJIB menyertakan _header_:
> `X-API-TOKEN: <token_hasil_login_kamu>`

### 🟢 Public API (Tanpa Token)
API ini bersifat umum dan digunakan untuk pembuatan akun serta akses masuk.

- `POST /api/users` 👉 **Register** (Mendaftarkan akun baru).
- `POST /api/users/login` 👉 **Login** (Mendapatkan otorisasi berupa `X-API-TOKEN`).

### 🔒 Protected API (Wajib Token)
API di bawah ini adalah fasilitas eksklusif yang hanya bisa diakses apabila _user_ sudah _login_ dan tokennya valid.

#### 👤 Modul Pengguna (Users)
- `GET /api/users/current` 👉 Mengambil data profil _user_ yang sedang aktif.
- `PATCH /api/users/current` 👉 Memperbarui biodata/profil _user_.
- `POST /api/users/avatar` 👉 Mengunggah foto profil (*avatar*) baru.
- `DELETE /api/users/logout` 👉 Mengakhiri sesi dan menghapus kredensial token (*Logout*).

#### 🖼️ Modul Template
- `GET /api/templates` 👉 Mengambil daftar semua *template* animasi/video yang tersedia di sistem.

#### 📁 Modul Proyek (Projects & Photos)
- `POST /api/projects` 👉 Membuat draf proyek video baru.
- `GET /api/projects` 👉 Menampilkan semua daftar proyek yang dimiliki _user_.
- `GET /api/projects/:id` 👉 Mengambil detail dari satu proyek spesifik (termasuk foto-fotonya).
- `PATCH /api/projects/:id` 👉 Mengubah pengaturan proyek (*template, durasi, background*).
- `POST /api/projects/:id/photos` 👉 Mengunggah foto/kumpulan foto ke dalam proyek (Batas Maksimal 16 foto).
- `DELETE /api/projects/:id/photos/:photoId` 👉 Menghapus salah satu foto dari proyek.

#### 🎬 Modul Pemrosesan Video (Video Processing)
- `POST /api/projects/:id/video` 👉 Memberi instruksi kepada *engine* untuk mulai memproses dan merender video (Minimal harus ada 5 foto).
- `GET /api/projects/:id/video/status` 👉 Mengecek apakah proses video masih `PROCESSING` atau sudah `DONE`.
- `GET /api/projects/:id/video/download` 👉 Mendapatkan URL spesial (*link*) untuk mengunduh video hasil akhirnya!
