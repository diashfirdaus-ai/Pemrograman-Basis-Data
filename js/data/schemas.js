// Database Schemas & Realistic Seed Data for DBLearn ITENAS
// Comprehensive dataset for academic lab practice

export const SAMPLE_SCHEMAS = {
  akademik: {
    name: 'Sistem Akademik ITENAS',
    description: 'Database akademik mahasiswa, dosen, mata kuliah, dan nilai perkuliahan',
    tables: {
      mahasiswa: {
        name: 'mahasiswa',
        columns: [
          { name: 'nim', type: 'VARCHAR(20)', pk: true },
          { name: 'nama', type: 'VARCHAR(100)', pk: false },
          { name: 'jurusan', type: 'VARCHAR(50)', pk: false },
          { name: 'angkatan', type: 'INT', pk: false },
          { name: 'ipk', type: 'FLOAT', pk: false },
          { name: 'email', type: 'VARCHAR(100)', pk: false }
        ],
        rows: [
          { nim: "2021001", nama: "Andi Wijaya", jurusan: "Informatika", angkatan: 2021, ipk: 3.85, email: "andi.wijaya@student.ac.id" },
          { nim: "2021002", nama: "Siti Rahmawati", jurusan: "Sistem Informasi", angkatan: 2021, ipk: 3.65, email: "siti.rahma@student.ac.id" },
          { nim: "2021003", nama: "Budi Santoso", jurusan: "Teknik Komputer", angkatan: 2021, ipk: 3.21, email: "budi.s@student.ac.id" },
          { nim: "2022001", nama: "Dewi Lestari", jurusan: "Informatika", angkatan: 2022, ipk: 3.92, email: "dewi.lestari@student.ac.id" },
          { nim: "2022002", nama: "Rizky Pratama", jurusan: "Informatika", angkatan: 2022, ipk: 3.45, email: "rizky.p@student.ac.id" },
          { nim: "2022003", nama: "Ayu Kartika", jurusan: "Sistem Informasi", angkatan: 2022, ipk: 3.78, email: "ayu.kartika@student.ac.id" },
          { nim: "2022004", nama: "Fajar Nugroho", jurusan: "Teknik Komputer", angkatan: 2022, ipk: 2.95, email: "fajar.n@student.ac.id" },
          { nim: "2023001", nama: "Lina Marlina", jurusan: "Informatika", angkatan: 2023, ipk: 3.88, email: "lina.m@student.ac.id" },
          { nim: "2023002", nama: "Hendra Gunawan", jurusan: "Informatika", angkatan: 2023, ipk: 3.12, email: "hendra.g@student.ac.id" },
          { nim: "2023003", nama: "Maya Sari", jurusan: "Sistem Informasi", angkatan: 2023, ipk: 3.55, email: "maya.sari@student.ac.id" },
          { nim: "2023004", nama: "Eko Prasetyo", jurusan: "Teknik Komputer", angkatan: 2023, ipk: 3.33, email: "eko.p@student.ac.id" },
          { nim: "2024001", nama: "Putri Ayu", jurusan: "Informatika", angkatan: 2024, ipk: 3.91, email: "putri.ayu@student.ac.id" },
          { nim: "2024002", nama: "Agus Saputra", jurusan: "Sistem Informasi", angkatan: 2024, ipk: 3.40, email: "agus.s@student.ac.id" },
          { nim: "2024003", nama: "Rina Wati", jurusan: "Teknik Komputer", angkatan: 2024, ipk: 3.70, email: "rina.wati@student.ac.id" },
          { nim: "2021004", nama: "Joko Widodo", jurusan: "Informatika", angkatan: 2021, ipk: 2.85, email: "joko.w@student.ac.id" },
          { nim: "2022005", nama: "Nurul Huda", jurusan: "Sistem Informasi", angkatan: 2022, ipk: 3.82, email: "nurul.h@student.ac.id" },
          { nim: "2023005", nama: "Bambang Pamungkas", jurusan: "Informatika", angkatan: 2023, ipk: 3.05, email: "bambang.p@student.ac.id" },
          { nim: "2024004", nama: "Citra Kirana", jurusan: "Informatika", angkatan: 2024, ipk: 3.95, email: "citra.k@student.ac.id" }
        ]
      },
      matakuliah: {
        name: 'matakuliah',
        columns: [
          { name: 'kode_mk', type: 'VARCHAR(10)', pk: true },
          { name: 'nama_mk', type: 'VARCHAR(100)', pk: false },
          { name: 'sks', type: 'INT', pk: false },
          { name: 'jurusan', type: 'VARCHAR(50)', pk: false },
          { name: 'semester', type: 'INT', pk: false }
        ],
        rows: [
          { kode_mk: "IF101", nama_mk: "Algoritma dan Pemrograman", sks: 3, jurusan: "Informatika", semester: 1 },
          { kode_mk: "IF102", nama_mk: "Struktur Data", sks: 3, jurusan: "Informatika", semester: 2 },
          { kode_mk: "IF201", nama_mk: "Basis Data", sks: 3, jurusan: "Informatika", semester: 3 },
          { kode_mk: "IF202", nama_mk: "Pemrograman Web", sks: 3, jurusan: "Informatika", semester: 4 },
          { kode_mk: "IF301", nama_mk: "Kecerdasan Buatan", sks: 3, jurusan: "Informatika", semester: 5 },
          { kode_mk: "SI101", nama_mk: "Pengantar Sistem Informasi", sks: 3, jurusan: "Sistem Informasi", semester: 1 },
          { kode_mk: "SI201", nama_mk: "Analisis dan Desain Sistem", sks: 3, jurusan: "Sistem Informasi", semester: 3 },
          { kode_mk: "SI202", nama_mk: "Manajemen Proyek TI", sks: 2, jurusan: "Sistem Informasi", semester: 5 },
          { kode_mk: "TK101", nama_mk: "Dasar Teknik Komputer", sks: 3, jurusan: "Teknik Komputer", semester: 1 },
          { kode_mk: "TK201", nama_mk: "Arsitektur Komputer", sks: 3, jurusan: "Teknik Komputer", semester: 3 },
          { kode_mk: "IF203", nama_mk: "Jaringan Komputer", sks: 3, jurusan: "Informatika", semester: 4 },
          { kode_mk: "SI102", nama_mk: "Basis Data Lanjut", sks: 3, jurusan: "Sistem Informasi", semester: 4 }
        ]
      },
      dosen: {
        name: 'dosen',
        columns: [
          { name: 'nidn', type: 'VARCHAR(20)', pk: true },
          { name: 'nama_dosen', type: 'VARCHAR(100)', pk: false },
          { name: 'jurusan', type: 'VARCHAR(50)', pk: false },
          { name: 'email', type: 'VARCHAR(100)', pk: false },
          { name: 'jabatan', type: 'VARCHAR(50)', pk: false }
        ],
        rows: [
          { nidn: "041001", nama_dosen: "Dr. Bambang Hartono", jurusan: "Informatika", email: "bambang.h@kampus.ac.id", jabatan: "Lektor Kepala" },
          { nidn: "041002", nama_dosen: "Prof. Siti Aminah", jurusan: "Sistem Informasi", email: "siti.aminah@kampus.ac.id", jabatan: "Guru Besar" },
          { nidn: "041003", nama_dosen: "Dr. Eko Wijaya", jurusan: "Teknik Komputer", email: "eko.w@kampus.ac.id", jabatan: "Lektor" },
          { nidn: "041004", nama_dosen: "Ir. Rina Susanti, M.Kom", jurusan: "Informatika", email: "rina.s@kampus.ac.id", jabatan: "Asisten Ahli" },
          { nidn: "041005", nama_dosen: "Dr. Andi Hermawan", jurusan: "Sistem Informasi", email: "andi.h@kampus.ac.id", jabatan: "Lektor" },
          { nidn: "041006", nama_dosen: "Dr. Dewi Puspita", jurusan: "Informatika", email: "dewi.p@kampus.ac.id", jabatan: "Lektor" }
        ]
      },
      nilai: {
        name: 'nilai',
        columns: [
          { name: 'id', type: 'INT', pk: true },
          { name: 'nim', type: 'VARCHAR(20)', pk: false, fk: { table: 'mahasiswa', column: 'nim' } },
          { name: 'kode_mk', type: 'VARCHAR(10)', pk: false, fk: { table: 'matakuliah', column: 'kode_mk' } },
          { name: 'semester', type: 'INT', pk: false },
          { name: 'nilai_huruf', type: 'VARCHAR(2)', pk: false },
          { name: 'nilai_angka', type: 'INT', pk: false },
          { name: 'tahun_ajaran', type: 'VARCHAR(20)', pk: false }
        ],
        rows: [
          { id: 1, nim: "2021001", kode_mk: "IF101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2021/2022" },
          { id: 2, nim: "2021001", kode_mk: "IF102", semester: 2, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2021/2022" },
          { id: 3, nim: "2022001", kode_mk: "IF101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2022/2023" },
          { id: 4, nim: "2022002", kode_mk: "IF101", semester: 1, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2022/2023" },
          { id: 5, nim: "2023001", kode_mk: "IF201", semester: 3, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2023/2024" },
          { id: 6, nim: "2021002", kode_mk: "SI101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2021/2022" },
          { id: 7, nim: "2022003", kode_mk: "SI101", semester: 1, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2022/2023" },
          { id: 8, nim: "2023002", kode_mk: "IF101", semester: 1, nilai_huruf: "C", nilai_angka: 2, tahun_ajaran: "2023/2024" },
          { id: 9, nim: "2021003", kode_mk: "TK101", semester: 1, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2021/2022" },
          { id: 10, nim: "2022004", kode_mk: "TK101", semester: 1, nilai_huruf: "C", nilai_angka: 2, tahun_ajaran: "2022/2023" },
          { id: 11, nim: "2023003", kode_mk: "SI201", semester: 3, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2023/2024" },
          { id: 12, nim: "2024001", kode_mk: "IF101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2024/2025" },
          { id: 13, nim: "2021001", kode_mk: "IF201", semester: 3, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2022/2023" },
          { id: 14, nim: "2022001", kode_mk: "IF102", semester: 2, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2022/2023" },
          { id: 15, nim: "2023001", kode_mk: "IF102", semester: 2, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2023/2024" },
          { id: 16, nim: "2022005", kode_mk: "SI101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2022/2023" },
          { id: 17, nim: "2023004", kode_mk: "TK201", semester: 3, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2023/2024" },
          { id: 18, nim: "2024004", kode_mk: "IF101", semester: 1, nilai_huruf: "A", nilai_angka: 4, tahun_ajaran: "2024/2025" },
          { id: 19, nim: "2021004", kode_mk: "IF101", semester: 1, nilai_huruf: "C", nilai_angka: 2, tahun_ajaran: "2021/2022" },
          { id: 20, nim: "2023005", kode_mk: "IF202", semester: 4, nilai_huruf: "B", nilai_angka: 3, tahun_ajaran: "2023/2024" }
        ]
      }
    }
  }
};
