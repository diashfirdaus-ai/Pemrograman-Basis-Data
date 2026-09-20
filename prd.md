Tentu. Saya buatkan **PRD (Product Requirements Document)** untuk website pembelajaran mata kuliah **Pemrograman Basis Data**, dengan struktur **14 pertemuan**. Konsepnya bisa digunakan sebagai acuan langsung untuk membangun website menggunakan React/Next.js, Laravel, atau stack lainnya.

# PRD — Website Pembelajaran Pemrograman Basis Data

**Nama Produk:** DBLearn — Pemrograman Basis Data
**Platform:** Web Responsive
**Target Pengguna:** Mahasiswa dan Dosen
**Durasi Pembelajaran:** 14 Pertemuan
**Bahasa:** Indonesia
**Jenis:** Learning Management System (LMS) khusus mata kuliah

---

# 1. Product Overview

## 1.1 Deskripsi

DBLearn adalah website pembelajaran interaktif yang dirancang khusus untuk mendukung proses pembelajaran mata kuliah **Pemrograman Basis Data** selama 14 pertemuan.

Website menyediakan materi pembelajaran secara terstruktur mulai dari konsep dasar database, SQL, pemrograman database, hingga pengembangan aplikasi yang terintegrasi dengan database.

Mahasiswa dapat:

* Membaca materi setiap pertemuan.
* Melihat video pembelajaran.
* Mempelajari contoh kode.
* Mencoba SQL secara langsung.
* Mengerjakan latihan.
* Mengikuti kuis.
* Mengumpulkan tugas.
* Melihat progres pembelajaran.
* Mengakses proyek akhir.

Dosen dapat:

* Mengelola materi.
* Membuat kuis.
* Membuat tugas.
* Melihat progres mahasiswa.
* Memberikan nilai.
* Mengelola database latihan.
* Mengelola pengumuman.

---

# 2. Tujuan Produk

Website dibuat untuk mencapai beberapa tujuan:

1. Menyediakan materi pembelajaran yang terstruktur selama 14 pertemuan.
2. Membantu mahasiswa memahami konsep database secara bertahap.
3. Menggabungkan teori dengan praktik SQL.
4. Memberikan lingkungan latihan SQL secara interaktif.
5. Membantu mahasiswa memahami hubungan antara aplikasi dan database.
6. Meningkatkan keterlibatan mahasiswa dalam pembelajaran.
7. Memudahkan dosen dalam mengelola materi dan evaluasi.
8. Menyediakan dokumentasi pembelajaran yang dapat diakses kapan saja.

---

# 3. Target Pengguna

## 3.1 Mahasiswa

Mahasiswa dapat:

* Login.
* Melihat dashboard.
* Melihat RPS/perkuliahan.
* Membuka materi.
* Menjalankan SQL.
* Mengikuti kuis.
* Mengumpulkan tugas.
* Melihat nilai.
* Melihat progres pembelajaran.

## 3.2 Dosen

Dosen dapat:

* Mengelola materi.
* Mengelola pertemuan.
* Membuat kuis.
* Membuat tugas.
* Melihat hasil mahasiswa.
* Memberikan feedback.
* Mengelola database sandbox.
* Melihat statistik kelas.

---

# 4. Struktur Website

Struktur utama:

```text
DBLearn
│
├── Landing Page
│
├── Login
│
├── Register
│
├── Dashboard
│
├── Mata Kuliah
│   └── Pemrograman Basis Data
│
├── Pertemuan
│   ├── Pertemuan 1
│   ├── Pertemuan 2
│   ├── Pertemuan 3
│   ├── ...
│   └── Pertemuan 14
│
├── SQL Playground
│
├── Kuis
│
├── Tugas
│
├── Proyek Akhir
│
├── Nilai
│
├── Progress
│
└── Profil
```

---

# 5. Landing Page

Landing page menjadi halaman pertama sebelum pengguna login.

## Section

### Hero

**Judul:**

> Kuasai Pemrograman Basis Data dari Konsep hingga Implementasi

**Subtitle:**

> Pelajari database, SQL, pemrograman database, dan integrasi database dengan aplikasi melalui pembelajaran terstruktur selama 14 pertemuan.

