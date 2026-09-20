// Mock Data for Users, Submissions, Announcements, and Class Stats
export const MOCK_USERS = {
  student: {
    id: 'usr_student_01',
    name: 'Diash Firdaus',
    identifier: '152022001',
    email: 'diash.firdaus@mhs.itenas.ac.id',
    role: 'mahasiswa',
    prodi: 'Informatika - ITENAS',
    avatar: 'DF',
    currentMeetingId: 7
  },
  lecturer: {
    id: 'usr_lecturer_01',
    name: 'Dr. Irwan Setiawan, M.T.',
    identifier: '0412018801',
    email: 'irwan.setiawan@itenas.ac.id',
    role: 'dosen',
    prodi: 'Teknik Informatika - ITENAS',
    avatar: 'IS'
  }
};

export const ANNOUNCEMENTS = [
  {
    id: 'ann_1',
    title: 'Batas Pengumpulan Tugas 6 (JOIN Multi-Table)',
    date: '20 September 2026',
    author: 'Dr. Irwan Setiawan, M.T.',
    content: 'Diberitahukan kepada seluruh mahasiswa kelas IF-B, tugas implementasi JOIN pada sistem perpustakaan dikumpulkan paling lambat hari Minggu pukul 23.59 WIB di portal DBLearn.'
  },
  {
    id: 'ann_2',
    title: 'Jadwal Praktikum Pertemuan 7: Agregasi & Grouping',
    date: '18 September 2026',
    author: 'Tim Asisten Lab PBD',
    content: 'Praktikum minggu ini akan membahas analisis query agregat menggunakan dataset transaksi e-commerce. Harap pastikan browser Anda telah membuka modul DBLearn SQL Playground.'
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    id: 'sub_1',
    assignmentId: 'asg_1',
    studentNim: '152022001',
    studentName: 'Diash Firdaus',
    submittedAt: '2026-09-15 14:30',
    content: 'CREATE DATABASE sistem_akademik;\nCREATE TABLE identitas_mahasiswa (nim VARCHAR(20) PRIMARY KEY, nama VARCHAR(100), prodi VARCHAR(50));\nINSERT INTO identitas_mahasiswa VALUES (\'152022001\', \'Diash Firdaus\', \'Informatika\');',
    status: 'graded',
    score: 95,
    feedback: 'Sangat baik, struktur DDL dan DML tepat dan sudah teruji.'
  },
  {
    id: 'sub_2',
    assignmentId: 'asg_2',
    studentNim: '152022001',
    studentName: 'Diash Firdaus',
    submittedAt: '2026-09-17 19:10',
    content: 'ERD Sistem Perpustakaan: Entitas Anggota (1) -- meminjam -- (N) Peminjaman -- memuat -- (N) Buku. Disertai junction table detail_peminjaman.',
    status: 'graded',
    score: 90,
    feedback: 'Identifikasi entitas dan normalisasi relasi M:N sudah benar.'
  },
  {
    id: 'sub_3',
    assignmentId: 'asg_3',
    studentNim: '152022001',
    studentName: 'Diash Firdaus',
    submittedAt: '2026-09-19 11:20',
    content: 'Normalisasi Faktur: 1NF menghilangkan atribut perulangan barang, 2NF memisahkan tabel pelanggan dan produk, 3NF memisahkan subtotal terhitung.',
    status: 'graded',
    score: 88,
    feedback: 'Bagus, perhatikan kembali atribut turunan pada 3NF.'
  },
  {
    id: 'sub_4',
    assignmentId: 'asg_6',
    studentNim: '152022001',
    studentName: 'Diash Firdaus',
    submittedAt: '2026-09-20 09:15',
    content: 'SELECT a.nama, b.judul, p.tgl_pinjam, p.status FROM anggota a LEFT JOIN peminjaman p ON a.id_anggota = p.id_anggota LEFT JOIN detail_peminjaman dp ON p.id_pinjam = dp.id_pinjam LEFT JOIN buku b ON dp.id_buku = b.id_buku;',
    status: 'pending',
    score: null,
    feedback: null
  },
  {
    id: 'sub_5',
    assignmentId: 'asg_6',
    studentNim: '152022002',
    studentName: 'Budi Santoso',
    submittedAt: '2026-09-20 10:45',
    content: 'SELECT * FROM anggota JOIN peminjaman ON anggota.id_anggota = peminjaman.id_anggota;',
    status: 'pending',
    score: null,
    feedback: null
  },
  {
    id: 'sub_6',
    assignmentId: 'asg_6',
    studentNim: '152022003',
    studentName: 'Siti Rahmawati',
    submittedAt: '2026-09-20 11:00',
    content: 'SELECT anggota.nama, buku.judul FROM anggota LEFT JOIN peminjaman ON anggota.id_anggota = peminjaman.id_anggota;',
    status: 'pending',
    score: null,
    feedback: null
  }
];

export const INITIAL_QUIZ_SCORES = {
  '152022001': {
    1: 100,
    2: 100,
    3: 100,
    4: 100,
    5: 85,
    6: 90
  }
};

export const CLASS_STUDENTS = [
  { nim: '152022001', name: 'Diash Firdaus', prodi: 'Informatika', quizAvg: 95.8, asgAvg: 91.0, praktikum: 90, uts: 88, finalProject: 92 },
  { nim: '152022002', name: 'Budi Santoso', prodi: 'Informatika', quizAvg: 82.0, asgAvg: 80.0, praktikum: 85, uts: 78, finalProject: 80 },
  { nim: '152022003', name: 'Siti Rahmawati', prodi: 'Sistem Informasi', quizAvg: 88.5, asgAvg: 85.0, praktikum: 88, uts: 84, finalProject: 85 },
  { nim: '152022004', name: 'Ahmad Fauzi', prodi: 'Informatika', quizAvg: 75.0, asgAvg: 78.0, praktikum: 76, uts: 72, finalProject: 75 },
  { nim: '152022005', name: 'Dewi Lestari', prodi: 'Sistem Informasi', quizAvg: 90.0, asgAvg: 88.0, praktikum: 92, uts: 86, finalProject: 89 },
  { nim: '152022006', name: 'Rian Pratama', prodi: 'Teknik Elektro', quizAvg: 70.0, asgAvg: 72.0, praktikum: 74, uts: 68, finalProject: 70 }
];
