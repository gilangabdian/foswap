judul: foswap

deskripsi singkat:
aplikasi **"Automated Aesthetic Slideshow/Story Maker"** (Photo-to-Video) yang dioptimasi untuk ukuran status WhatsApp atau IG Story (rasio 9:16) dengan dominasi tema UI gelap (Dark Mode).


Ini masuk kategori projek _Simple to Medium_ yang sangat bagus buat portofolio, karena mengawinkan fitur standar (Auth & Profile) dengan fitur pengolahan file (Image/Video).

Mari kita rapikan dan kembangkan konsepnya agar lebih matang dari sisi _logic_ dan siap dibikinkan RESTful API-nya.

### 1. Penyempurnaan Konsep "Foswap"

- **Soal Animasi (Template vs Custom):** Karena kamu akan memproses ini menjadi _video_, **best practice-nya adalah menggunakan sistem Template di awal**. Kalau membiarkan user mengatur derajat rotasi, X/Y axis secara manual, itu akan sangat rumit di sisi pemrosesan _backend_-nya (biasanya pakai FFmpeg).

    - _Saran:_ Sediakan misal 3-5 template awal (contoh: "Smooth Fade", "3D Stack/Swap yang kamu sebutin", "Dynamic Zoom"). User tinggal pilih template dan atur durasi transisi (misal 1 detik atau 2 detik).

- **Background:** User bisa pilih background berupa warna solid (karena tema hitam, mungkin dark grey/black), gradient, atau efek _blur_ dari foto mereka sendiri (ini estetik banget).


### 2. Tambahan Fitur Agar Menjadi "Medium Level"

Untuk membuat API-mu tidak terlalu _basic_ (hanya CRUD biasa), tambahkan fitur ini:

1. **Sistem "Project" atau "Draft":** User tidak hanya _generate_ lalu hilang. Mereka bisa menyimpan _draft_ foswap mereka, jadi kapan-kapan bisa diedit lagi (tambah/kurangi foto) tanpa mulai dari nol.

2. **Sistem Antrian (Processing Status):** Menggabungkan foto menjadi video beranimasi itu butuh waktu (_rendering_). API kamu tidak boleh menyuruh user menunggu _loading_ sampai video selesai. API harus merespons "Video sedang diproses", lalu user bisa mengecek statusnya apakah sudah `DONE` untuk diunduh.

3. **Soft Delete / Tong Sampah:** User bisa menghapus project/video mereka, tapi tidak langsung hilang dari database (masuk tong sampah dulu selama 30 hari).


3. Gambaran Endpoint RESTful API (Kasarannya)


Berdasarkan konsep di atas, ini adalah rute (endpoints) yang akan kamu buat pakai Express dan Prisma nanti:


#### A. Authentication (Manajemen Akses)

- `POST /api/auth/register` : Mendaftar akun baru.

- `POST /api/auth/login` : Login akun. Nanti kembaliannya berupa **JWT Token**. Untuk fitur "Ingat Saya", kamu bisa atur masa kedaluwarsa tokennya menjadi panjang (misal 30 hari).

- `POST /api/auth/logout` : Menghapus sesi/token (kalau kamu pakai sistem _cookie_ atau _blacklist token_).


#### B. User Profile

- `GET /api/users/profile` : Mengambil data profile milik user yang sedang login.

- `PATCH /api/users/profile` : Update profil satuan (misal cuma mau ganti nama aja, atau ganti bio aja).

- `PUT /api/users/profile` : Update profil keseluruhan (harus ngirim semua data: nama, bio, avatar, dll).


#### C. Master Data (Templates)

- `GET /api/templates` : Mengambil daftar template animasi yang tersedia (misal: ID 1 untuk "3D Swap", ID 2 untuk "Fade").


#### D. Core Feature: Foswap (Projects)

- `POST /api/projects` : Membuat project baru (Draft).

- `GET /api/projects` : Melihat riwayat/history semua video yang pernah dibuat user.

- `GET /api/projects/:id` : Melihat detail satu project (daftar fotonya apa aja, template apa).

- `PUT /api/projects/:id/settings` : Mengatur setelan project (pilih template, atur durasi per foto, pilih background).

- `POST /api/projects/:id/photos` : Upload foto-foto ke project ini (minimal 5, maksimal 16).

- `DELETE /api/projects/:id/photos/:photoId` : Menghapus foto tertentu dari project.


#### E. Video Processing (Fitur Medium-nya)

- `POST /api/projects/:id/generate` : Mengeksekusi/memerintahkan server untuk mulai membuat video. Status project berubah dari `DRAFT` menjadi `PROCESSING`.

- `GET /api/projects/:id/status` : Endpoint untuk mengecek apakah video sudah selesai (`DONE`) atau masih `PROCESSING` atau gagal `FAILED`.

- `GET /api/projects/:id/download` : Kalau statusnya sudah `DONE`, endpoint ini akan memberikan URL/file video finalnya untuk diunduh.


tolong cekkan apakah ini udah sesuai??


### 4. Schema DB
butuh 4 entitas Berdasarkan fitur yang sudah kita sepakati, kita membutuhkan 4 entitas utama:
- **User**
- **Template**
- **Project** (sebagai _draft_ atau wadah video)
- **Photo**.

di sini langsung pembuatan aja ke model di prisma.schema (udah sesuai kan isi dari file itu????)

tolong cekkan step no 3 itu yg endpoint restful api apakah udah sesuai projekku dan kalo udah maka:
tolong bantu aku buatkan openapi yang modular dengan openapi di folder docs/openapi yaa! pastikan beri nama openapi.json
trus juga kalo sudah sekalian bundle dengan redocly dengan output openapi-bundled.json
soalnya mau aku test dengan postman nanti kalo udah selesai gitu!