CTA:

* `Mulai Belajar`
* `Lihat Silabus`

---

## Feature Section

Menampilkan fitur:

### 📚 Materi Terstruktur

Materi pembelajaran berdasarkan 14 pertemuan.

### 💻 SQL Playground

Menjalankan SQL langsung dari browser.

### 📝 Quiz & Exercise

Latihan untuk menguji pemahaman.

### 📊 Progress Tracking

Pantau perkembangan pembelajaran.

### 🚀 Final Project

Membangun aplikasi berbasis database.

---

# 6. Dashboard Mahasiswa

Setelah login mahasiswa masuk ke dashboard.

## Komponen

```text
Halo, Diash!

Pemrograman Basis Data
Progress: █████████░ 85%

Pertemuan Saat Ini
Pertemuan 7
Database Programming

[ Lanjutkan Belajar ]
```

Kemudian:

### Statistik

```text
14 Pertemuan
7 Selesai
12 Quiz
8 Tugas
1 Final Project
```

---

# 7. Struktur Halaman Pertemuan

Setiap pertemuan memiliki template yang sama.

```text
Pertemuan 01
Pengantar Basis Data

├── Learning Objectives
├── Materi
├── Video
├── Contoh
├── Code Example
├── SQL Playground
├── Latihan
├── Quiz
└── Assignment
```

---

# 8. Rencana Materi 14 Pertemuan

Berikut struktur materi utama yang disarankan.

---

# Pertemuan 1 — Pengantar Basis Data

## Topik

* Pengertian data
* Informasi
* Database
* Database Management System
* Database Programming
* RDBMS
* Contoh penggunaan database

## Materi

### 1. Data vs Informasi

Mahasiswa memahami perbedaan data dan informasi.

### 2. Database

Database sebagai kumpulan data yang terstruktur.

### 3. DBMS

Mengenalkan:

* MySQL
* PostgreSQL
* SQL Server
* Oracle

### 4. Arsitektur Database

```text
User
  ↓
Application
  ↓
DBMS
  ↓
Database
```

## Praktik

Instalasi:

* MySQL/PostgreSQL
* DBeaver/Workbench
* VS Code

## Quiz

10 soal pilihan ganda.

## Assignment

> Instalasi environment database dan membuat database pertama.

---

# Pertemuan 2 — Database Design & ERD

## Capaian Pembelajaran

1. Memahami 3 level siklus perancangan basis data: Konseptual (ERD), Logikal (Relational Schema), dan Fisikal (DDL/DBMS).
2. Mengidentifikasi komponen ERD: Entitas Kuat (Strong Entity) vs Entitas Lemah (Weak Entity).
3. Mengklasifikasikan taksonomi atribut: Simple vs Composite, Single-valued vs Multi-valued, Stored vs Derived.
4. Menganalisis hierarki kunci relasional: Super Key, Candidate Key, Primary Key (PK), Alternate Key, dan Foreign Key (FK).
5. Menerapkan rasio kardinalitas (1:1, 1:N, M:N) serta batasan partisipasi (Mandatory vs Optional) menggunakan notasi Crow's Foot.
6. Menguasai 6 aturan emas transformasi diagram ERD ke skema tabel relasional SQL.

## Topik Utama

* **Siklus Perancangan Basis Data**: Conceptual Design (ERD) ➔ Logical Design (Relational Schema) ➔ Physical Design (DDL & Storage Engine).
* **Entitas**: Strong Entity (persegi panjang tunggal) vs Weak Entity (persegi panjang ganda, bergantung pada owner entity & memiliki partial key).
* **Atribut**: Simple vs Composite, Single-valued vs Multi-valued, Stored vs Derived.
* **Kunci Relasional**: Super Key, Candidate Key, Primary Key, Alternate Key, Foreign Key.
* **Relasi & Kardinalitas**:
  - Derajat relasi: Unary (Recursive), Binary, Ternary.
  - Kardinalitas: 1:1, 1:N, M:N (Junction Table).
  - Batasan Partisipasi: Total (Mandatory) vs Partial (Optional).
  - Notasi Crow's Foot: `||` (Exactly One), `0|` (Zero or One), `|{` (One or Many), `0{` (Zero or Many).
