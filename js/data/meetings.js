// Complete Curriculum Data for 14 Meetings of Pemrograman Basis Data
export const MEETINGS_DATA = [
  {
    id: 1,
    title: 'Pengantar Basis Data',
    subtitle: 'Konsep Data, Informasi, DBMS, dan Arsitektur Sistem Basis Data',
    duration: '150 Menit',
    objectives: [
      'Memahami perbedaan mendasar antara data dan informasi',
      'Mengidentifikasi karakteristik data terstruktur, semi-terstruktur, dan tidak terstruktur',
      'Mengenal konsep Database Management System (DBMS) dan fungsinya',
      'Memahami arsitektur database (User -> Application -> DBMS -> Database)',
      'Mengetahui ragam RDBMS populer (MySQL, PostgreSQL, Oracle, SQL Server)',
      'Menyiapkan lingkungan perkuliahan (DBeaver, MySQL, VS Code)'
    ],
    content: `
      <div class="alert-box info" style="background: var(--primary-subtle); color: var(--text-900); padding: 20px 24px; border-radius: var(--r-lg); border: 1px solid var(--primary-border); margin-bottom: 32px; display: flex; gap: 16px; align-items: flex-start;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2" style="flex-shrink:0; margin-top: 2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <div>
          <div style="font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 4px;">Petunjuk Praktikum: Modul 01</div>
          <div style="font-size: 0.95rem; color: var(--text-600); line-height: 1.65;">Modul ini mencakup pengantar sistem basis data, perbandingan data versus informasi, klasifikasi bentuk data (terstruktur, semi-terstruktur, tidak terstruktur), arsitektur DBMS, dan panduan instalasi environment praktikum (MySQL dan DBeaver).</div>
        </div>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 36px; margin-bottom: 18px;">1. Data vs Informasi</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        <strong>Data</strong> adalah representasi fakta mentah di dunia nyata (contoh: angka 2022, teks "Diash", nilai 85). Sementara <strong>Informasi</strong> adalah data yang telah diolah, terstruktur, dan memiliki konteks makna bagi pengambil keputusan (contoh: "Mahasiswa bernama Diash angkatan 2022 meraih nilai 85 pada mata kuliah Pemrograman Basis Data").
      </p>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">2. Klasifikasi Bentuk Data: Terstruktur, Semi-Terstruktur, & Tidak Terstruktur</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Dalam industri perangkat lunak dan manajemen basis data, data yang diproses oleh aplikasi dikelompokkan ke dalam tiga kategori utama berdasarkan keberadaan serta kekakuan skema datanya:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 28px 0 32px 0;">
        <!-- Card 1: Data Terstruktur -->
        <div style="background: var(--bg-white); border: 1.5px solid var(--primary-border); border-radius: var(--r-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <span class="badge" style="background: var(--primary-subtle); color: var(--primary); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid var(--primary-border);">
              Model Relasional
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-400);">~20% Data Dunia</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">A. Data Terstruktur (Structured)</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin-bottom: 16px; flex: 1;">
            Data yang memiliki format dan skema kaku (<em>schema-on-write</em>) sebelum disimpan. Tersusun rapi dalam baris (<em>records</em>) dan kolom (<em>attributes</em>) dengan tipe data pasti (INTEGER, VARCHAR, DATE).
          </p>
          <div style="background: var(--bg-muted); border: 1px solid var(--border-base); border-radius: var(--r-md); padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; margin-bottom: 14px; overflow-x: auto;">
            <div style="color: var(--primary); font-weight: 700; margin-bottom: 4px;">// Tabel: mahasiswa (RDBMS)</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-strong); color: var(--text-900);">
                  <th style="padding: 2px 6px;">nim</th>
                  <th style="padding: 2px 6px;">nama</th>
                  <th style="padding: 2px 6px;">ipk</th>
                </tr>
              </thead>
              <tbody style="color: var(--text-600);">
                <tr>
                  <td style="padding: 2px 6px;">152022001</td>
                  <td style="padding: 2px 6px;">Diash</td>
                  <td style="padding: 2px 6px;">3.85</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-500); line-height: 1.5;">
            <strong>Penyimpanan:</strong> RDBMS (MySQL, PostgreSQL, Oracle). Menggunakan sintaks SQL baku.
          </div>
        </div>

        <!-- Card 2: Data Semi-Terstruktur -->
        <div style="background: var(--bg-white); border: 1.5px solid rgba(8, 145, 178, 0.25); border-radius: var(--r-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <span class="badge" style="background: var(--accent-cyan-subtle); color: var(--accent-cyan); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid rgba(8, 145, 178, 0.3);">
              Key-Value & Dokumen
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-400);">Skema Fleksibel</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">B. Data Semi-Terstruktur</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin-bottom: 16px; flex: 1;">
            Data yang tidak terikat tabel relasional konvensional, namun memiliki penanda internal (<em>keys</em>, <em>tags</em>, atau metadata) untuk membedakan elemen data. Struktur antar-baris data dapat bervariasi.
          </p>
          <div style="background: #0d1117; color: #58a6ff; border: 1px solid #30363d; border-radius: var(--r-md); padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; margin-bottom: 14px; overflow-x: auto; line-height: 1.5;">
            <span style="color: #8b949e;">// Format Dokumen JSON:</span><br>
            {<br>
            &nbsp;&nbsp;<span style="color: #7ee787;">"nim"</span>: <span style="color: #a5d6ff;">"152022001"</span>,<br>
            &nbsp;&nbsp;<span style="color: #7ee787;">"nama"</span>: <span style="color: #a5d6ff;">"Diash"</span>,<br>
            &nbsp;&nbsp;<span style="color: #7ee787;">"hobi"</span>: [<span style="color: #a5d6ff;">"Database"</span>, <span style="color: #a5d6ff;">"Web"</span>]<br>
            }
          </div>
          <div style="font-size: 0.8rem; color: var(--text-500); line-height: 1.5;">
            <strong>Penyimpanan:</strong> REST API payload, JSON/XML, NoSQL Document Store (MongoDB, CouchDB).
          </div>
        </div>

        <!-- Card 3: Data Tidak Terstruktur -->
        <div style="background: var(--bg-white); border: 1.5px solid rgba(147, 51, 234, 0.25); border-radius: var(--r-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <span class="badge" style="background: var(--purple-50); color: var(--purple-600); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid var(--purple-200);">
              Binary & Media Mentah
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-400);">~80% Data Dunia</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">C. Data Tidak Terstruktur</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin-bottom: 16px; flex: 1;">
            Data yang tidak memiliki skema atau aturan format yang baku. Berupa berkas biner (media digital) atau teks bebas yang tidak dapat langsung dioperasikan dengan klausa SQL relasional biasa.
          </p>
          <div style="background: var(--bg-muted); border: 1px solid var(--border-base); border-radius: var(--r-md); padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; margin-bottom: 14px; line-height: 1.6; color: var(--text-700);">
            📷 <code>foto_profil_mhs.jpg</code><br>
            📄 <code>transkrip_nilai.pdf</code><br>
            🎥 <code>rekaman_kuliah_p1.mp4</code>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-500); line-height: 1.5;">
            <strong>Penyimpanan:</strong> Object Storage (AWS S3, MinIO), File System, Vector DB untuk pencarian AI.
          </div>
        </div>
      </div>

      <!-- Comparison Matrix Table -->
      <div style="overflow-x: auto; margin-bottom: 36px; border: 1px solid var(--border-base); border-radius: var(--r-xl); box-shadow: var(--shadow-sm);">
        <table class="table-sql" style="width: 100%; margin: 0;">
          <thead>
            <tr>
              <th style="width: 22%;">Parameter</th>
              <th style="width: 26%;">Data Terstruktur</th>
              <th style="width: 26%;">Data Semi-Terstruktur</th>
              <th style="width: 26%;">Data Tidak Terstruktur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Karakteristik Skema</strong></td>
              <td>Kaku (<em>Schema-on-Write</em>)</td>
              <td>Fleksibel (<em>Self-describing</em>)</td>
              <td>Tanpa skema formal</td>
            </tr>
            <tr>
              <td><strong>Bentuk Representasi</strong></td>
              <td>Tabel Relasional (Baris & Kolom)</td>
              <td>Hierarki JSON, XML, Key-Value</td>
              <td>File Biner (Image/Video/Audio/PDF)</td>
            </tr>
            <tr>
              <td><strong>Metode Query Utama</strong></td>
              <td>SQL baku (<code>SELECT, WHERE, JOIN</code>)</td>
              <td>NoSQL Query, JSONPath</td>
              <td>Pencarian Metadata, Vector Search</td>
            </tr>
            <tr>
              <td><strong>Contoh Engine / Storage</strong></td>
              <td>MySQL, PostgreSQL, Oracle</td>
              <td>MongoDB, Redis, Firestore</td>
              <td>AWS S3, MinIO, Blob Storage</td>
            </tr>
            <tr>
              <td><strong>Peran dalam Kuliah Ini</strong></td>
              <td><span style="color: var(--primary); font-weight: 800;">Fokus Utama Praktikum</span></td>
              <td>Materi pengayaan (Kolom JSON)</td>
              <td>Disimpan sebagai referensi path/URL</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">3. Urgensi Sistem Basis Data</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Sebelum penerapan basis data terpusat, data disimpan dalam file teks atau spreadsheet tradisional (<em>file-based system</em>) yang menimbulkan beragam kendala: redundansi data (duplikasi), inkonsistensi data, kesulitan akses konkuren (<em>concurrency issue</em>), serta kerentanan keamanan. Basis data hadir sebagai kumpulan data terstruktur yang terintegrasi secara logis dan aman.
      </p>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">4. Arsitektur DBMS (Database Management System)</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        DBMS adalah perangkat lunak perantara yang mengelola penyimpanan, manipulasi, dan pengamanan basis data. DBMS memastikan integritas data serta mengisolasi pengguna dari kompleksitas fisik penyimpanan pada media penyimpanan sekunder.
      </p>

      <div style="background: var(--text-900); color: #38bdf8; padding: 28px 24px; border-radius: var(--r-xl); font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; text-align: center; margin: 32px 0; box-shadow: var(--shadow-md); line-height: 1.8;">
        <div style="color: #f8fafc; font-weight: 700;">[ User / Aplikasi Klien (Web/Mobile) ]</div>
        <div style="margin: 8px 0; color: #94a3b8;">↓ (SQL Query Dispatch)</div>
        <div style="color: #fb923c; font-weight: 800; font-size: 1rem;">[ DBMS Engine (MySQL / PostgreSQL) ]</div>
        <div style="margin: 8px 0; color: #94a3b8;">↓ (Disk I/O Read/Write)</div>
        <div style="color: #94a3b8; font-weight: 700;">[ Physical Database Files on Storage ]</div>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">5. RDBMS (Relational Database Management System)</h3>
      <p style="margin-bottom: 24px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        RDBMS mengorganisasi data ke dalam baris (<em>records</em>) dan kolom (<em>attributes</em>) dalam tabel-tabel terhubung menggunakan relasi Primary Key dan Foreign Key. MySQL, PostgreSQL, dan Oracle adalah contoh implementasi RDBMS standar industri.
      </p>

      <h3 style="font-size: 1.35rem; color: var(--primary); font-weight: 900; margin-top: 48px; margin-bottom: 20px;">6. Prosedur Instalasi Environment Praktikum</h3>
      <p style="margin-bottom: 24px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Untuk mendukung praktikum perkuliahan di komputer lokal, mahasiswa memerlukan sebuah DBMS engine dan SQL client editor. Praktikum menggunakan <strong>MySQL</strong> (melalui bundle <strong>XAMPP</strong>) serta <strong>DBeaver Community Edition</strong>.
      </p>

      <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 36px;">
        <div style="background: var(--bg-white); border: 1px solid var(--border-base); padding: 28px 32px; border-radius: var(--r-xl); box-shadow: var(--shadow-sm); border-left: 5px solid var(--primary);">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-900); margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="background: var(--primary); color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 800;">1</span>
            Instalasi XAMPP (Apache + MySQL)
          </h4>
          <ul style="padding-left: 32px; color: var(--text-600); font-size: 0.95rem; line-height: 1.8; margin: 0;">
            <li style="margin-bottom: 8px;">Unduh installer resmi XAMPP dari <a href="https://www.apachefriends.org/index.html" target="_blank" style="color: var(--primary); text-decoration: underline; font-weight: 600;">apachefriends.org</a> sesuai sistem operasi yang digunakan.</li>
            <li style="margin-bottom: 8px;">Jalankan berkas instalasi dan ikuti panduan konfigurasi standar (default components).</li>
            <li style="margin-bottom: 8px;">Buka aplikasi <strong>XAMPP Control Panel</strong> setelah instalasi selesai.</li>
            <li style="margin-bottom: 0;">Klik tombol <strong>Start</strong> pada baris modul <strong>MySQL</strong>. Verifikasi bahwa status MySQL berubah aktif dengan penanda port default 3306.</li>
          </ul>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); padding: 28px 32px; border-radius: var(--r-xl); box-shadow: var(--shadow-sm); border-left: 5px solid var(--accent-cyan);">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-900); margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="background: var(--accent-cyan); color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 800;">2</span>
            Instalasi DBeaver (Database Client)
          </h4>
          <ul style="padding-left: 32px; color: var(--text-600); font-size: 0.95rem; line-height: 1.8; margin: 0;">
            <li style="margin-bottom: 8px;">Unduh DBeaver Community Edition (gratis / open-source) dari <a href="https://dbeaver.io/download/" target="_blank" style="color: var(--accent-cyan); text-decoration: underline; font-weight: 600;">dbeaver.io</a>.</li>
            <li style="margin-bottom: 8px;">Jalankan penginstal hingga seluruh komponen terpasang.</li>
            <li style="margin-bottom: 8px;">Buka DBeaver, lalu pilih menu <strong>New Database Connection</strong> pada toolbar utama.</li>
            <li style="margin-bottom: 8px;">Pilih tipe basis data <strong>MySQL</strong>, lalu lanjutkan.</li>
            <li style="margin-bottom: 8px;">Pada kolom <em>Server Host</em> isikan <code>localhost</code>, <em>Username</em> <code>root</code>, dan biarkan <em>Password</em> kosong (kredensial bawaan instalasi lokal).</li>
            <li style="margin-bottom: 0;">Lakukan uji koneksi melalui tombol <strong>Test Connection</strong> untuk memastikan koneksi berhasil terhubung, kemudian klik <strong>Finish</strong>.</li>
          </ul>
        </div>
      </div>
      
      <div class="alert-box success" style="background: var(--green-50); color: var(--green-700); padding: 20px 24px; border-radius: var(--r-lg); border: 1px solid var(--green-200); display: flex; gap: 16px; align-items: flex-start; margin-top: 32px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" stroke-width="2.2" style="flex-shrink:0; margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div>
          <div style="font-size: 1rem; font-weight: 700; color: var(--green-700); margin-bottom: 4px;">Verifikasi Kesiapan Environment</div>
          <div style="font-size: 0.95rem; color: var(--text-600); line-height: 1.65;">Setelah langkah di atas selesai, layanan database lokal Anda siap digunakan untuk latihan praktikum. Mahasiswa juga dapat memanfaatkan Simulator Visual terintegrasi pada modul ini untuk menguji query SQL langsung dari browser.</div>
        </div>
      </div>
    `,
    codeSnippet: `-- Contoh pembuatan database perkuliahan
CREATE DATABASE perkuliahan_itenas;

-- Menampilkan daftar database aktif
SHOW DATABASES;

-- Mengaktifkan database kerja
USE perkuliahan_itenas;`,
    suggestedPlaygroundQuery: `SELECT 'SIMLAB DB ITENAS' AS instansi, CURRENT_TIMESTAMP AS waktu_server;`,
    quiz: {
      title: 'Kuis Pertemuan 1: Pengantar Basis Data',
      questions: [
        {
          id: 'q1_1',
          type: 'mc',
          question: 'Apa perbedaan utama antara data dan informasi?',
          options: [
            'Data berupa angka, informasi berupa teks',
            'Data adalah fakta mentah, sedangkan informasi adalah data yang sudah diolah dan bermakna',
            'Data disimpan di cloud, informasi disimpan di flashdisk',
            'Data tidak dapat disimpan, informasi dapat disimpan'
          ],
          correct: 1,
          explanation: 'Data merupakan fakta mentah tanpa konteks, sedangkan informasi adalah data yang telah diproses sehingga memiliki arti dan konteks bermanfaat.'
        },
        {
          id: 'q1_2',
          type: 'mc',
          question: 'Manakah dari berikut ini yang merupakan contoh dari Data Semi-Terstruktur?',
          options: [
            'Tabel relasional dengan baris dan kolom bertipe data pasti',
            'Berkas dokumen JSON yang memiliki pasangan key-value dan tag hirarkis',
            'File video rekaman praktikum berformat MP4',
            'Sinyal audio mentah dari mikrofon'
          ],
          correct: 1,
          explanation: 'JSON dan XML tergolong data semi-terstruktur karena tidak dibatasi skema tabel kaku, namun memiliki label atau tag internal yang mendeskripsikan setiap elemen data.'
        },
        {
          id: 'q1_3',
          type: 'tf',
          question: 'DBMS bertanggung jawab mengisolasi aplikasi pengguna dari struktur fisik penyimpanan data di hard drive.',
          correct: true,
          explanation: 'Benar. Konsep data abstraction pada DBMS menyembunyikan detail fisik penyimpanan dari aplikasi pengguna.'
        },
        {
          id: 'q1_4',
          type: 'mc',
          question: 'Manakah dari berikut ini yang merupakan contoh Relational DBMS (RDBMS)?',
          options: ['MongoDB', 'Redis', 'PostgreSQL', 'Neo4j'],
          correct: 2,
          explanation: 'PostgreSQL adalah salah satu sistem RDBMS relasional berbasis tabel paling andal dan canggih di dunia.'
        }
      ]
    },
    assignment: {
      id: 'asg_1',
      title: 'Tugas 1: Instalasi Environment & Database Pertama',
      deadline: '27 September 2026',
      instructions: 'Instal RDBMS pilihan Anda (MySQL/PostgreSQL atau gunakan DBLearn Playground). Buatlah database bernama "sistem_akademik" dan buat tabel sederhana bernama "identitas_mahasiswa" yang berisi NIM, Nama, dan Prodi Anda. Kumpulkan tangkapan layar dan script SQL yang Anda gunakan.'
    }
  },

  {
    id: 2,
    title: 'Database Design & ERD',
    subtitle: 'Entity-Relationship Model, Klasifikasi Atribut, Kardinalitas Crow\'s Foot, Kunci Relasional, & Pemetaan Skema',
    duration: '150 Menit',
    objectives: [
      'Memahami 3 fase siklus perancangan basis data: Konseptual (ERD), Logikal (Relational Schema), dan Fisikal (DDL/DBMS)',
      'Mengidentifikasi komponen ERD: Entitas Kuat (Strong Entity) vs Entitas Lemah (Weak Entity)',
      'Mengklasifikasikan taksonomi atribut: Simple vs Composite, Single-valued vs Multi-valued, Stored vs Derived',
      'Menganalisis tingkatan kunci relasional: Super Key, Candidate Key, Primary Key (PK), Alternate Key, dan Foreign Key (FK)',
      'Menerapkan derajat kardinalitas (1:1, 1:N, M:N) serta batasan partisipasi (Mandatory vs Optional) menggunakan notasi Crow\'s Foot',
      'Mentransformasikan diagram ERD menjadi skema tabel relasional lengkap dengan junction table dan integritas referensial'
    ],
    content: `
      <div class="alert-box info" style="background: var(--primary-subtle); color: var(--text-900); padding: 20px 24px; border-radius: var(--r-lg); border: 1px solid var(--primary-border); margin-bottom: 32px; display: flex; gap: 16px; align-items: flex-start;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2" style="flex-shrink:0; margin-top: 2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <div>
          <div style="font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 4px;">Petunjuk Praktikum: Modul 02 — Database Design & ERD</div>
          <div style="font-size: 0.95rem; color: var(--text-600); line-height: 1.65;">Modul ini memandu mahasiswa memahami siklus perancangan basis data sebelum menulis kode SQL fisik: memodelkan entitas di dunia nyata kampus ITENAS, membedakan entitas kuat vs lemah, mengidentifikasi taksonomi atribut, menentukan Primary Key & Foreign Key, memetakan kardinalitas notasi Crow's Foot, dan mentransformasikan ERD menjadi skema relasional yang siap diimplementasikan.</div>
        </div>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 36px; margin-bottom: 18px;">1. Siklus Hidup & 3 Fase Perancangan Basis Data</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Perancangan basis data (*database design*) adalah proses penyusunan struktur data terorganisir untuk mendukung operasional sistem informasi. Kegagalan merancang skema di tahap awal dapat mengakibatkan redundansi data masif, anomali operasi, dan performa aplikasi yang buruk. Standar rekayasa perangkat lunak membagi proses ini ke dalam <strong>3 fase abstraksi bertahap (ANSI/SPARC)</strong>:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 24px 0 32px 0;">
        <div style="background: var(--bg-white); border: 1.5px solid var(--primary-border); border-radius: var(--r-xl); padding: 22px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="badge" style="background: var(--primary-subtle); color: var(--primary); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid var(--primary-border);">Fase 1: Konseptual</span>
            <span style="font-size: 0.775rem; font-weight: 700; color: var(--text-400);">DBMS-Independent</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">Conceptual Design (ERD)</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            Memodelkan kebutuhan data tingkat tinggi dari sudut pandang bisnis pengguna. Mengidentifikasi entitas, relasi, dan kardinalitas tanpa memikirkan software DBMS yang akan digunakan. Output utama: <strong>Entity Relationship Diagram (ERD)</strong>.
          </p>
        </div>

        <div style="background: var(--bg-white); border: 1.5px solid rgba(8, 145, 178, 0.25); border-radius: var(--r-xl); padding: 22px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="badge" style="background: var(--accent-cyan-subtle); color: var(--accent-cyan); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid rgba(8, 145, 178, 0.3);">Fase 2: Logikal</span>
            <span style="font-size: 0.775rem; font-weight: 700; color: var(--text-400);">Relational Model</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">Logical Design (Schema)</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            Mentransformasikan ERD menjadi struktur tabel relasional (baris & kolom), menentukan Primary Key, memetakan Foreign Key, serta menerapkan proses normalisasi (1NF, 2NF, 3NF) guna mencegah redundansi data.
          </p>
        </div>

        <div style="background: var(--bg-white); border: 1.5px solid rgba(147, 51, 234, 0.25); border-radius: var(--r-xl); padding: 22px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="badge" style="background: var(--purple-50); color: var(--purple-600); font-weight: 800; padding: 4px 10px; border-radius: var(--r-full); font-size: 0.75rem; border: 1px solid var(--purple-200);">Fase 3: Fisikal</span>
            <span style="font-size: 0.775rem; font-weight: 700; color: var(--text-400);">Target: MySQL Engine</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 8px;">Physical Design (DDL)</h4>
          <p style="font-size: 0.875rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            Mengimplementasikan skema ke DBMS nyata (MySQL/PostgreSQL): menentukan tipe data fisik presisi (INT, VARCHAR, DECIMAL), alokasi memori, pembuatan B-Tree Index, storage engine (InnoDB), dan constraint integritas data.
          </p>
        </div>
      </div>

      <div style="background: var(--text-900); color: #38bdf8; padding: 24px 20px; border-radius: var(--r-xl); font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; text-align: center; margin: 28px 0; box-shadow: var(--shadow-md); line-height: 1.8;">
        <div style="color: #f8fafc; font-weight: 700;">[ 1. Kebutuhan Pengguna & Dokumen Skenario Sistem ]</div>
        <div style="margin: 6px 0; color: #94a3b8;">↓ (Abstraksi Konseptual)</div>
        <div style="color: #fb923c; font-weight: 800; font-size: 0.95rem;">[ 2. ERD: Entity, Attribute, Relationship, Cardinality ]</div>
        <div style="margin: 6px 0; color: #94a3b8;">↓ (Aturan Transformasi Skema & Normalisasi)</div>
        <div style="color: #38bdf8; font-weight: 800; font-size: 0.95rem;">[ 3. Skema Relasional: Tabel, Primary Key, Foreign Key ]</div>
        <div style="margin: 6px 0; color: #94a3b8;">↓ (Eksekusi DDL & Storage Engine InnoDB)</div>
        <div style="color: #4ade80; font-weight: 700;">[ 4. Database Fisik Aktif pada Server RDBMS ]</div>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">2. Anatomi Komponen Utama ERD</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        ERD dikembangkan pertama kali oleh <strong>Peter Chen (1976)</strong> sebagai notasi visual grafis untuk memodelkan data konseptual. Tiga pilar utama pembentuk ERD meliputi:
      </p>

      <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary); margin: 24px 0 12px 0;">A. Entitas: Strong Entity vs Weak Entity</h4>
      <p style="margin-bottom: 16px; color: var(--text-600); line-height: 1.75; font-size: 0.95rem;">
        <strong>Entitas (Entity)</strong> adalah objek dunia nyata yang keberadaannya dapat dibedakan dari objek lain dan informasinya perlu dicatat oleh sistem:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="background: var(--bg-muted); border: 1px solid var(--border-base); border-left: 4px solid var(--primary); border-radius: var(--r-md); padding: 16px 20px;">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 4px; font-size: 0.95rem;">1. Entitas Kuat (Strong Entity / Regular)</div>
          <div style="font-size: 0.875rem; color: var(--text-600); line-height: 1.6;">
            Entitas yang keberadaannya mandiri (tidak bergantung pada entitas lain) dan memiliki Primary Key sendiri yang unik.<br>
            <em>Contoh di ITENAS:</em> <code>MAHASISWA</code> (dengan PK NIM), <code>DOSEN</code> (dengan PK NIDN), <code>MATA_KULIAH</code> (dengan PK Kode MK).<br>
            <strong>Simbol ERD:</strong> Persegi panjang tunggal (<em>single rectangle</em>).
          </div>
        </div>

        <div style="background: var(--bg-muted); border: 1px solid var(--border-base); border-left: 4px solid var(--accent-cyan); border-radius: var(--r-md); padding: 16px 20px;">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 4px; font-size: 0.95rem;">2. Entitas Lemah (Weak Entity / Dependent)</div>
          <div style="font-size: 0.875rem; color: var(--text-600); line-height: 1.6;">
            Entitas yang keberadaannya bergantung mutlak pada entitas pemilik (*owner entity*). Tidak memiliki Primary Key sendiri, melainkan hanya <strong>Partial Key (Discriminator)</strong>.<br>
            <em>Contoh:</em> <code>TANGGUNGAN_KELUARGA</code> (bergantung pada Dosen), <code>DETAIL_TRANSAKSI</code> (bergantung pada Faktur Induk).<br>
            <strong>Simbol ERD:</strong> Persegi panjang ganda (<em>double rectangle</em>) dengan relasi pengidentifikasi berbentuk belah ketupat ganda.
          </div>
        </div>
      </div>

      <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary); margin: 32px 0 12px 0;">B. Taksonomi Lengkap Atribut</h4>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.95rem;">
        <strong>Atribut (Attribute)</strong> adalah ciri atau properti yang mendeskripsikan suatu entitas. Setiap jenis atribut memiliki perlakuan berbeda saat ditransformasikan ke tabel database:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 28px;">
        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px 20px; box-shadow: var(--shadow-xs);">
          <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Klasifikasi 1: Kompleksitas</div>
          <div style="font-weight: 800; color: var(--text-900); font-size: 1rem; margin-bottom: 6px;">Simple vs Composite</div>
          <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            <li><strong>Simple (Atomic):</strong> Nilai data tunggal tak terbagi (misal: <code>jenis_kelamin</code>, <code>sks</code>, <code>semester</code>).</li>
            <li><strong>Composite:</strong> Gabungan dari beberapa sub-atribut logis (misal: <code>alamat</code> dipecah menjadi <code>jalan</code>, <code>kota</code>, <code>kode_pos</code>). Pada skema relasional, <em>hanya sub-atribut yang dijadikan kolom fisik</em>.</li>
          </ul>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px 20px; box-shadow: var(--shadow-xs);">
          <div style="font-size: 0.8rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Klasifikasi 2: Kardinalitas Nilai</div>
          <div style="font-weight: 800; color: var(--text-900); font-size: 1rem; margin-bottom: 6px;">Single vs Multi-Valued</div>
          <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            <li><strong>Single-Valued:</strong> Hanya menyimpan tepat satu nilai untuk setiap baris (misal: <code>tgl_lahir</code>, <code>nim</code>, <code>ipk</code>).</li>
            <li><strong>Multi-Valued:</strong> Dapat bernilai lebih dari satu untuk satu entitas (misal: <code>nomor_hp</code>, <code>hobi</code>, <code>sertifikasi</code>). <em>Wajib dipecah ke tabel terpisah</em> dalam model relasional untuk memenuhi 1NF.</li>
          </ul>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px 20px; box-shadow: var(--shadow-xs);">
          <div style="font-size: 0.8rem; font-weight: 800; color: var(--accent-emerald); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Klasifikasi 3: Asal Usul Nilai</div>
          <div style="font-weight: 800; color: var(--text-900); font-size: 1rem; margin-bottom: 6px;">Stored vs Derived (Turunan)</div>
          <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-600); line-height: 1.65; margin: 0;">
            <li><strong>Stored:</strong> Disimpan fisik secara permanen di media disk (misal: <code>tgl_lahir</code>, <code>harga_satuan</code>, <code>qty</code>).</li>
            <li><strong>Derived:</strong> Dihitung dinamis saat query (misal: <code>usia</code> dari <code>CURRENT_DATE - tgl_lahir</code>; <code>total_bayar</code> dari <code>harga * qty</code>). <em>Best practice:</em> Jangan disimpan fisik agar mencegah ketidaksinkronan data!</li>
          </ul>
        </div>
      </div>

      <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary); margin: 32px 0 12px 0;">C. Hierarki Kunci Relasional (Database Keys Hierarchy)</h4>
      <p style="margin-bottom: 18px; color: var(--text-600); line-height: 1.75; font-size: 0.95rem;">
        Kunci (*keys*) merupakan mekanisme utama RDBMS untuk menjamin integritas data dan memungkinkan relasi antar-tabel berjalan secara konsisten:
      </p>

      <div style="overflow-x: auto; margin-bottom: 36px; border: 1px solid var(--border-base); border-radius: var(--r-xl); box-shadow: var(--shadow-sm);">
        <table class="table-sql" style="width: 100%; margin: 0;">
          <thead>
            <tr>
              <th style="width: 22%;">Tingkatan Kunci</th>
              <th style="width: 38%;">Definisi & Karakteristik</th>
              <th style="width: 40%;">Contoh Kasus Mahasiswa ITENAS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Super Key</strong></td>
              <td>Kombinasi satu atau lebih atribut yang menjamin keunikan identifikasi setiap baris data (bisa memuat kolom ekstra yang sebenarnya tidak mutlak).</td>
              <td><code>{nim}</code>, <code>{nim, nama}</code>, <code>{email, angkatan}</code></td>
            </tr>
            <tr>
              <td><strong>Candidate Key</strong></td>
              <td>Super Key yang bersifat <em>minimal</em> (tanpa atribut mubazir). Semua kandidat yang berpotensi diangkat menjadi Primary Key.</td>
              <td>Kandidat 1: <code>{nim}</code><br>Kandidat 2: <code>{email_kampus}</code></td>
            </tr>
            <tr>
              <td><strong style="color: var(--primary);">Primary Key (PK)</strong></td>
              <td>Satu Candidate Key yang secara resmi dipilih oleh perancang database sebagai identitas pembeda unik utama. Aturan mutlak: <strong>HARUS UNIK & TIDAK BOLEH NULL</strong>.</td>
              <td><code>nim</code> (misal: '152022001' unik dan permanen untuk setiap mahasiswa)</td>
            </tr>
            <tr>
              <td><strong>Alternate Key</strong></td>
              <td>Candidate Key yang tidak terpilih sebagai Primary Key, namun tetap harus dijaga keunikannya melalui constraint <code>UNIQUE</code>.</td>
              <td><code>email_kampus</code> (unik, namun bukan PK utama)</td>
            </tr>
            <tr>
              <td><strong style="color: var(--accent-cyan);">Foreign Key (FK)</strong></td>
              <td>Atribut dalam suatu tabel yang merujuk pada Primary Key di tabel lain. Membentuk <strong>Integritas Referensial (Referential Integrity)</strong>.</td>
              <td>Kolom <code>nidn_wali</code> di tabel <code>mahasiswa</code> yang merujuk pada <code>nidn</code> di tabel <code>dosen</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">3. Derajat Relasi, Kardinalitas & Batasan Partisipasi</h3>

      <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 10px;">A. Derajat Relasi (Relationship Degree)</h4>
      <ul style="padding-left: 24px; color: var(--text-600); font-size: 0.95rem; line-height: 1.8; margin-bottom: 24px;">
        <li><strong>Unary Relationship (Recursive):</strong> Relasi yang menghubungkan entitas dengan dirinya sendiri. <em>Contoh:</em> Dosen <code>mensupervisi</code> Dosen lain (relasi Ketua KBK dengan Dosen Pengampu).</li>
        <li><strong>Binary Relationship:</strong> Relasi yang menghubungkan tepat 2 entitas berbeda (derajat paling umum dalam sistem basis data). <em>Contoh:</em> Dosen <code>membimbing</code> Mahasiswa.</li>
        <li><strong>Ternary Relationship:</strong> Relasi simultan yang melibatkan 3 entitas sekaligus. <em>Contoh:</em> Dosen <code>mengajar</code> Mahasiswa pada <code>Ruang Kelas</code> tertentu.</li>
      </ul>

      <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 10px;">B. Rasio Kardinalitas (Cardinality Ratio)</h4>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px;">
        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <strong style="color: var(--text-900);">One-to-One (1:1):</strong>
            <span style="color: var(--text-600); margin-left: 8px;">Satu baris di Entitas A berelasi dengan maksimal satu baris di Entitas B, dan sebaliknya.</span>
          </div>
          <span class="badge" style="background: var(--primary-subtle); color: var(--primary); font-weight: 700; padding: 3px 10px; border-radius: var(--r-full); font-size: 0.75rem;">1 Ketua Jurusan ➔ 1 Program Studi</span>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <strong style="color: var(--text-900);">One-to-Many (1:N):</strong>
            <span style="color: var(--text-600); margin-left: 8px;">Satu baris di Entitas A dapat terhubung ke banyak baris di Entitas B, namun baris di B hanya terhubung ke satu baris di A.</span>
          </div>
          <span class="badge" style="background: var(--accent-cyan-subtle); color: var(--accent-cyan); font-weight: 700; padding: 3px 10px; border-radius: var(--r-full); font-size: 0.75rem;">1 Dosen Wali ➔ N Mahasiswa</span>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <strong style="color: var(--text-900);">Many-to-Many (M:N):</strong>
            <span style="color: var(--text-600); margin-left: 8px;">Satu baris di A dapat berelasi dengan banyak baris di B, dan sebaliknya. <em>Wajib dipecah dengan Junction Table!</em></span>
          </div>
          <span class="badge" style="background: var(--purple-50); color: var(--purple-600); font-weight: 700; padding: 3px 10px; border-radius: var(--r-full); font-size: 0.75rem;">M Mahasiswa ➔ N Mata Kuliah</span>
        </div>
      </div>

      <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-900); margin-bottom: 12px;">C. Notasi Standar Industri: Crow's Foot Notation</h4>
      <p style="margin-bottom: 16px; color: var(--text-600); line-height: 1.75; font-size: 0.95rem;">
        Dalam industri dan software perancangan modern (DBeaver, MySQL Workbench, Draw.io), notasi <strong>Crow's Foot (Cakar Burung)</strong> lebih banyak digunakan dibandingkan notasi Chen karena mampu merepresentasikan kardinalitas minimum (partisipasi) dan maksimum secara bersamaan:
      </p>

      <div style="overflow-x: auto; margin-bottom: 36px; border: 1px solid var(--border-base); border-radius: var(--r-xl); box-shadow: var(--shadow-sm);">
        <table class="table-sql" style="width: 100%; margin: 0;">
          <thead>
            <tr>
              <th style="width: 18%;">Simbol Crow's Foot</th>
              <th style="width: 25%;">Nama Istilah</th>
              <th style="width: 22%;">Batas (Min..Max)</th>
              <th style="width: 35%;">Penjelasan Makna Bisnis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 800; color: var(--primary);">||</span></td>
              <td><strong>Exactly One</strong> (Mandatory One)</td>
              <td>1 .. 1</td>
              <td>Wajib ada dan tepat satu (tidak boleh kosong/NULL, tidak boleh lebih dari satu).</td>
            </tr>
            <tr>
              <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 800; color: var(--accent-cyan);">0|</span></td>
              <td><strong>Zero or One</strong> (Optional One)</td>
              <td>0 .. 1</td>
              <td>Opsional (boleh belum terhubung) namun jika ada, maksimal hanya satu.</td>
            </tr>
            <tr>
              <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 800; color: var(--purple-600);">|{</span></td>
              <td><strong>One or Many</strong> (Mandatory Many)</td>
              <td>1 .. N</td>
              <td>Wajib memiliki minimal satu relasi dan boleh memiliki banyak relasi.</td>
            </tr>
            <tr>
              <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 800; color: var(--accent-amber);">0{</span></td>
              <td><strong>Zero or Many</strong> (Optional Many)</td>
              <td>0 .. N</td>
              <td>Opsional (boleh nol / belum ada data) dan boleh memiliki banyak relasi.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">4. Enam Aturan Emas Transformasi ERD ke Skema Relasional (Mapping Rules)</h3>
      <p style="margin-bottom: 24px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Transformasi dari diagram konseptual ERD ke bentuk tabel relasional fisik mengikuti <strong>6 aturan baku</strong> yang wajib dipahami oleh setiap mahasiswa:
      </p>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px;">
        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--primary); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 1: Pemetaan Entitas Kuat (Strong Entity)</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            Setiap entitas kuat dipetakan menjadi <strong>satu tabel mandiri</strong>. Seluruh atribut sederhana menjadi kolom tabel. Primary Key entitas menjadi Primary Key tabel relasional tersebut.
          </div>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--primary); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 2: Pemetaan Entitas Lemah (Weak Entity)</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            Dipetakan menjadi satu tabel tersendiri. Primary Key-nya dibentuk dari <strong>Composite Key</strong>: gabungan Foreign Key yang merujuk ke Primary Key entitas pemilik (*owner entity*) + Partial Key milik entitas lemah tersebut.
          </div>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--accent-cyan); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 3: Pemetaan Relasi 1:1 (One-to-One)</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            Pilih salah satu tabel (terutama tabel yang memiliki <em>total participation</em> / wajib), kemudian sisipkan Primary Key tabel pasangan sebagai <strong>Foreign Key</strong> di tabel tersebut. Berikan constraint <code>UNIQUE</code> pada kolom FK tersebut agar kardinalitas 1:1 tetap terjaga.
          </div>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--accent-cyan); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 4: Pemetaan Relasi 1:N (One-to-Many)</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            <strong>Prinsip Emas:</strong> Foreign Key <em>selalu disisipkan pada sisi 'N' (Many)</em>. Ambil Primary Key dari entitas sisi '1' lalu letakkan sebagai Foreign Key di tabel sisi 'N'. Jangan pernah membalik posisi ini karena akan merusak struktur data!
          </div>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--purple-600); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 5: Pemetaan Relasi M:N (Many-to-Many) ➔ Junction Table</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            Relasi M:N <strong>dilarang langsung disambungkan</strong> antar-dua tabel relasional. Buatlah tabel baru yang disebut <strong>Junction Table (Tabel Perantara / Associative Table)</strong>. Tabel ini memuat minimal 2 Foreign Key yang merujuk ke PK kedua tabel asal. Kombinasi kedua FK tersebut dapat bertindak sebagai <em>Composite Primary Key</em> atau menggunakan ID auto-increment tersendiri.
          </div>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-left: 5px solid var(--accent-amber); padding: 18px 22px; border-radius: var(--r-lg); box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px;">Aturan 6: Pemetaan Atribut Multi-Valued</div>
          <div style="font-size: 0.9rem; color: var(--text-600); line-height: 1.65;">
            Buatlah tabel baru khusus untuk atribut tersebut yang memuat kolom nilai data beserta Foreign Key yang merujuk ke entitas induknya (misal: tabel <code>nomor_telepon_mahasiswa</code> dengan kolom <code>nim</code> dan <code>no_telepon</code>).
          </div>
        </div>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">5. Studi Kasus Perancangan Basis Data Akademik ITENAS</h3>
      <p style="margin-bottom: 20px; color: var(--text-600); line-height: 1.75; font-size: 0.975rem;">
        Berikut adalah <strong>Kamus Data (Data Dictionary)</strong> terstruktur hasil transformasi ERD Sistem Akademik ITENAS yang digunakan di SIMLAB DB:
      </p>

      <div style="overflow-x: auto; margin-bottom: 36px; border: 1px solid var(--border-base); border-radius: var(--r-xl); box-shadow: var(--shadow-sm);">
        <table class="table-sql" style="width: 100%; margin: 0; font-size: 0.85rem;">
          <thead>
            <tr>
              <th style="width: 18%;">Tabel</th>
              <th style="width: 16%;">Kolom</th>
              <th style="width: 16%;">Tipe Data Fisik</th>
              <th style="width: 14%;">Key & Nullability</th>
              <th style="width: 36%;">Keterangan Bisnis / Constraint</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #fafafa;">
              <td><strong>dosen</strong></td>
              <td><code>nidn</code></td>
              <td>VARCHAR(20)</td>
              <td><span style="color: var(--accent-amber); font-weight: 800;">PK</span>, NOT NULL</td>
              <td>Nomor Induk Dosen Nasional (identitas unik)</td>
            </tr>
            <tr style="background: #fafafa;">
              <td>dosen</td>
              <td><code>nama_dosen</code></td>
              <td>VARCHAR(100)</td>
              <td>NOT NULL</td>
              <td>Nama lengkap beserta gelar akademik</td>
            </tr>
            <tr style="background: #fafafa;">
              <td>dosen</td>
              <td><code>email</code></td>
              <td>VARCHAR(100)</td>
              <td>UNIQUE, NOT NULL</td>
              <td>Alamat surat elektronik resmi dosen ITENAS</td>
            </tr>
            <tr>
              <td><strong>matakuliah</strong></td>
              <td><code>kode_mk</code></td>
              <td>VARCHAR(10)</td>
              <td><span style="color: var(--accent-amber); font-weight: 800;">PK</span>, NOT NULL</td>
              <td>Kode mata kuliah kurikulum (misal: 'IF201')</td>
            </tr>
            <tr>
              <td>matakuliah</td>
              <td><code>nama_mk</code></td>
              <td>VARCHAR(100)</td>
              <td>NOT NULL</td>
              <td>Nama resmi mata kuliah</td>
            </tr>
            <tr>
              <td>matakuliah</td>
              <td><code>sks</code></td>
              <td>INT</td>
              <td>NOT NULL</td>
              <td>Bobot Satuan Kredit Semester (rentang 1-6)</td>
            </tr>
            <tr style="background: #fafafa;">
              <td><strong>mahasiswa</strong></td>
              <td><code>nim</code></td>
              <td>VARCHAR(20)</td>
              <td><span style="color: var(--accent-amber); font-weight: 800;">PK</span>, NOT NULL</td>
              <td>Nomor Induk Mahasiswa ITENAS (unik)</td>
            </tr>
            <tr style="background: #fafafa;">
              <td>mahasiswa</td>
              <td><code>nama</code></td>
              <td>VARCHAR(100)</td>
              <td>NOT NULL</td>
              <td>Nama lengkap mahasiswa terdaftar</td>
            </tr>
            <tr style="background: #fafafa;">
              <td>mahasiswa</td>
              <td><code>jurusan</code></td>
              <td>VARCHAR(50)</td>
              <td>NOT NULL</td>
              <td>Program studi mahasiswa (Informatika, SI, TK)</td>
            </tr>
            <tr style="background: #fafafa;">
              <td>mahasiswa</td>
              <td><code>nidn_wali</code></td>
              <td>VARCHAR(20)</td>
              <td><span style="color: var(--accent-cyan); font-weight: 800;">FK</span>, NULL</td>
              <td>Relasi 1:N merujuk ke <code>dosen(nidn)</code> (Dosen Wali)</td>
            </tr>
            <tr>
              <td><strong>nilai</strong> <em>(Junction)</em></td>
              <td><code>id</code></td>
              <td>INT</td>
              <td><span style="color: var(--accent-amber); font-weight: 800;">PK</span>, AUTO_INCREMENT</td>
              <td>Surrogate Key identitas transaksi penilaian</td>
            </tr>
            <tr>
              <td>nilai <em>(Junction)</em></td>
              <td><code>nim</code></td>
              <td>VARCHAR(20)</td>
              <td><span style="color: var(--accent-cyan); font-weight: 800;">FK</span>, NOT NULL</td>
              <td>Merujuk ke <code>mahasiswa(nim)</code> (ON DELETE CASCADE)</td>
            </tr>
            <tr>
              <td>nilai <em>(Junction)</em></td>
              <td><code>kode_mk</code></td>
              <td>VARCHAR(10)</td>
              <td><span style="color: var(--accent-cyan); font-weight: 800;">FK</span>, NOT NULL</td>
              <td>Merujuk ke <code>matakuliah(kode_mk)</code> (ON DELETE RESTRICT)</td>
            </tr>
            <tr>
              <td>nilai <em>(Junction)</em></td>
              <td><code>nilai_huruf</code></td>
              <td>VARCHAR(2)</td>
              <td>NOT NULL</td>
              <td>Indeks prestasi huruf (A, B, C, D, E)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 1.25rem; color: var(--text-900); font-weight: 800; border-bottom: 1.5px solid var(--border-base); padding-bottom: 10px; margin-top: 40px; margin-bottom: 18px;">6. Praktik Terbaik (Best Practices) Perancangan Database</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 32px;">
        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px; box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--primary);">✓</span> Konvensi Penamaan (Naming Conventions)
          </div>
          <p style="font-size: 0.85rem; color: var(--text-600); line-height: 1.6; margin: 0;">
            Gunakan huruf kecil dengan pemisah garis bawah (<code>snake_case</code>), gunakan bentuk tunggal (*singular* seperti <code>mahasiswa</code> bukan <code>mahasiswas</code>), dan hindari kata tercadangkan SQL (*reserved keywords*) seperti <code>order</code>, <code>group</code>, atau <code>table</code>.
          </p>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px; box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--primary);">✓</span> Pemilihan Tipe Data Hemat Memori
          </div>
          <p style="font-size: 0.85rem; color: var(--text-600); line-height: 1.6; margin: 0;">
            Pilih tipe data yang paling efisien: gunakan <code>VARCHAR(n)</code> untuk teks dengan panjang variatif, <code>DECIMAL(p,s)</code> untuk nilai moneter atau IPK guna menghindari kesalahan presisi floating-point.
          </p>
        </div>

        <div style="background: var(--bg-white); border: 1px solid var(--border-base); border-radius: var(--r-lg); padding: 18px; box-shadow: var(--shadow-xs);">
          <div style="font-weight: 800; color: var(--text-900); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--primary);">✓</span> Aksi Integritas Referensial Tepat
          </div>
          <p style="font-size: 0.85rem; color: var(--text-600); line-height: 1.6; margin: 0;">
            Tentukan aksi <code>ON DELETE</code> yang cermat: gunakan <code>CASCADE</code> hanya jika entitas anak tidak boleh ada tanpa induk, atau <code>RESTRICT</code> untuk mencegah data transaksi penting terhapus secara tidak sengaja.
          </p>
        </div>
      </div>

      <div class="alert-box success" style="background: var(--green-50); color: var(--green-700); padding: 20px 24px; border-radius: var(--r-lg); border: 1px solid var(--green-200); display: flex; gap: 16px; align-items: flex-start; margin-top: 28px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" stroke-width="2.2" style="flex-shrink:0; margin-top: 2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div>
          <div style="font-size: 1rem; font-weight: 700; color: var(--green-700); margin-bottom: 4px;">Kesiapan Menuju Modul 03 (Normalisasi Basis Data)</div>
          <div style="font-size: 0.95rem; color: var(--text-600); line-height: 1.65;">Setelah rancangan ERD dan skema relasional selesai disusun, langkah selanjutnya pada Pertemuan 3 adalah menguji ketahanan skema terhadap anomali data (insert, update, delete) melalui teknik normalisasi formal (1NF, 2NF, dan 3NF).</div>
        </div>
      </div>
    `,
    erdData: {
      entities: [
        { 
          name: 'DOSEN', 
          attrs: ['PK nidn', 'nama_dosen', 'email', 'jurusan', 'jabatan'] 
        },
        { 
          name: 'MAHASISWA', 
          attrs: ['PK nim', 'nama', 'jurusan', 'angkatan', 'ipk', 'email', 'FK nidn_wali'] 
        },
        { 
          name: 'NILAI (Junction M:N)', 
          isJunction: true,
          attrs: ['PK id', 'FK nim', 'FK kode_mk', 'semester', 'nilai_huruf', 'nilai_angka', 'tahun_ajaran'] 
        },
        { 
          name: 'MATAKULIAH', 
          attrs: ['PK kode_mk', 'nama_mk', 'sks', 'jurusan', 'semester'] 
        }
      ],
      relationships: [
        { from: 'DOSEN', cardinality: '1 : N', label: 'membimbing wali', to: 'MAHASISWA' },
        { from: 'MAHASISWA', cardinality: '1 : N', label: 'memiliki riwayat studi', to: 'NILAI' },
        { from: 'MATAKULIAH', cardinality: '1 : N', label: 'dinilai dalam transkrip', to: 'NILAI' }
      ]
    },
    codeSnippet: `-- ========================================================
-- IMPLEMENTASI SKEMA RELASIONAL: SISTEM AKADEMIK ITENAS
-- Hasil Pemetaan ERD Konseptual ke Skema Fisik SQL (DDL)
-- ========================================================

-- 1. Tabel Master: DOSEN (Entitas Kuat, sisi "1")
CREATE TABLE dosen (
    nidn VARCHAR(20) PRIMARY KEY,
    nama_dosen VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    jabatan VARCHAR(50) DEFAULT 'Lektor'
);

-- 2. Tabel Master: MATA KULIAH (Entitas Kuat, sisi "1")
CREATE TABLE matakuliah (
    kode_mk VARCHAR(10) PRIMARY KEY,
    nama_mk VARCHAR(100) NOT NULL,
    sks INT NOT NULL CHECK (sks BETWEEN 1 AND 6),
    jurusan VARCHAR(50) NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8)
);

-- 3. Tabel Master: MAHASISWA (Relasi 1:N dengan Dosen Wali)
CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    angkatan INT NOT NULL,
    ipk DECIMAL(3,2) DEFAULT 0.00,
    email VARCHAR(100) UNIQUE NOT NULL,
    nidn_wali VARCHAR(20),
    -- Foreign Key ke Dosen Wali (ON DELETE SET NULL jika dosen pensiun)
    CONSTRAINT fk_mhs_dosen FOREIGN KEY (nidn_wali) 
        REFERENCES dosen(nidn) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 4. Junction Table: NILAI (Resolusi Relasi M:N Mahasiswa & Mata Kuliah)
CREATE TABLE nilai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    kode_mk VARCHAR(10) NOT NULL,
    semester INT NOT NULL,
    nilai_huruf VARCHAR(2) NOT NULL,
    nilai_angka INT NOT NULL CHECK (nilai_angka BETWEEN 0 AND 4),
    tahun_ajaran VARCHAR(20) NOT NULL,
    -- Integritas Referensial Foreign Key
    CONSTRAINT fk_nilai_mhs FOREIGN KEY (nim) 
        REFERENCES mahasiswa(nim) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_nilai_mk FOREIGN KEY (kode_mk) 
        REFERENCES matakuliah(kode_mk) ON DELETE RESTRICT ON UPDATE CASCADE,
    -- Memastikan satu mahasiswa tidak memiliki duplikasi nilai untuk MK di semester yang sama
    CONSTRAINT uq_mhs_mk_semester UNIQUE (nim, kode_mk, semester, tahun_ajaran)
);`,
    suggestedPlaygroundQuery: `SELECT 
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
ORDER BY m.nim ASC, mk.kode_mk ASC;`,
    quiz: {
      title: 'Kuis Pertemuan 2: Database Design & ERD',
      questions: [
        {
          id: 'q2_1',
          type: 'mc',
          question: 'Bagaimanakah mekanisme standar perancangan basis data relasional untuk mengimplementasikan relasi Many-to-Many (M:N) antara entitas Mahasiswa dan Mata Kuliah?',
          options: [
            'Menambahkan kolom array kode_mk di dalam tabel mahasiswa',
            'Membuat Junction Table (tabel perantara) yang memuat Foreign Key dari kedua entitas',
            'Menggabungkan kedua entitas ke dalam satu tabel fisik raksasa',
            'Mendefinisikan dua Primary Key pada satu tabel mahasiswa'
          ],
          correct: 1,
          explanation: 'Model relasional tidak mendukung relasi Many-to-Many (M:N) secara langsung. Solusi bakunya adalah memecah relasi tersebut menjadi dua relasi 1:N melalui Junction Table (Associative Entity) yang menyimpan Foreign Key kedua entitas induk.'
        },
        {
          id: 'q2_2',
          type: 'tf',
          question: 'Sebuah atribut dapat ditetapkan sebagai Primary Key meskipun memiliki beberapa nilai NULL, asalkan nilai selain NULL tersebut bersifat unik.',
          correct: false,
          explanation: 'Salah. Berdasarkan prinsip Entity Integrity Constraint, Primary Key memiliki aturan mutlak: nilainya HARUS UNIK dan TIDAK BOLEH BERNILAI NULL (NOT NULL).'
        },
        {
          id: 'q2_3',
          type: 'mc',
          question: 'Manakah pernyataan yang paling tepat mengenai Entitas Lemah (Weak Entity) dalam perancangan ERD?',
          options: [
            'Entitas yang memiliki lebih dari sepuluh atribut non-kunci',
            'Entitas yang keberadaannya bergantung pada entitas pemilik (Owner) dan tidak memiliki Primary Key mandiri (hanya Partial Key)',
            'Entitas yang tidak memiliki relasi sama sekali dengan entitas lain',
            'Entitas yang hanya menyimpan berkas biner tidak terstruktur'
          ],
          correct: 1,
          explanation: 'Entitas lemah (Weak Entity) keberadaannya bergantung mutlak pada entitas pemilik (Owner). Entitas ini tidak memiliki Primary Key mandiri dan hanya memiliki Partial Key (Discriminator) yang jika dipetakan ke relasional akan membentuk Composite Key bersama PK pemiliknya.'
        },
        {
          id: 'q2_4',
          type: 'mc',
          question: 'Dalam perancangan basis data akademik, atribut "Usia" yang dihitung secara dinamis dari selisih tanggal saat ini dengan atribut "Tanggal Lahir" dikategorikan sebagai jenis atribut apa?',
          options: [
            'Composite Attribute',
            'Multi-Valued Attribute',
            'Derived Attribute (Atribut Turunan)',
            'Identifying Attribute'
          ],
          correct: 2,
          explanation: 'Atribut turunan (Derived Attribute) adalah atribut yang nilainya dapat dihasilkan dari perhitungan atribut lain atau waktu sistem. Best practice menyarankan untuk tidak menyimpannya secara fisik agar tidak menimbulkan anomali pembaruan (update anomaly).'
        },
        {
          id: 'q2_5',
          type: 'mc',
          question: 'Pada relasi 1:N (One-to-Many) antara entitas Jurusan (1) dan entitas Mahasiswa (N), di manakah posisi peletakan atribut Foreign Key yang tepat menurut aturan transformasi relasional?',
          options: [
            'Foreign Key selalu diletakkan pada entitas sisi "N" (Tabel Mahasiswa)',
            'Foreign Key selalu diletakkan pada entitas sisi "1" (Tabel Jurusan)',
            'Wajib dibuat tabel perantara baru untuk menghubungkan Jurusan dan Mahasiswa',
            'Foreign Key dapat diletakkan bebas pada salah satu tabel tanpa perbedaan dampak'
          ],
          correct: 0,
          explanation: 'Aturan baku transformasi relasi 1:N menetapkan bahwa Primary Key dari sisi "1" (One) harus ditempatkan sebagai Foreign Key pada sisi "N" (Many), sehingga setiap baris mahasiswa dapat merujuk ke tepat satu jurusan tanpa redundansi.'
        }
      ]
    },
    assignment: {
      id: 'asg_2',
      title: 'Tugas 2: Merancang ERD Sistem Informasi Perpustakaan ITENAS',
      deadline: '4 Oktober 2026',
      instructions: `Rancanglah Entity Relationship Diagram (ERD) dan Skema Relasional komprehensif untuk Sistem Informasi Perpustakaan ITENAS dengan ketentuan sebagai berikut:

1. Skenario Bisnis:
   - Perpustakaan melayani peminjaman buku oleh sivitas akademika (Mahasiswa dan Dosen) yang terdaftar sebagai Anggota.
   - Setiap transaksi peminjaman dilayani oleh seorang Petugas Perpustakaan.
   - Satu transaksi peminjaman dapat memuat beberapa judul buku sekaligus (Relasi Many-to-Many antara Transaksi Peminjaman dan Buku).
   - Sistem mencatat tanggal pinjam, batas kembali, tanggal realisasi pengembalian, status buku, dan perhitungan denda keterlambatan.

2. Komponen Entitas yang Wajib Ada:
   - ANGGOTA (id_anggota [PK], nomor_identitas, nama, tipe_anggota, email, no_telepon)
   - PETUGAS (id_petugas [PK], nama_petugas, username, password_hash, peran)
   - BUKU (isbn [PK], judul, penulis, penerbit, tahun_terbit, stok_tersedia)
   - PEMINJAMAN (id_pinjam [PK], FK id_anggota, FK id_petugas, tgl_pinjam, batas_kembali)
   - DETAIL_PEMINJAMAN (Junction Table: id_detail [PK], FK id_pinjam, FK isbn, tgl_kembali, denda, status)

3. Deliverable Pengumpulan:
   - Diagram ERD lengkap menggunakan notasi Crow's Foot (tunjukkan seluruh atribut, PK, FK, kardinalitas min..max, dan batasan partisipasi).
   - Dokumen Kamus Data (Data Dictionary) terstruktur mencakup tipe data fisik dan nullability.
   - Skrip DDL SQL (CREATE TABLE dengan PRIMARY KEY, FOREIGN KEY, dan referential actions ON DELETE / ON UPDATE).`
    }
  },

  {
    id: 3,
    title: 'Relational Database & Normalisasi',
    subtitle: 'Anomali Data, Ketergantungan Fungsional, 1NF, 2NF, hingga 3NF',
    duration: '150 Menit',
    objectives: [
      'Memahami anomali penyimpanan data: Insert, Update, dan Delete anomaly',
      'Memahami konsep ketergantungan fungsional (Functional Dependency)',
      'Menerapkan First Normal Form (1NF)',
      'Menerapkan Second Normal Form (2NF)',
      'Menerapkan Third Normal Form (3NF)'
    ],
    content: `
      <h3>1. Mengapa Perlu Normalisasi?</h3>
      <p>Normalisasi adalah teknik perancangan basis data untuk meminimalkan redundansi data dan mencegah anomali operasi:</p>
      <ul>
        <li><strong>Insertion Anomaly:</strong> Ketidakmampuan menambah data baru sebelum data lain yang tidak terkait diinput.</li>
        <li><strong>Deletion Anomaly:</strong> Terhapusnya data berharga secara tidak sengaja akibat penghapusan baris data lain.</li>
        <li><strong>Update Anomaly:</strong> Inkonsistensi data ketika pembaruan data di satu baris tidak diikuti baris duplikat lainnya.</li>
      </ul>

      <h3>2. Tahapan Normalisasi</h3>
      <h4>First Normal Form (1NF)</h4>
      <p>Setiap kolom harus bernilai atomik (tunggal, tidak berupa multivalue atau array) dan memiliki primary key unik.</p>

      <h4>Second Normal Form (2NF)</h4>
      <p>Sudah memenuhi 1NF dan tidak ada ketergantungan fungsional parsial (*partial dependency*) pada composite primary key. Semua atribut non-kunci harus bergantung penuh pada seluruh Primary Key.</p>

      <h4>Third Normal Form (3NF)</h4>
      <p>Sudah memenuhi 2NF dan tidak memiliki ketergantungan transitif (*transitive dependency*), yaitu atribut non-kunci tidak boleh bergantung pada atribut non-kunci lainnya (A -> B, B -> C, maka A -> C harus dipecah).</p>
    `,
    codeSnippet: `-- Contoh tabel sebelum 3NF:
-- (nim, nama, kode_prodi, nama_prodi) -> nama_prodi bergantung pada kode_prodi (Transitif)

-- Setelah 3NF dipecah menjadi 2 tabel:
CREATE TABLE prodi (
    kode_prodi VARCHAR(10) PRIMARY KEY,
    nama_prodi VARCHAR(50)
);

CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100),
    kode_prodi VARCHAR(10),
    FOREIGN KEY (kode_prodi) REFERENCES prodi(kode_prodi)
);`,
    suggestedPlaygroundQuery: `SELECT nim, nama, prodi FROM mahasiswa;`,
    quiz: {
      title: 'Kuis Pertemuan 3: Normalisasi Basis Data',
      questions: [
        {
          id: 'q3_1',
          type: 'mc',
          question: 'Kapan suatu tabel dikatakan memenuhi 1NF (First Normal Form)?',
          options: [
            'Ketika setiap kolom bernilai atomik (tidak ada multivalue/array) dan memiliki primary key',
            'Ketika seluruh tabel digabung menjadi satu view',
            'Ketika tidak memiliki foreign key sama sekali',
            'Ketika tabel memiliki minimal 100 baris data'
          ],
          correct: 0,
          explanation: '1NF mewajibkan setiap sel data bersifat atomik (tidak dapat dibagi lagi) dan tidak memiliki perulangan grup atribut.'
        },
        {
          id: 'q3_2',
          type: 'mc',
          question: 'Apa yang dimaksud dengan Transitive Dependency pada 3NF?',
          options: [
            'Atribut Primary Key bergantung pada Foreign Key',
            'Atribut non-kunci bergantung pada atribut non-kunci lainnya',
            'Data terhapus otomatis saat restart server',
            'Relasi tabel yang memiliki lebih dari dua kolom'
          ],
          correct: 1,
          explanation: 'Transitive dependency terjadi ketika atribut non-kunci menentukan atribut non-kunci lainnya, yang wajib dipecah ke tabel tersendiri pada 3NF.'
        }
      ]
    },
    assignment: {
      id: 'asg_3',
      title: 'Tugas 3: Studi Kasus Normalisasi Transaksi Faktur',
      deadline: '11 Oktober 2026',
      instructions: 'Diberikan lembar faktur penjualan un-normalized yang memuat Nomor Faktur, Tanggal, ID Pelanggan, Nama Pelanggan, Alamat, Kode Barang, Nama Barang, Harga Satuan, Qty, dan Subtotal. Lakukan proses normalisasi bertahap dari 1NF, 2NF, hingga 3NF!'
    }
  },

  {
    id: 4,
    title: 'SQL Dasar: DDL & DML',
    subtitle: 'Data Definition Language & Data Manipulation Language',
    duration: '150 Menit',
    objectives: [
      'Memahami klasifikasi perintah SQL (DDL vs DML)',
      'Mampu membuat tabel dengan tipe data dan constraint yang tepat (CREATE TABLE)',
      'Mampu memanipulasi data: INSERT, SELECT, UPDATE, dan DELETE',
      'Menggunakan SQL Playground untuk eksekusi langsung'
    ],
    content: `
      <h3>1. Klasifikasi Perintah SQL</h3>
      <ul>
        <li><strong>DDL (Data Definition Language):</strong> Perintah untuk mendefinisikan struktur database dan tabel (<code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>).</li>
        <li><strong>DML (Data Manipulation Language):</strong> Perintah untuk memanipulasi data di dalam tabel (<code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>).</li>
      </ul>

      <h3>2. Sintaks Utama DML</h3>
      <p>Operasi CRUD (Create, Read, Update, Delete) adalah fondasi seluruh aplikasi berorientasi data:</p>
      <ul>
        <li><strong>INSERT:</strong> Menambahkan baris data baru ke dalam tabel.</li>
        <li><strong>SELECT:</strong> Menampilkan dan mengekstrak data.</li>
        <li><strong>UPDATE:</strong> Memperbarui nilai data yang sudah ada (<strong>PENTING:</strong> Selalu gunakan klausa WHERE agar tidak mengubah seluruh baris!).</li>
        <li><strong>DELETE:</strong> Menghapus data spesifik berdasarkan kriteria WHERE.</li>
      </ul>
    `,
    codeSnippet: `-- 1. Membuat tabel
CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    prodi VARCHAR(50)
);

-- 2. Insert data
INSERT INTO mahasiswa (nim, nama, email, prodi)
VALUES ('152022099', 'Raka Aditya', 'raka@itenas.ac.id', 'Informatika');

-- 3. Update data
UPDATE mahasiswa
SET prodi = 'Sistem Informasi'
WHERE nim = '152022099';

-- 4. Delete data
DELETE FROM mahasiswa
WHERE nim = '152022099';`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa;`,
    quiz: {
      title: 'Kuis Pertemuan 4: SQL Dasar',
      questions: [
        {
          id: 'q4_1',
          type: 'mc',
          question: 'Perintah SQL manakah yang termasuk dalam kategori DDL (Data Definition Language)?',
          options: ['INSERT', 'UPDATE', 'CREATE TABLE', 'DELETE'],
          correct: 2,
          explanation: 'CREATE TABLE mendefinisikan struktur skema database, sehingga masuk ke kategori DDL.'
        },
        {
          id: 'q4_2',
          type: 'mc',
          question: 'Apa yang terjadi jika perintah "UPDATE mahasiswa SET prodi = \'Informatika\';" dieksekusi tanpa klausa WHERE?',
          options: [
            'Akan muncul pesan error sintaks',
            'Hanya baris pertama saja yang diperbarui',
            'Seluruh baris mahasiswa pada tabel akan diubah prodinya menjadi Informatika',
            'Database akan otomatis di-rollback'
          ],
          correct: 2,
          explanation: 'Tanpa klausa WHERE, perintah UPDATE akan diterapkan ke seluruh record di dalam tabel!'
        }
      ]
    },
    assignment: {
      id: 'asg_4',
      title: 'Tugas 4: Implementasi DDL dan DML Mandiri',
      deadline: '18 Oktober 2026',
      instructions: 'Buatlah skema tabel "inventori_barang" dengan minimal 5 kolom (id, nama_barang, kategori, harga, stok). Lakukan penambahan 5 data dummy, lakukan update harga pada 1 barang, dan hapus 1 barang dengan stok 0. Tulis query lengkapnya.'
    }
  },

  {
    id: 5,
    title: 'SQL Query & Filtering',
    subtitle: 'Klausa WHERE, Operator Logika, LIKE, BETWEEN, IN, ORDER BY, dan LIMIT',
    duration: '150 Menit',
    objectives: [
      'Menyaring data secara presisi dengan klausa WHERE',
      'Mengombinasikan kondisi logika menggunakan AND, OR, dan NOT',
      'Menggunakan pattern matching dengan LIKE dan wildcard (% dan _)',
      'Mengurutkan data dengan ORDER BY (ASC / DESC) dan membatasi data dengan LIMIT'
    ],
    content: `
      <h3>1. Filtering Data dengan WHERE</h3>
      <p>Klausa WHERE digunakan untuk mengekstrak hanya rekaman yang memenuhi kondisi tertentu.</p>
      
      <h3>2. Operator Penting</h3>
      <ul>
        <li><code>=, !=, &lt;, &gt;, &lt;=, &gt;=</code>: Operator perbandingan standar.</li>
        <li><code>LIKE '%kata%'</code>: Pencarian pola string (% mewakili sembarang karakter, _ mewakili satu karakter).</li>
        <li><code>IN (val1, val2, ...)</code>: Mencocokkan nilai dengan daftar pilihan.</li>
        <li><code>BETWEEN min AND max</code>: Mencari nilai dalam rentang inklusif.</li>
        <li><code>IS NULL / IS NOT NULL</code>: Memeriksa nilai kosong.</li>
      </ul>

      <h3>3. Pengurutan & Pembatasan</h3>
      <p><code>ORDER BY kolom ASC|DESC</code> mengurutkan hasil secara menaik atau menurun. <code>LIMIT n</code> membatasi jumlah baris output yang dikembalikan.</p>
    `,
    codeSnippet: `-- Mengambil mahasiswa Informatika yang namanya berawalan huruf 'A'
SELECT nim, nama, email
FROM mahasiswa
WHERE prodi = 'Informatika'
  AND nama LIKE 'A%'
ORDER BY nama ASC
LIMIT 10;`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa WHERE prodi = 'Informatika' ORDER BY nama ASC;`,
    quiz: {
      title: 'Kuis Pertemuan 5: Query & Filtering',
      questions: [
        {
          id: 'q5_1',
          type: 'mc',
          question: 'Query manakah yang tepat untuk mencari mahasiswa yang namanya berakhiran "Santoso"?',
          options: [
            'WHERE nama LIKE \'Santoso%\'',
            'WHERE nama LIKE \'%Santoso\'',
            'WHERE nama = \'%Santoso%\'',
            'WHERE nama IN (\'Santoso\')'
          ],
          correct: 1,
          explanation: 'Pola \'%Santoso\' berarti diawali karakter apa saja dan diakhiri dengan teks "Santoso".'
        },
        {
          id: 'q5_2',
          type: 'mc',
          question: 'Bagaimana sintaks untuk mengurutkan data mahasiswa dari angkatan termuda ke tertua?',
          options: [
            'ORDER BY angkatan ASC',
            'ORDER BY angkatan DESC',
            'SORT BY angkatan DOWN',
            'GROUP BY angkatan DESC'
          ],
          correct: 1,
          explanation: 'DESC (Descending) mengurutkan dari nilai terbesar (angkatan paling baru/muda) ke terkecil.'
        }
      ]
    },
    assignment: {
      id: 'asg_5',
      title: 'Tugas 5: Eksplorasi Filtering Kompleks',
      deadline: '25 Oktober 2026',
      instructions: 'Gunakan database toko_online di SQL Playground. Tulis query untuk menampilkan seluruh produk yang memiliki harga antara 100.000 s/d 500.000, berstatus stok lebih dari 5, dan diurutkan dari produk termahal!'
    }
  },

  {
    id: 6,
    title: 'JOIN & Relasi Antar Tabel',
    subtitle: 'Menggabungkan Data Relasional: INNER JOIN, LEFT JOIN, RIGHT JOIN, dan Cross Join',
    duration: '150 Menit',
    objectives: [
      'Memahami mekanisme penggabungan tabel berdasarkan Foreign Key',
      'Membedakan perilaku INNER JOIN, LEFT JOIN, dan RIGHT JOIN',
      'Mampu menulis query multi-table JOIN untuk sistem nyata',
      'Memvisualisasikan hasil gabungan data'
    ],
    content: `
      <h3>1. Konsep Dasar JOIN</h3>
      <p>Dalam database ternormalisasi, data terpecah ke dalam berbagai tabel. JOIN digunakan untuk menyatukan kembali baris-baris dari dua atau lebih tabel berdasarkan kolom yang berelasi.</p>

      <h3>2. Jenis-Jenis JOIN</h3>
      <ul>
        <li><strong>INNER JOIN:</strong> Mengembalikan baris hanya jika ada kecocokan di kedua tabel. Jika tidak ada pasangan yang cocok, baris diabaikan.</li>
        <li><strong>LEFT JOIN:</strong> Mengembalikan SEMUA baris dari tabel kiri (tabel pertama), dan baris yang cocok dari tabel kanan. Jika tidak ada kecocokan, kolom tabel kanan bernilai NULL.</li>
        <li><strong>RIGHT JOIN:</strong> Mengembalikan SEMUA baris dari tabel kanan, dan baris yang cocok dari tabel kiri.</li>
        <li><strong>CROSS JOIN:</strong> Menghasilkan perkalian kartesian (*Cartesian Product*) antara semua baris tabel A dan tabel B.</li>
      </ul>
    `,
    codeSnippet: `-- Mengambil nama mahasiswa beserta mata kuliah yang diambil
SELECT 
    m.nim,
    m.nama,
    mk.nama_mk,
    k.nilai_huruf
FROM mahasiswa m
INNER JOIN krs k ON m.nim = k.nim
INNER JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk
ORDER BY m.nama ASC;`,
    suggestedPlaygroundQuery: `SELECT m.nim, m.nama, mk.nama_mk, k.nilai_huruf FROM mahasiswa m JOIN krs k ON m.nim = k.nim JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;`,
    quiz: {
      title: 'Kuis Pertemuan 6: JOIN & Relasi Tabel',
      questions: [
        {
          id: 'q6_1',
          type: 'mc',
          question: 'Jika seorang mahasiswa belum pernah mengambil mata kuliah apapun, JOIN tipe apa yang harus digunakan agar data mahasiswa tersebut TETAP muncul di hasil query?',
          options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'NATURAL JOIN'],
          correct: 1,
          explanation: 'LEFT JOIN memastikan seluruh baris tabel kiri (mahasiswa) tetap ditampilkan meskipun tidak memiliki kecocokan di tabel kanan (krs).'
        },
        {
          id: 'q6_2',
          type: 'tf',
          question: 'INNER JOIN akan menampilkan baris meskipun nilai Foreign Key di tabel perantara bernilai NULL atau tidak cocok.',
          correct: false,
          explanation: 'Salah. INNER JOIN hanya mengembalikan baris yang memiliki kecocokan (*matching records*) di kedua tabel.'
        }
      ]
    },
    assignment: {
      id: 'asg_6',
      title: 'Tugas 6: Query Multi-Table Perpustakaan',
      deadline: '1 November 2026',
      instructions: 'Gunakan database perpustakaan. Tulis query untuk menampilkan data peminjaman buku yang memuat: Nama Anggota, Judul Buku yang dipinjam, Tanggal Pinjam, dan Status Peminjaman. Pastikan anggota yang belum meminjam buku juga terdaftar!'
    }
  },

  {
    id: 7,
    title: 'Aggregate Function & Grouping',
    subtitle: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, dan Filtering Agregat dengan HAVING',
    duration: '150 Menit',
    objectives: [
      'Menguasai fungsi agregasi (COUNT, SUM, AVG, MIN, MAX)',
      'Mengelompokkan data berdasarkan atribut tertentu dengan GROUP BY',
      'Memahami perbedaan mendasar antara klausa WHERE dan HAVING',
      'Membuat rekapitulasi laporan statistik database'
    ],
    content: `
      <h3>1. Fungsi Agregasi SQL</h3>
      <p>Fungsi agregat melakukan kalkulasi pada sekumpulan nilai dan mengembalikan nilai skalar tunggal:</p>
      <ul>
        <li><code>COUNT(*)</code>: Menghitung total jumlah baris.</li>
        <li><code>SUM(kolom)</code>: Menghitung total jumlah angka.</li>
        <li><code>AVG(kolom)</code>: Menghitung rata-rata nilai numerik.</li>
        <li><code>MIN(kolom)</code> & <code>MAX(kolom)</code>: Menemukan nilai terkecil dan terbesar.</li>
      </ul>

      <h3>2. Pengelompokan Data (GROUP BY)</h3>
      <p>GROUP BY merangkum baris-baris data yang memiliki nilai yang sama pada kolom tertentu menjadi satu baris ringkasan.</p>

      <h3>3. WHERE vs HAVING</h3>
      <p><strong>WHERE</strong> memfilter baris data SEBELUM dilakukan agregasi. Sementara <strong>HAVING</strong> memfilter data SETELAH proses agregasi dihitung.</p>
    `,
    codeSnippet: `-- Rekapitulasi jumlah mahasiswa dan rata-rata nilai per program studi
SELECT 
    m.prodi,
    COUNT(m.nim) AS total_mahasiswa,
    ROUND(AVG(k.nilai_angka), 2) AS rata_rata_nilai
FROM mahasiswa m
LEFT JOIN krs k ON m.nim = k.nim
GROUP BY m.prodi
HAVING COUNT(m.nim) >= 1;`,
    suggestedPlaygroundQuery: `SELECT prodi, COUNT(*) AS jumlah_mhs FROM mahasiswa GROUP BY prodi;`,
    quiz: {
      title: 'Kuis Pertemuan 7: Agregasi & Grouping',
      questions: [
        {
          id: 'q7_1',
          type: 'mc',
          question: 'Mengapa kita tidak bisa menulis "WHERE COUNT(*) > 5" di dalam query SQL?',
          options: [
            'Karena COUNT(*) hanya boleh digunakan bersama UPDATE',
            'Karena klausa WHERE dieksekusi sebelum pengelompokan agregat dilakukan, sehingga harus menggunakan HAVING',
            'Karena fungsi agregat tidak boleh bernilai lebih dari 5',
            'Karena sintaks tersebut hanya valid di NoSQL'
          ],
          correct: 1,
          explanation: 'WHERE memfilter baris individual sebelum agregasi. Filter terhadap hasil kalkulasi fungsi agregasi wajib menggunakan klausa HAVING.'
        }
      ]
    },
    assignment: {
      id: 'asg_7',
      title: 'Tugas 7: Laporan Statistik Penjualan Toko',
      deadline: '8 November 2026',
      instructions: 'Pada database toko_online, buatlah laporan rekapitulasi total pendapatan (SUM total) dan jumlah pesanan (COUNT) untuk setiap pelanggan. Tampilkan hanya pelanggan yang total belanjanya melebihi Rp 500.000!'
    }
  },

  {
    id: 8,
    title: 'Subquery & Advanced Query',
    subtitle: 'Nested Query, Scalar Subquery, Correlated Subquery, dan Operator EXISTS / IN',
    duration: '150 Menit',
    objectives: [
      'Memahami konsep subquery (query di dalam query)',
      'Menggunakan subquery pada klausa WHERE, FROM, dan SELECT',
      'Membedakan subquery independen dan Correlated Subquery',
      'Menggunakan operator EXISTS dan NOT EXISTS untuk validasi keberadaan data'
    ],
    content: `
      <h3>1. Apa itu Subquery?</h3>
      <p>Subquery (atau inner query / nested query) adalah query SELECT yang berada di dalam query utama. Subquery mengeksekusi lebih dahulu dan hasilnya digunakan oleh query induk.</p>

      <h3>2. Tipe-Tipe Subquery</h3>
      <ul>
        <li><strong>Scalar Subquery:</strong> Mengembalikan nilai tunggal (1 baris, 1 kolom). Sering digunakan untuk perbandingan (misal: <code>WHERE nilai > (SELECT AVG(nilai) FROM ...)</code>).</li>
        <li><strong>Multi-Row Subquery:</strong> Mengembalikan sekumpulan nilai (1 kolom, banyak baris). Digunakan bersama operator <code>IN</code>, <code>ANY</code>, atau <code>ALL</code>.</li>
        <li><strong>Correlated Subquery:</strong> Subquery yang merujuk pada kolom dari query luar, sehingga dievaluasi berulang untuk setiap baris query luar.</li>
      </ul>
    `,
    codeSnippet: `-- Mencari mahasiswa yang memiliki nilai di atas rata-rata kelas
SELECT m.nim, m.nama, k.nilai_angka
FROM mahasiswa m
JOIN krs k ON m.nim = k.nim
WHERE k.nilai_angka > (
    SELECT AVG(nilai_angka) 
    FROM krs
);`,
    suggestedPlaygroundQuery: `SELECT nim, nama FROM mahasiswa WHERE nim IN (SELECT nim FROM krs WHERE nilai_huruf = 'A');`,
    quiz: {
      title: 'Kuis Pertemuan 8: Subquery',
      questions: [
        {
          id: 'q8_1',
          type: 'mc',
          question: 'Manakah operator yang tepat untuk mencocokkan nilai jika subquery menghasilkan lebih dari satu baris hasil?',
          options: ['=', '!=', 'IN', '<='],
          correct: 2,
          explanation: 'Operator IN digunakan untuk memeriksa apakah suatu nilai berada di dalam himpunan hasil multi-baris dari subquery.'
        }
      ]
    },
    assignment: {
      id: 'asg_8',
      title: 'Tugas 8: Query Mahasiswa Berprestasi',
      deadline: '15 November 2026',
      instructions: 'Tulis query menggunakan subquery untuk menampilkan daftar mahasiswa yang mengambil mata kuliah "Pemrograman Basis Data" DAN memiliki nilai di atas rata-rata nilai mata kuliah tersebut!'
    }
  },

  {
    id: 9,
    title: 'Database Programming: Stored Procedure & Function',
    subtitle: 'Prosedur Tersimpan, User-Defined Functions, Parameter (IN, OUT), Variabel, & Kontrol Alur',
    duration: '150 Menit',
    objectives: [
      'Memahami konsep pemrograman logika di sisi database engine',
      'Membuat Stored Procedure dengan parameter IN dan OUT',
      'Membuat User-Defined Function (UDF) yang mengembalikan nilai',
      'Menggunakan kontrol alur logika (IF-THEN-ELSE, WHILE loop)'
    ],
    content: `
      <h3>1. Database Programming vs Application Programming</h3>
      <p>Alih-alih memindahkan data mentah dalam jumlah besar ke server aplikasi, Stored Procedure memungkinkan eksekusi logika bisnis kompleks langsung di dalam database engine. Keuntungannya meliputi: performa lebih cepat, mengurangi beban lalu lintas jaringan (*network traffic*), dan enkapsulasi keamanan data.</p>

      <h3>2. Stored Procedure vs Function</h3>
      <ul>
        <li><strong>Stored Procedure:</strong> Kumpulan perintah SQL terkompilasi yang dapat menerima parameter (IN, OUT, INOUT), melakukan transaksi DDL/DML, dan tidak wajib mengembalikan nilai return langsung.</li>
        <li><strong>Function:</strong> Rutinitas yang <em>wajib</em> mengembalikan satu nilai return tunggal, dapat dipanggil langsung di dalam klausa SELECT.</li>
      </ul>
    `,
    codeSnippet: `-- Contoh Stored Procedure pada MySQL/RDBMS
DELIMITER //
CREATE PROCEDURE HitungRataRataMhs(IN p_nim VARCHAR(20), OUT p_ipk DECIMAL(4,2))
BEGIN
    SELECT AVG(nilai_angka) INTO p_ipk
    FROM krs
    WHERE nim = p_nim;
END //
DELIMITER ;

-- Memanggil procedure:
CALL HitungRataRataMhs('152022001', @hasil_ipk);
SELECT @hasil_ipk;`,
    suggestedPlaygroundQuery: `SELECT nim, AVG(nilai_angka) AS rata_rata FROM krs GROUP BY nim;`,
    quiz: {
      title: 'Kuis Pertemuan 9: Database Programming',
      questions: [
        {
          id: 'q9_1',
          type: 'mc',
          question: 'Perbedaan utama antara Stored Procedure dan User-Defined Function adalah:',
          options: [
            'Stored Procedure tidak boleh menggunakan parameter',
            'Function wajib mengembalikan sebuah nilai skalar dan dapat dipanggil langsung dalam query SELECT',
            'Stored Procedure hanya dapat berjalan pada Windows',
            'Function tidak dapat membaca tabel database'
          ],
          correct: 1,
          explanation: 'Function harus mengembalikan nilai tunggal (RETURN value) dan dapat langsung digunakan pada statement SELECT.'
        }
      ]
    },
    assignment: {
      id: 'asg_9',
      title: 'Tugas 9: Membuat Procedure Hitung Diskon Toko',
      deadline: '22 November 2026',
      instructions: 'Rancanglah sebuah Stored Procedure atau rancangan logika prosedural yang menerima parameter total_belanja. Jika belanja > 500.000 diskon 10%, jika > 1.000.000 diskon 15%, selain itu 0%. Kembalikan nominal total akhir setelah diskon!'
    }
  },

  {
    id: 10,
    title: 'Trigger & Database Transaction',
    subtitle: 'Audit Logging Otomatis, Integritas Bisnis, Prinsip ACID, COMMIT, dan ROLLBACK',
    duration: '150 Menit',
    objectives: [
      'Memahami konsep Trigger (BEFORE / AFTER INSERT, UPDATE, DELETE)',
      'Membuat trigger untuk keperluan audit trail / histori perubahan',
      'Memahami prinsip ACID (Atomicity, Consistency, Isolation, Durability)',
      'Mengendalikan transaksi dengan BEGIN TRANSACTION, COMMIT, dan ROLLBACK'
    ],
    content: `
      <h3>1. Trigger</h3>
      <p>Trigger adalah blok kode prosedural yang dieksekusi secara otomatis oleh DBMS saat terjadi event data tertentu (INSERT, UPDATE, atau DELETE). Trigger sangat berguna untuk: validasi data tingkat lanjut, auto-update saldo/stok, dan audit logging perubahan data pengguna.</p>

      <h3>2. Database Transaction & Prinsip ACID</h3>
      <p>Transaksi adalah satu unit kerja logis yang terdiri dari beberapa operasi database. Transaksi harus memenuhi standar <strong>ACID</strong>:</p>
      <ul>
        <li><strong>Atomicity (All or Nothing):</strong> Seluruh rangkaian perintah berhasil dijalankan, atau jika satu gagal maka semuanya dibatalkan (*rolled back*).</li>
        <li><strong>Consistency:</strong> Database selalu berada dalam keadaan valid sesuai constraint sebelum dan sesudah transaksi.</li>
        <li><strong>Isolation:</strong> Transaksi yang berjalan bersamaan tidak saling menginterferensi sebelum di-commit.</li>
        <li><strong>Durability:</strong> Perubahan yang telah di-commit tersimpan permanen bahkan jika sistem tiba-tiba padam.</li>
      </ul>
    `,
    codeSnippet: `-- Contoh Transaksi Transfer Saldo
START TRANSACTION;

-- 1. Kurangi saldo rekening pengirim
UPDATE rekening SET saldo = saldo - 500000 WHERE no_rek = 'REK_001';

-- 2. Tambah saldo rekening penerima
UPDATE rekening SET saldo = saldo + 500000 WHERE no_rek = 'REK_002';

-- Jika kedua operasi sukses, simpan permanen:
COMMIT;
-- Jika terjadi kegagalan:
-- ROLLBACK;`,
    suggestedPlaygroundQuery: `SELECT * FROM krs;`,
    quiz: {
      title: 'Kuis Pertemuan 10: Trigger & Transaksi',
      questions: [
        {
          id: 'q10_1',
          type: 'mc',
          question: 'Prinsip ACID manakah yang menjamin bahwa semua instruksi dalam satu transaksi berhasil seluruhnya atau tidak sama sekali (all or nothing)?',
          options: ['Consistency', 'Isolation', 'Atomicity', 'Durability'],
          correct: 2,
          explanation: 'Atomicity memastikan sebuah transaksi diperlakukan sebagai satu kesatuan tunggal yang tak dapat dibagi; jika ada bagian yang gagal, seluruh transaksi dibatalkan.'
        }
      ]
    },
    assignment: {
      id: 'asg_10',
      title: 'Tugas 10: Desain Trigger Audit Log',
      deadline: '29 November 2026',
      instructions: 'Buatlah skema tabel "log_perubahan_nilai" dan rancang trigger AFTER UPDATE pada tabel nilai yang secara otomatis mencatat NIM, mata kuliah, nilai lama, nilai baru, dan waktu pengubahan setiap kali ada nilai yang diedit oleh dosen!'
    }
  },

  {
    id: 11,
    title: 'Database Connection & Application Architecture',
    subtitle: 'Koneksi Aplikasi ke Database, Driver (JDBC, PDO, Prisma), Connection Pool & Prepared Statement',
    duration: '150 Menit',
    objectives: [
      'Memahami arsitektur integrasi aplikasi multi-tier dengan database',
      'Memahami peran database driver dan connection string',
      'Mengenal teknik connection pooling untuk skalabilitas',
      'Menggunakan Prepared Statements untuk efisiensi dan keamanan'
    ],
    content: `
      <h3>1. Arsitektur Komunikasi Aplikasi - Database</h3>
      <p>Aplikasi web modern (frontend dan backend) berkomunikasi dengan database melalui lapisan middleware:</p>
      <div class="diagram-box p-4 bg-tertiary rounded-md my-4 font-mono text-sm text-center">
        [ Client UI (React / HTML) ]<br>
        &nbsp;&nbsp;&nbsp;&nbsp;│ (HTTP REST / GraphQL)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;▼<br>
        [ Backend Server (Node.js / Python / Laravel) ]<br>
        &nbsp;&nbsp;&nbsp;&nbsp;│ (Database Driver: PDO / JDBC / pg / sqlite3)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;▼<br>
        [ Connection Pool ]<br>
        &nbsp;&nbsp;&nbsp;&nbsp;│ (TCP Socket)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;▼<br>
        [ Database Engine (PostgreSQL / MySQL) ]
      </div>

      <h3>2. Connection String</h3>
      <p>Format URI baku yang memuat kredensial koneksi: <code>postgresql://username:password@localhost:5432/nama_db</code>.</p>

      <h3>3. Mengapa Prepared Statement Wajib?</h3>
      <p>Prepared Statement memisahkan antara instruksi SQL terkompilasi dan data input pengguna. Hal ini mencegah manipulasi query oleh pihak luar (*SQL Injection*) dan mempercepat eksekusi berulang melalui mekanisme caching query plan.</p>
    `,
    codeSnippet: `// Contoh Node.js + PostgreSQL Prepared Statement
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function getMahasiswaByNim(nim) {
  // Query terparameterisasi (mencegah SQL Injection)
  const query = 'SELECT * FROM mahasiswa WHERE nim = $1';
  const result = await pool.query(query, [nim]);
  return result.rows[0];
}`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa WHERE nim = '152022001';`,
    quiz: {
      title: 'Kuis Pertemuan 11: Database Connection',
      questions: [
        {
          id: 'q11_1',
          type: 'mc',
          question: 'Apa fungsi utama dari Connection Pool pada aplikasi backend berkala tinggi?',
          options: [
            'Menghapus database secara otomatis saat beban puncak',
            'Menggunakan kembali koneksi database yang sudah terbuka agar tidak perlu membuat koneksi TCP baru yang lambat pada setiap request',
            'Mengganti format query menjadi file JSON',
            'Memblokir akses pengguna luar'
          ],
          correct: 1,
          explanation: 'Membuka dan menutup koneksi database baru sangat berat (*expensive*). Connection pool mempertahankan sekumpulan koneksi siap pakai untuk digunakan kembali secara efisien.'
        }
      ]
    },
    assignment: {
      id: 'asg_11',
      title: 'Tugas 11: Konfigurasi Koneksi Backend',
      deadline: '6 Desember 2026',
      instructions: 'Tulis skrip kode koneksi database menggunakan bahasa pemrograman pilihan Anda (Node.js, Python, PHP, atau Java) yang mengimplementasikan parameterized query untuk mengambil data dari tabel pengguna berdasarkan ID!'
    }
  },

  {
    id: 12,
    title: 'CRUD Application Integration',
    subtitle: 'Membangun Aplikasi Lengkap Berbasis Database dengan Operasi Create, Read, Update, Delete',
    duration: '150 Menit',
    objectives: [
      'Menghubungkan antarmuka pengguna (UI) dengan operasi database',
      'Mengimplementasikan validasi input di sisi klien dan server',
      'Menyusun response API terstruktur (JSON response)',
      'Mengelola status UI dinamis (Loading, Success, Error state)'
    ],
    content: `
      <h3>1. Alur Lengkap CRUD</h3>
      <p>Aplikasi database yang baik memiliki alur siklus hidup lengkap:</p>
      <ul>
        <li><strong>Create:</strong> Form input -> Validasi input -> SQL INSERT terparameterisasi -> Feedback sukses ke pengguna.</li>
        <li><strong>Read:</strong> Request data (Pagination/Filter) -> SQL SELECT -> Format JSON -> Render data pada tabel/grid UI.</li>
        <li><strong>Update:</strong> Ambil data lama -> Tampilkan form edit -> SQL UPDATE -> Perbarui tampilan seketika.</li>
        <li><strong>Delete:</strong> Konfirmasi penghapusan -> SQL DELETE -> Hapus item dari tampilan UI.</li>
      </ul>
    `,
    codeSnippet: `// Contoh Endpoint REST API CRUD (Express.js)
app.post('/api/mahasiswa', async (req, res) => {
  const { nim, nama, email, prodi } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO mahasiswa (nim, nama, email, prodi) VALUES ($1, $2, $3, $4) RETURNING *',
      [nim, nama, email, prodi]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa LIMIT 5;`,
    quiz: {
      title: 'Kuis Pertemuan 12: Aplikasi CRUD',
      questions: [
        {
          id: 'q12_1',
          type: 'mc',
          question: 'Status HTTP code manakah yang standar dikembalikan saat operasi CREATE (penambahan data baru) berhasil?',
          options: ['200 OK', '201 Created', '204 No Content', '404 Not Found'],
          correct: 1,
          explanation: 'HTTP status code 201 Created adalah kode standar REST API untuk menandakan bahwa sumber daya baru telah berhasil dibuat.'
        }
      ]
    },
    assignment: {
      id: 'asg_12',
      title: 'Tugas 12: Implementasi Mini CRUD',
      deadline: '13 Desember 2026',
      instructions: 'Buatlah prototipe mini aplikasi CRUD untuk entitas "Buku" atau "Produk" yang memiliki tombol Tambah Data, Tampil Data, Ubah Data, dan Hapus Data terintegrasi dengan database.'
    }
  },

  {
    id: 13,
    title: 'Database Security & Optimization',
    subtitle: 'SQL Injection Prevention, Indexing (B-Tree), EXPLAIN Query Plan, & Hak Akses Pengguna',
    duration: '150 Menit',
    objectives: [
      'Memahami mekanisme serangan SQL Injection dan pencegahannya',
      'Menerapkan prinsip least privilege pada akun pengguna database',
      'Memahami cara kerja Indexing (B-Tree) untuk mempercepat pencarian data',
      'Menganalisis performa query menggunakan perintah EXPLAIN'
    ],
    content: `
      <h3>1. SQL Injection: Anatomi & Bahayanya</h3>
      <p>SQL Injection terjadi ketika input pengguna yang tidak disaring digabungkan langsung (*string concatenation*) ke dalam query SQL mentah:</p>
      <pre><code>-- Input jahat: ' OR '1'='1
SELECT * FROM users WHERE email = '' OR '1'='1' AND password = '...';</code></pre>
      <p>Kondisi <code>'1'='1'</code> selalu bernilai TRUE, menyebabkan pembobolan akun tanpa password yang valid! <strong>Solusi mutlak:</strong> Gunakan selalu Prepared Statement / ORM.</p>

      <h3>2. Optimasi dengan Indexing</h3>
      <p>Index bekerja seperti indeks pada buku: alih-alih melakukan pemindaian seluruh tabel (*Full Table Scan*), DBMS menggunakan struktur B-Tree untuk langsung melompat ke lokasi baris yang dicari. Index sangat menguntungkan untuk kolom yang sering masuk klausa WHERE atau JOIN.</p>
    `,
    codeSnippet: `-- Membuat index pada kolom yang sering dicari
CREATE INDEX idx_mahasiswa_nama ON mahasiswa(nama);

-- Menganalisis rencana eksekusi query (Query Execution Plan)
EXPLAIN SELECT * FROM mahasiswa WHERE nama = 'Diash Firdaus';`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa WHERE nama LIKE '%Diash%';`,
    quiz: {
      title: 'Kuis Pertemuan 13: Keamanan & Optimasi',
      questions: [
        {
          id: 'q13_1',
          type: 'mc',
          question: 'Bagaimana cara paling efektif untuk mencegah serangan SQL Injection pada aplikasi?',
          options: [
            'Menghilangkan database dari internet',
            'Menggunakan Prepared Statements dengan parameterized query',
            'Hanya menggunakan huruf kapital pada query SQL',
            'Menyimpan password dalam format plaintext'
          ],
          correct: 1,
          explanation: 'Prepared Statements memastikan input diperlakukan murni sebagai parameter data, bukan kode SQL yang dapat dieksekusi.'
        }
      ]
    },
    assignment: {
      id: 'asg_13',
      title: 'Tugas 13: Analisis Query Execution Plan',
      deadline: '20 Desember 2026',
      instructions: 'Lakukan pengujian query SELECT dengan klausa WHERE sebelum dan sesudah penambahan INDEX. Tuliskan analisis efisiensi waktu eksekusi dan perbedaan rencana eksekusi (EXPLAIN plan).'
    }
  },

  {
    id: 14,
    title: 'Final Project & Presentation',
    subtitle: 'Presentasi dan Evaluasi Proyek Akhir Pengembangan Sistem Berbasis Database',
    duration: '150 Menit',
    objectives: [
      'Menyelesaikan implementasi sistem terintegrasi database secara utuh',
      'Memenuhi syarat minimal: 5 tabel berelasi, CRUD, JOIN, Stored Procedure, dan Trigger',
      'Mempresentasikan hasil proyek, skema ERD, dan demo aplikasi',
      'Mendapatkan evaluasi dan feedback menyeluruh dari dosen pengampu'
    ],
    content: `
      <h3>1. Panduan Proyek Akhir Pemrograman Basis Data</h3>
      <p>Proyek akhir merupakan muara dari seluruh kompetensi yang dipelajari selama 14 pertemuan perkuliahan. Mahasiswa memilih 1 dari 4 domain studi kasus:</p>
      <ul>
        <li><strong>Studi Kasus 1: Sistem Informasi Akademik</strong> (Mahasiswa, Dosen, Mata Kuliah, KRS, Nilai).</li>
        <li><strong>Studi Kasus 2: Sistem Informasi Perpustakaan</strong> (Anggota, Buku, Petugas, Peminjaman, Denda).</li>
        <li><strong>Studi Kasus 3: Sistem Manajemen Inventori & Toko</strong> (Produk, Kategori, Supplier, Transaksi, Stok).</li>
        <li><strong>Studi Kasus 4: Sistem Rekam Medis Rumah Sakit</strong> (Pasien, Dokter, Poliklinik, Rekam Medis, Obat).</li>
      </ul>

      <h3>2. Rubrik Penilaian Proyek Akhir</h3>
      <table class="table-sql my-4">
        <thead>
          <tr>
            <th>Komponen Penilaian</th>
            <th>Bobot</th>
            <th>Kriteria Keunggulan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desain Database & Normalisasi</td>
            <td>25%</td>
            <td>Minimal 5 tabel, memenuhi 3NF, integritas PK/FK kuat</td>
          </tr>
          <tr>
            <td>Implementasi SQL & Query Lanjut</td>
            <td>25%</td>
            <td>Multi-table JOIN, fungsi agregasi, subquery</td>
          </tr>
          <tr>
            <td>Database Programming (SP & Trigger)</td>
            <td>20%</td>
            <td>Minimal 1 Stored Procedure dan 1 Trigger fungsional</td>
          </tr>
          <tr>
            <td>Aplikasi Antarmuka (UI/CRUD)</td>
            <td>20%</td>
            <td>Aplikasi dapat menambah, membaca, mengedit, dan menghapus data</td>
          </tr>
          <tr>
            <td>Presentasi & Penguasaan Materi</td>
            <td>10%</td>
            <td>Kelancaran menjelaskan alur data dan tanya jawab teknis</td>
          </tr>
        </tbody>
      </table>
    `,
    codeSnippet: `-- Checklist Final Project DBLearn:
-- [x] Skema database ternormalisasi (5+ tabel)
-- [x] Script DDL & DML initial data
-- [x] Query JOIN, Aggregate, & Subquery
-- [x] 1 Stored Procedure / Function
-- [x] 1 Trigger aktif
-- [x] Demo antarmuka aplikasi`,
    suggestedPlaygroundQuery: `SELECT * FROM mahasiswa;`,
    quiz: {
      title: 'Kuis Evaluasi Akhir: Komprehensif Basis Data',
      questions: [
        {
          id: 'q14_1',
          type: 'mc',
          question: 'Mengapa integritas referensial (Foreign Key) sangat penting dalam aplikasi basis data multi-tabel?',
          options: [
            'Untuk memperlambat query agar server tidak panas',
            'Untuk mencegah adanya record yatim piatu (orphan record) dan menjamin konsistensi hubungan antar entitas',
            'Agar tabel tidak bisa dibaca oleh aplikasi frontend',
            'Sebagai pengganti password database'
          ],
          correct: 1,
          explanation: 'Foreign Key mencegah terjadinya data tidak konsisten, seperti data KRS yang merujuk pada NIM yang tidak terdaftar dalam tabel mahasiswa.'
        }
      ]
    },
    assignment: {
      id: 'asg_14',
      title: 'Pengumpulan Proyek Akhir & Laporan Teknis',
      deadline: '27 Desember 2026',
      instructions: 'Kumpulkan berkas proyek akhir yang berisi: 1) Berkas script SQL (DDL, DML, Stored Procedure, Trigger), 2) Tautan repositori GitHub aplikasi, 3) Dokumen laporan teknis PDF (ERD, kamus data, dan tangkapan layar demo aplikasi).'
    }
  }
];
