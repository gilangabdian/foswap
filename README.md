# FoSwap Project

Selamat datang di repositori utama **FoSwap**! FoSwap adalah platform SaaS inovatif untuk membuat video keren dengan menggabungkan foto-foto (*Face Swap / Transitions*) ke dalam berbagai *template* yang tersedia secara otomatis.

> ⚠️ **Status Saat Ini:**
> - **Backend**: Telah selesai 100% dan sepenuhnya fungsional.
> - **Frontend**: Bagian Publik (*Landing Page*) dan Autentikasi (*Login & Register*) telah selesai dikerjakan dengan desain UI/UX *dark mode* yang premium, animasi *Framer Motion* interaktif, dan arsitektur *Next.js*. 
> - **Fase Selanjutnya**: Integrasi API Login/Register ke Backend, dilanjutkan dengan pembuatan halaman *Protected Dashboard* tempat *user* mengelola proyek videonya.

## 📂 Struktur Repositori

Proyek ini menggunakan arsitektur pemisahan *frontend* dan *backend* di dalam satu *repository* (*monorepo*):

- `/backend` - Berisi *source code* untuk RESTful API.
- `/frontend` - Berisi *source code* antarmuka pengguna berbasis *React/Next.js*.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (Wajib menggunakan latar `#151515` dan aksen `#301B3F`)
- **Animation**: Framer Motion
- **Icons**: Iconify

### Backend
- **Environment**: Node.js & TypeScript
- **Web Framework**: Express.js
- **Database ORM**: Prisma ORM dengan MariaDB
- **Testing**: Vitest (Unit & E2E Testing)
- **File Handling**: Multer

## 🚀 Instalasi & Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js (versi >= 18)
- MariaDB / MySQL
- npm / yarn / pnpm

### 1. Menjalankan Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Konfigurasi file `.env` (pastikan mengarah ke *database* MariaDB Anda):
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/foswap_db"
   PORT=3000
   ```
4. Jalankan migrasi Prisma untuk menyiapkan *database*:
   ```bash
   npx prisma migrate dev
   ```
5. Jalankan server backend (Mode Development):
   ```bash
   npm run dev
   ```

### 2. Menjalankan Frontend
Buka terminal/tab baru dan ikuti langkah berikut:
1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server frontend:
   ```bash
   npm run dev
   ```
4. Akses `http://localhost:3000` di *browser* Anda untuk melihat hasil *Landing Page* FoSwap.

## 🧪 Pengujian (Tests)

Semua skenario *E2E API* pada backend telah lulus 100%. Untuk menjalankannya:
```bash
cd backend
npm run test
```

## 📖 Dokumentasi API

Untuk melihat dokumentasi lengkap mengenai _endpoint_ API apa saja yang tersedia, rute _protected_, dan cara mengirim *request* API:
👉 **[Dokumentasi API Backend](./backend/docs/README.md)**

---
*Built with ❤️ by Abdian*