* **6 Aturan Transformasi ERD ke Relasional**:
  1. Strong Entity ➔ Tabel tersendiri dengan Primary Key.
  2. Weak Entity ➔ Tabel tersendiri dengan Composite PK (Owner PK + Partial Key).
  3. Relasi 1:1 ➔ Foreign Key pada tabel dengan total participation (+ UNIQUE constraint).
  4. Relasi 1:N ➔ Foreign Key diletakkan pada sisi 'N' (Many).
  5. Relasi M:N ➔ Wajib membuat Junction Table (Tabel Perantara) dengan Composite PK dari kedua FK.
  6. Multi-valued Attribute ➔ Tabel anak baru dengan FK merujuk ke tabel induk.

## Studi Kasus: Sistem Akademik ITENAS

Skema relasional:
- `dosen` (nidn [PK], nama_dosen, email, jurusan, jabatan)
- `matakuliah` (kode_mk [PK], nama_mk, sks, jurusan, semester)
- `mahasiswa` (nim [PK], nama, jurusan, angkatan, ipk, email, nidn_wali [FK])
- `nilai` (id [PK], nim [FK], kode_mk [FK], semester, nilai_huruf, nilai_angka, tahun_ajaran)

Hubungan relasi:
```text
DOSEN (1) ─────────── membimbing ───────────< (N) MAHASISWA
MAHASISWA (1) ─────── memiliki riwayat ─────< (N) NILAI (Junction Table)
MATAKULIAH (1) ────── dinilai dalam ────────< (N) NILAI (Junction Table)
```

## Praktik & SQL Playground

Mahasiswa mempraktikkan pembuatan skema DDL terintegrasi dan mengeksekusi multi-table query relasional:

```sql
SELECT 
    m.nim, 
    m.nama AS nama_mahasiswa, 
    m.jurusan, 
    mk.nama_mk, 
    mk.sks, 
    n.nilai_huruf, 
    n.tahun_ajaran
FROM mahasiswa m
JOIN nilai n ON m.nim = n.nim
JOIN matakuliah mk ON n.kode_mk = mk.kode_mk
ORDER BY m.nim ASC, mk.kode_mk ASC;
```

## Evaluasi & Kuis

- Kuis 5 soal komprehensif (pemecahan relasi M:N, integritas PK, Weak Entity, Derived Attribute, dan peletakan FK).

## Tugas 2

Merancang ERD & Skema Relasional: **Sistem Informasi Perpustakaan ITENAS**
- Entitas wajib: Anggota, Petugas, Buku, Peminjaman, Detail Peminjaman (Junction).
- Deliverable: Diagram Crow's Foot, Kamus Data, dan Skrip SQL DDL dengan Foreign Key constraint.

---

# Pertemuan 3 — Relational Database & Normalisasi

## Materi

* Relational model
* Table
* Row
* Column
* Primary key
* Foreign key
* Functional dependency
* Normalisasi

## Normalisasi

Membahas:

### 1NF

### 2NF

### 3NF

Contoh:

```text
Mahasiswa
NIM
Nama
MataKuliah
Dosen
```

Kemudian dipecah menjadi beberapa tabel.

## Praktik

Normalisasi database akademik.

---

# Pertemuan 4 — SQL Dasar

## Materi

SQL fundamentals:

```sql
CREATE DATABASE akademik;
```

Membuat tabel:

```sql
CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100)
);
```

Insert:

```sql
INSERT INTO mahasiswa
VALUES ('101', 'Budi', 'budi@mail.com');
```

Select:

```sql
SELECT * FROM mahasiswa;
```

## Materi SQL

* CREATE
* INSERT
* SELECT
* UPDATE
* DELETE

## SQL Playground

Mahasiswa dapat menjalankan query langsung.

---

# Pertemuan 5 — SQL Query & Filtering

## Materi

* WHERE
* AND
* OR
* NOT
* LIKE
* BETWEEN
* IN
* ORDER BY
* LIMIT

Contoh:

```sql
SELECT *
FROM mahasiswa
WHERE nama LIKE 'A%';
```

## Praktik

