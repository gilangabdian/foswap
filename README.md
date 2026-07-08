# FoSwap Project

Selamat datang di repositori utama **FoSwap**! FoSwap adalah platform inovatif untuk membuat video keren dengan menggabungkan foto-foto (*Face Swap / Transitions*) ke dalam berbagai template yang tersedia secara otomatis.

> ⚠️ **Status Saat Ini:**
> Saat ini, fase yang baru selesai dikerjakan secara utuh adalah bagian **Backend**. Untuk tampilan antarmuka (Frontend) akan segera dikerjakan pada fase berikutnya!

## 📂 Struktur Repositori

Proyek ini menggunakan arsitektur pemisahan *frontend* dan *backend* yang nantinya akan berdampingan:

- `/backend` - Berisi *source code* untuk RESTful API (Node.js, Express, TypeScript, Prisma, MariaDB).
- `/frontend` - *(Segera Hadir)* Berisi *source code* antarmuka pengguna (React / Next.js / framework UI lainnya).

## 🚀 Memulai Backend (Saat ini)

Bagian *Backend* sudah sepenuhnya siap dan fungsional. Berikut adalah teknologi yang menggerakkannya:
- **Node.js** & **TypeScript**
- **Express.js** (Web Framework)
- **Prisma ORM** dengan **MariaDB**
- **Vitest** (Unit & E2E Testing)
- **Multer** (Penanganan Upload File)

### 🛠️ Instalasi & Menjalankan Backend

1. Pindah ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Konfigurasi file `.env`. Gunakan *database* MariaDB/MySQL. Contoh:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/foswap_db"
   PORT=3000
   ```
4. Jalankan migrasi Prisma untuk menyiapkan *database*:
   ```bash
   npx prisma migrate dev
   ```
5. Jalankan server (Mode Development):
   ```bash
   npm run dev
   ```

*Server akan berjalan dan bisa diuji coba.*

### 🧪 Menjalankan Pengujian (Tests)

Semua skenario E2E API telah lulus 100%. Untuk menjalankannya sendiri:
```bash
cd backend
npm run test
```

## 📖 Dokumentasi API

Untuk melihat dokumentasi lengkap mengenai _endpoint_ API apa saja yang tersedia, bagaimana cara mengirimkan _request_, dan rute mana saja yang dikunci (*protected*), silakan baca selengkapnya di:
👉 **[Dokumentasi API Backend](./backend/docs/README.md)**

---
*© 2026 FoSwap - All Rights Reserved.*
