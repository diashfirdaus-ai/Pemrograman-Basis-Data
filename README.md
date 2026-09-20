# SIMLAB DB — Laboratorium Basis Data Interaktif ITENAS

![ITENAS Logo](logo.png)

> **Platform Pembelajaran & Simulator Visual Interaktif Mata Kuliah Pemrograman Basis Data**  
> **Institut Teknologi Nasional (ITENAS) Bandung**

---

## 📌 Tentang SIMLAB DB

**SIMLAB DB** adalah platform laboratorium virtual berbasis web yang dirancang khusus untuk mahasiswa program sarjana (Informatika dan Sistem Informasi) ITENAS. Aplikasi ini mengonversi konsep teoretis basis data relasional menjadi simulasi visual interaktif, sehingga mahasiswa dapat memahami bagaimana query SQL dieksekusi langkah demi langkah: dari pemindaian tabel fisik, pemfilteran baris per klausa `WHERE`, pemetaan relasi lewat `JOIN`, hingga pembentukan tabel hasil akhir.

---

## ✨ Fitur Utama

- **Silabus Perkuliahan 14 Pertemuan Terstruktur**:
  - Modul 01: Pengantar Basis Data, Data Terstruktur, Semi-Terstruktur, Tidak Terstruktur, & Instalasi Environment (XAMPP & DBeaver).
  - Modul 02: Database Design & Entity Relationship Diagram (ERD).
  - Modul 03: Relational Database & Normalisasi (1NF, 2NF, 3NF).
  - Modul 04: SQL Dasar (DDL & DML).
  - Modul 05: SQL Query, Filtering (`WHERE`, `LIKE`, `BETWEEN`, `IN`, `ORDER BY`, `LIMIT`).
  - Modul 06: Relasi & Multi-Table `JOIN` (`INNER`, `LEFT`, `RIGHT`, `CROSS`).
  - Modul 07: Fungsi Agregasi & Grouping (`COUNT`, `SUM`, `AVG`, `GROUP BY`, `HAVING`).
  - Modul 08: Subquery & Advanced Nested Query.
  - Modul 09: Database Programming: Stored Procedure & User-Defined Function.
  - Modul 10: Trigger & Database Transaction (ACID, `COMMIT`, `ROLLBACK`).
  - Modul 11: Arsitektur Koneksi Aplikasi & Prepared Statement.
  - Modul 12: Integrasi CRUD Application.
  - Modul 13: Keamanan Database (SQL Injection Prevention) & Optimasi Index (B-Tree).
  - Modul 14: Panduan Proyek Akhir & Rubrik Penilaian.

- **Simulator Query Visual & Pipeline Execution**:
  - Visualisasi pipeline eksekusi: `FROM` ➔ `WHERE` ➔ `JOIN` ➔ `GROUP BY` ➔ `OUTPUT`.
  - Penanda visual baris yang lolos (`MATCH`) dan baris yang tereliminasi (`DISCARD`).

- **Custom Table Builder**:
  - Antarmuka visual untuk membuat tabel baru secara kustom (menentukan nama tabel, kolom, tipe data `INT`/`VARCHAR`/`DECIMAL`/`DATE`, Primary Key, dan `NOT NULL`).

- **Latihan Soal & Kuis Otomatis**:
  - Kuis pemahaman konsep di setiap pertemuan dengan umpan balik langsung dan penjelasan jawaban.
  - Tantangan query praktik dengan verifikasi otomatis hasil eksekusi.

- **Offline Ready & Zero Backend Dependency**:
  - Berjalan sepenuhnya di sisi klien (*client-side*) menggunakan Single Page Application (SPA) murni dengan ES Modules dan LocalStorage.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+ Modules)
- **Styling**: Vanilla CSS (ITENAS Brand System: White & ITENAS Orange `#EA580C`)
- **Typography**: Inter & JetBrains Mono (Google Fonts)
- **In-Memory SQL Engine**: Custom Relational Query Evaluator
- **Hosting Target**: Vercel (Edge CDN)

---

## 📁 Struktur Berkas

```text
├── css/
│   └── style.css            # Desain sistem ITENAS White & Orange, responsif & modern
├── js/
│   ├── app.js               # Router SPA & orchestrator aplikasi
│   ├── sqlEngine.js         # Engine eksekusi in-memory SQL
│   ├── state.js             # State management (LocalStorage)
│   ├── components/
│   │   ├── landing.js       # Halaman beranda & roadmap 14 pertemuan
│   │   ├── meetingView.js   # Tampilan detail modul pertemuan kuliah
│   │   ├── playground.js    # Simulator visual SQL & custom table builder
│   │   ├── quizModal.js     # Modal kuis evaluasi
│   │   └── assignmentModal.js # Modal instruksi tugas praktikum
│   └── data/
│       └── meetings.js      # Kurikulum lengkap Pertemuan 1 - 14
├── index.html               # Entry point SPA
├── logo.png                 # Logo resmi ITENAS
├── vercel.json              # Konfigurasi routing rewrite SPA untuk Vercel
└── README.md                # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Secara Lokal

Karena proyek ini menggunakan ES Modules (`import`/`export`), aplikasi harus dijalankan melalui server web lokal (bukan dibuka langsung via `file://`).

### Opsi 1: Menggunakan Python (Bawaan)
```bash
python -m http.server 8080
```
Buka browser di: [http://localhost:8080](http://localhost:8080)

### Opsi 2: Menggunakan Node.js / npx
```bash
npx serve .
```

### Opsi 3: Menggunakan VS Code Live Server
Klik kanan pada berkas `index.html` lalu pilih **Open with Live Server**.

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dilengkapi dengan berkas `vercel.json` untuk menangani routing SPA.

### Langkah 1: Inisialisasi & Push ke GitHub
```bash
# Inisialisasi git jika belum
git init

# Tambahkan seluruh berkas
git add .

# Buat commit pertama
git commit -m "feat: initial commit SIMLAB DB ITENAS"

# Tentukan branch utama
git branch -M main

# Hubungkan dengan remote repository GitHub Anda
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# Push ke GitHub
git push -u origin main
```

### Langkah 2: Deploy di Vercel
1. Masuk ke dashboard [Vercel](https://vercel.com).
2. Klik tombol **Add New...** ➔ **Project**.
3. Pilih repositori GitHub `SIMLAB DB` yang telah Anda push.
4. Pada bagian **Configure Project**:
   - **Framework Preset**: Pilih `Other`
   - **Root Directory**: `./` (biarkan default)
   - **Build and Output Settings**: Biarkan kosong (tidak memerlukan build step)
5. Klik **Deploy**.
6. Aplikasi Anda akan langsung aktif di URL `https://nama-repo.vercel.app`.

---

## 🏛️ Hak Cipta & Lisensi

Dikembangkan untuk keperluan akademik mata kuliah **Pemrograman Basis Data**  
**Institut Teknologi Nasional (ITENAS) Bandung**  
© 2026 ITENAS. Seluruh hak cipta dilindungi.