Filtering data mahasiswa.

## Quiz

SQL debugging.

---

# Pertemuan 6 — JOIN & Relasi Antar Tabel

Ini menjadi salah satu materi utama.

## Materi

* INNER JOIN
* LEFT JOIN
* RIGHT JOIN
* CROSS JOIN

Contoh:

```sql
SELECT
    mahasiswa.nama,
    mata_kuliah.nama_mk
FROM mahasiswa
JOIN krs
ON mahasiswa.nim = krs.nim
JOIN mata_kuliah
ON krs.kode_mk = mata_kuliah.kode_mk;
```

## Visualisasi

Website menampilkan diagram:

```text
Mahasiswa
     │
     ▼
    KRS
     │
     ▼
Mata Kuliah
```

---

# Pertemuan 7 — Aggregate Function & Grouping

## Materi

* COUNT
* SUM
* AVG
* MIN
* MAX
* GROUP BY
* HAVING

Contoh:

```sql
SELECT
    prodi,
    COUNT(*) AS jumlah_mahasiswa
FROM mahasiswa
GROUP BY prodi;
```

## Studi Kasus

Analisis:

* Jumlah mahasiswa.
* Rata-rata nilai.
* Jumlah mahasiswa per prodi.
* Nilai tertinggi.
* Nilai terendah.

---

# Pertemuan 8 — Subquery & Advanced Query

## Materi

* Subquery
* Nested query
* EXISTS
* NOT EXISTS
* IN
* Correlated subquery

Contoh:

```sql
SELECT nama
FROM mahasiswa
WHERE nim IN (
    SELECT nim
    FROM krs
);
```

## Challenge

> Cari mahasiswa yang memiliki nilai di atas rata-rata kelas.

---

# Pertemuan 9 — Database Programming

Mulai masuk ke konsep **pemrograman database**.

## Materi

* Stored Procedure
* Function
* Parameter
* Variable
* Control Flow

Contoh:

```sql
CREATE PROCEDURE getMahasiswa()
BEGIN
    SELECT * FROM mahasiswa;
END;
```

## Praktik

Membuat:

```text
getMahasiswa()
getMahasiswaByProdi()
hitungJumlahMahasiswa()
```

---

# Pertemuan 10 — Trigger & Transaction

## Trigger

Contoh:

```text
INSERT data
      ↓
Trigger
      ↓
Audit Log
```

Materi:

* BEFORE INSERT
* AFTER INSERT
* BEFORE UPDATE
* AFTER UPDATE

## Transaction

```sql
BEGIN;

UPDATE rekening
SET saldo = saldo - 100000;

UPDATE rekening
SET saldo = saldo + 100000;

COMMIT;
```

Materi:

* COMMIT
* ROLLBACK
* ACID

## Studi Kasus

Sistem transaksi bank sederhana.

---

# Pertemuan 11 — Database Connection

Mahasiswa mulai menghubungkan aplikasi dengan database.

## Arsitektur

```text
Frontend
   ↓
Backend
   ↓
Database Driver
   ↓
Database
```

## Materi

* Database connection
* Connection string
* CRUD
* Prepared statement
* Query parameter

Contoh:

```text
Application
     │
     ▼
Database Driver
     │
     ▼
MySQL
```

---

# Pertemuan 12 — CRUD Application

Mahasiswa membuat aplikasi sederhana.

## Fitur

```text
Mahasiswa
│
├── Create
├── Read
├── Update
└── Delete
```

Contoh aplikasi:

> Sistem Manajemen Data Mahasiswa

Halaman:

```text
Dashboard

[ + Tambah Mahasiswa ]

--------------------------------
NIM | Nama | Prodi | Action
--------------------------------
001 | Budi | IF    | Edit Delete
002 | Siti | SI    | Edit Delete
```

---

# Pertemuan 13 — Security & Optimization Database

## Database Security

Materi:

* SQL Injection
* Prepared Statement
* User privilege
* Authentication
* Authorization
* Password hashing
* Backup

Contoh serangan:

```sql
' OR '1'='1
```

Kemudian mahasiswa memahami bagaimana prepared statement mencegah manipulasi query.

## Optimization

* Index
* Query optimization
* EXPLAIN
* Database normalization
* Denormalization

Contoh:

```sql
CREATE INDEX idx_nama
ON mahasiswa(nama);
```

---

# Pertemuan 14 — Final Project & Presentation

Pertemuan terakhir digunakan untuk proyek akhir.

## Final Project

Mahasiswa membuat aplikasi yang menggunakan database.

Pilihan:

### Sistem Akademik

```text
Mahasiswa
Dosen
Mata Kuliah
KRS
Nilai
```

### Sistem Perpustakaan

```text
Anggota
Buku
Peminjaman
Pengembalian
```

### Sistem Inventori

```text
Produk
Kategori
Supplier
Transaksi
Stok
```

### Sistem Rumah Sakit

```text
Pasien
Dokter
Pemeriksaan
Obat
Pembayaran
```

---

# 9. Final Project Requirement

Mahasiswa wajib memiliki:

### Database

Minimal:

* 5 tabel
* Primary key
* Foreign key
* Relationship

### SQL

Minimal:

* CRUD
* JOIN
* Aggregate
* Subquery
* Transaction

### Database Programming

Minimal:

* 1 Procedure
* 1 Function
* 1 Trigger

### Application

Minimal:

* Login
* Dashboard
* CRUD
* Search
* Filter
* Report

---

# 10. SQL Playground

Fitur utama website.

Mahasiswa dapat menulis:

```sql
SELECT *
FROM mahasiswa;
```

Kemudian menekan:

**Run Query**

Output:

```text
Query executed successfully

┌─────┬─────────┬─────────────┐
│ NIM │ Nama    │ Prodi       │
├─────┼─────────┼─────────────┤
│ 001 │ Budi    │ Informatika │
│ 002 │ Siti    │ Informatika │
└─────┴─────────┴─────────────┘
```

## Fitur tambahan

* Syntax highlighting
* Auto completion
* Query history
* Reset database
* Clear output
* Error explanation

---

# 11. Interactive Learning

Setiap materi tidak hanya berupa teks.

Format:

```text
📖 Materi
     ↓
💡 Contoh
     ↓
💻 Coding
     ↓
🧪 Practice
     ↓
📝 Quiz
     ↓
🎯 Assignment
```

---

# 12. Sistem Quiz

Jenis soal:

### Multiple Choice

> Apa fungsi PRIMARY KEY?

### True / False

> FOREIGN KEY digunakan untuk menghubungkan tabel.

### SQL Question

```sql
SELECT _____ FROM mahasiswa;
```

### Query Challenge

Mahasiswa harus menghasilkan query tertentu.

---

# 13. Sistem Tugas

Setiap pertemuan dapat memiliki tugas.

Contoh:

```text
Assignment #06

Judul:
Implementasi JOIN

Deadline:
20 September 2026

Instruksi:
Buat query untuk menampilkan mahasiswa
beserta mata kuliah yang diambil.

Upload:
.sql / .pdf

[ Upload Assignment ]
```

---

# 14. Progress Tracking

Dashboard mahasiswa menampilkan:

```text
Learning Progress

Pertemuan 01   ██████████ 100%
Pertemuan 02   ██████████ 100%
Pertemuan 03   ██████████ 100%
Pertemuan 04   ████████░░ 80%
Pertemuan 05   ██████░░░░ 60%
...
```

## Status

* Not Started
* In Progress
* Completed

---

# 15. Sistem Nilai

Kategori:

| Komponen      |    Bobot |
| ------------- | -------: |
| Quiz          |      15% |
| Assignment    |      20% |
| Praktikum     |      20% |
| UTS           |      20% |
| Final Project |      25% |
| **Total**     | **100%** |

Bobot dapat diubah oleh dosen.

---

# 16. Dashboard Dosen

Dosen mendapatkan dashboard berbeda.

```text
Dashboard Dosen

Pemrograman Basis Data

Total Mahasiswa
42

Aktif Minggu Ini
38

Rata-rata Nilai
82.4

Assignment Pending
17
```

---

# 17. Manajemen Pertemuan

Dosen dapat:

```text
Pertemuan 01
[Edit] [Preview]

Pertemuan 02
[Edit] [Preview]

...

Pertemuan 14
[Edit] [Preview]
```

Editor mendukung:

* Text
* Heading
* Image
* Video
* Code
* SQL
* Quiz
* Assignment

---

# 18. Manajemen Quiz

Dosen dapat membuat:

```text
Quiz #05

Question:
Apa fungsi WHERE?

Type:
Multiple Choice

A. Mengurutkan data
B. Memfilter data
C. Menghapus data
D. Menggabungkan tabel

Correct Answer:
B

Points:
10
```

---

# 19. Database Schema Website

Contoh database sistem:

```text
users
│
├── id
├── name
├── email
├── password
└── role

courses
│
├── id
├── name
├── description
└── semester

meetings
│
├── id
├── course_id
├── meeting_number
├── title
└── content

materials
│
├── id
├── meeting_id
├── title
├── content
└── video_url

quizzes
│
├── id
├── meeting_id
└── title

questions
│
├── id
├── quiz_id
├── question
└── points

assignments
│
├── id
├── meeting_id
├── title
├── description
└── deadline

submissions
│
├── id
├── assignment_id
├── user_id
├── file_url
├── score
└── feedback

progress
│
├── id
├── user_id
├── meeting_id
└── status

quiz_results
│
├── id
├── quiz_id
├── user_id
└── score
```

---

# 20. Arsitektur Sistem

```text
                  DBLearn
                     │
        ┌────────────┴────────────┐
        │                         │
    Mahasiswa                  Dosen
        │                         │
        └──────────┬──────────────┘
                   │
                   ▼
             Web Application
                   │
        ┌──────────┴──────────┐
        │                     │
     Frontend              Backend
        │                     │
        │              ┌──────┴──────┐
        │              │             │
        │           REST API      Auth
        │              │
        └──────────────┤
                       ▼
                  Database
                       │
             ┌─────────┴─────────┐
             │                   │
        LMS Database       SQL Sandbox
```

---

# 21. Teknologi yang Disarankan

## Frontend

Saya menyarankan:

* Next.js
* React
* Tailwind CSS
* Monaco Editor

Monaco Editor digunakan untuk SQL Playground.

## Backend

Pilihan:

**Option A**

```text
Next.js
+
Node.js
+
PostgreSQL
```

atau

**Option B**

```text
Laravel
+
MySQL
+
React
```

Untuk kebutuhan akademik, keduanya cocok.

---

# 22. UI Design

Gaya visual:

**Modern Academic + Developer**

Warna dasar:

```text
Background
#F8FAFC

Primary
#2563EB

Text
#0F172A

Success
#16A34A

Warning
#F59E0B

Error
#DC2626
```

Namun desain sebaiknya tetap sederhana dan tidak terlalu ramai.

---

# 23. Navigation

Sidebar mahasiswa:

```text
🏠 Dashboard

📚 Mata Kuliah
   └─ Pemrograman Basis Data

📖 Pertemuan
   ├─ Pertemuan 1
   ├─ Pertemuan 2
   ├─ ...
   └─ Pertemuan 14

💻 SQL Playground

📝 Quiz

📋 Tugas

🚀 Final Project

📊 Nilai

📈 Progress

👤 Profile
```

---

# 24. Fitur AI

Website juga dapat ditambahkan **AI Learning Assistant**.

Contoh:

```text
┌──────────────────────────────┐
│ 🤖 DB Assistant              │
│                              │
│ Kenapa query saya error?     │
│                              │
│ SELECT * FROM mahasiswa      │
│ WHERE nama = Budi;           │
│                              │
│ [ Ask AI ]                   │
└──────────────────────────────┘
```

AI dapat membantu:

* Menjelaskan error SQL.
* Menjelaskan konsep database.
* Memberikan hint.
* Menjelaskan JOIN.
* Menjelaskan query.
* Membuat latihan tambahan.

**Catatan:** AI sebaiknya tidak langsung memberikan jawaban tugas, tetapi dapat memberikan **hint dan penjelasan konsep**.

---

# 25. Learning Path

Website dapat memberikan visualisasi:

```text
DATABASE FUNDAMENTAL
        │
        ▼
      ERD
        │
        ▼
 NORMALIZATION
        │
        ▼
       SQL
        │
        ▼
      JOIN
        │
        ▼
 ADVANCED SQL
        │
        ▼
DATABASE PROGRAMMING
        │
        ▼
DATABASE TRANSACTION
        │
        ▼
APPLICATION DATABASE
        │
        ▼
DATABASE SECURITY
        │
        ▼
 FINAL PROJECT
```

Ini akan membuat mahasiswa memahami bahwa **14 pertemuan merupakan satu perjalanan pembelajaran**, bukan materi yang berdiri sendiri.

---

# 26. Acceptance Criteria

Website dianggap memenuhi requirement apabila:

### Authentication

* [ ] Mahasiswa dapat login.
* [ ] Dosen dapat login.
* [ ] Role mahasiswa/dosen dibedakan.

### Learning

* [ ] Tersedia 14 pertemuan.
* [ ] Setiap pertemuan memiliki materi.
* [ ] Materi dapat dibaca.
* [ ] Video dapat ditampilkan.
* [ ] Code example dapat ditampilkan.

### SQL

* [ ] Mahasiswa dapat menulis SQL.
* [ ] Mahasiswa dapat menjalankan query.
* [ ] Output query dapat ditampilkan.
* [ ] Error query dapat ditampilkan.

### Evaluation

* [ ] Quiz dapat dikerjakan.
* [ ] Nilai quiz dihitung otomatis.
* [ ] Assignment dapat dikumpulkan.
* [ ] Dosen dapat memberikan nilai.

### Progress

* [ ] Progress mahasiswa tercatat.
* [ ] Pertemuan selesai dapat ditandai.
* [ ] Dashboard menampilkan persentase progress.

---

# 27. MVP

Untuk versi pertama, saya sarankan jangan langsung membangun seluruh fitur.

### Phase 1 — Core LMS

```text
Login
↓
Dashboard
↓
14 Pertemuan
↓
Materi
↓
Quiz
↓
Progress
```

### Phase 2 — Database Learning

```text
SQL Playground
↓
Query Execution
↓
Database Sandbox
↓
SQL Challenge
```

### Phase 3 — Assessment

```text
Assignment
↓
Submission
↓
Grading
↓
Feedback
```

### Phase 4 — Advanced

```text
AI Assistant
Analytics
Leaderboard
Gamification
Final Project
```

---

# 28. Konsep Halaman Utama yang Saya Rekomendasikan

Dashboard mahasiswa sebaiknya tidak langsung penuh dengan daftar menu. Fokuskan pada **"Lanjutkan Belajar"**.

Contohnya:

```text
┌──────────────────────────────────────────────────────┐
│ DBLearn                              🔔  👤 Diash    │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│ Dashboard     │  Pemrograman Basis Data              │
│               │                                      │
│ Pertemuan     │  Progress                            │
│               │  ███████████████░░░ 78%             │
│ SQL Playground│                                      │
│               │  ┌────────────────────────────────┐  │
│ Quiz          │  │ Pertemuan 8                    │  │
│               │  │ Subquery & Advanced Query      │  │
│ Tugas         │  │                                │  │
│               │  │ [ Lanjutkan Belajar ]          │  │
│ Nilai         │  └────────────────────────────────┘  │
│               │                                      │
│ Final Project │  Berikutnya                         │
│               │                                      │
│               │  🔵 SQL Challenge                   │
│               │  📝 Assignment                      │
│               │  🎯 Quiz                            │
└───────────────┴──────────────────────────────────────┘
```

Dengan struktur ini, website bukan sekadar **website penyimpan materi**, tetapi menjadi **platform pembelajaran Pemrograman Basis Data yang memiliki learning path, praktik SQL, evaluasi, progress tracking, dan final project**.

Jika ingin dikembangkan menjadi produk yang benar-benar siap dibuat, tahap berikutnya yang paling berguna adalah membuat **UI/UX lengkap seluruh halaman + sitemap + database ERD + API specification + user flow mahasiswa/dosen**. Saya juga bisa membuat **gambar arsitektur aplikasi DBLearn** yang mudah dipahami oleh mahasiswa maupun orang awam.
