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
    title: 'Arsitektur Web Fullstack JS & Integrasi Database',
    subtitle: 'Membangun Pondasi Aplikasi Web Multi-Tier: Node.js, Express.js REST API, Driver Database (pg/mysql2), & Connection Pooling',
    duration: '150 Menit',
    objectives: [
      'Memahami arsitektur web modern multi-tier (Frontend UI, Backend REST API, & Database Relasional)',
      'Menginisialisasi proyek Node.js dan mengonfigurasi Express.js sebagai backend HTTP server',
      'Mengonfigurasi koneksi database menggunakan driver (pg/mysql2) dan Connection Pool',
      'Mengamankan kredensial database menggunakan Environment Variables (.env) dan membuat endpoint tes koneksi'
    ],
    content: `
      <h3>1. Arsitektur Multi-Tier Aplikasi Web Modern</h3>
      <p>Dalam rekayasa perangkat lunak modern, aplikasi web tidak pernah menghubungkan antarmuka pengguna di browser secara langsung ke server database karena risiko keamanan fatal (kredensial database terekspos). Sebagai gantinya, digunakan arsitektur <strong>3-Tier</strong>:</p>
      
      <div class="diagram-box p-4 bg-tertiary rounded-md my-4 font-mono text-sm text-center" style="background: #fff7ed; border: 1.5px solid #fed7aa; padding: 18px; border-radius: 8px; line-height: 1.7;">
        <span style="color: #ea580c; font-weight: 800;">[ Tier 1: Client / Frontend ]</span> Browser (HTML5, Vanilla JS / React)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;│ <em>HTTP Requests (GET, POST, PUT, DELETE) + JSON Data</em><br>
        &nbsp;&nbsp;&nbsp;&nbsp;▼<br>
        <span style="color: #0284c7; font-weight: 800;">[ Tier 2: Application Server / Backend ]</span> Node.js + Express.js API<br>
        &nbsp;&nbsp;&nbsp;&nbsp;│ <em>Database Driver + Connection Pool (TCP Sockets)</em><br>
        &nbsp;&nbsp;&nbsp;&nbsp;▼<br>
        <span style="color: #059669; font-weight: 800;">[ Tier 3: Database Server ]</span> RDBMS (PostgreSQL / MySQL / MariaDB)
      </div>

      <h3>2. Peran Node.js & Express.js</h3>
      <p><strong>Node.js</strong> adalah runtime JavaScript di sisi server yang asinkron (<em>non-blocking I/O</em>). <strong>Express.js</strong> adalah web framework minimalis yang memudahkan pengelolaan routing URL, parsing body request JSON, dan implementasi middleware keamanan.</p>

      <h3>3. Mengapa Menggunakan Connection Pooling?</h3>
      <p>Membuka koneksi TCP baru ke database (<em>handshake</em>, autentikasi, alokasi memori) membutuhkan biaya komputasi yang mahal (<em>heavy resource cost</em>). <strong>Connection Pool</strong> mempertahankan sekumpulan koneksi siap pakai yang dapat dipinjam oleh request masuk dan dikembalikan setelah query selesai, meningkatkan kapasitas throughput ribuan pengguna secara drastis.</p>

      <h3>4. Konfigurasi Environment Variables (.env)</h3>
      <p>Kredensial database (host, port, username, password) tidak boleh di-hardcode ke dalam kode sumber git. Simpan di file <code>.env</code>:</p>
      <pre style="background: #0f172a; color: #38bdf8; padding: 14px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;"><code>DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=rahasia_itenas
DB_NAME=db_akademik
PORT=3000</code></pre>
    `,
    codeSnippet: `// ==========================================
// 1. config/db.js — Setup Database Connection Pool
// ==========================================
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20, // Maksimal 20 koneksi simultan dalam pool
  idleTimeoutMillis: 30000
});

// Uji koneksi awal saat server boot
pool.connect()
  .then(client => {
    console.log('✅ Terhubung ke database relasional ITENAS!');
    client.release();
  })
  .catch(err => console.error('❌ Gagal koneksi database:', err.message));

module.exports = pool;

// ==========================================
// 2. server.js — Entry Point Express.js API
// ==========================================
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parsing JSON request body

// Healthcheck route
app.get('/api/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as db_time');
    res.json({
      status: 'online',
      message: 'Server dan Database berjalan normal',
      db_time: result.rows[0].db_time
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => console.log(\`🚀 Server aktif di http://localhost:\${PORT}\`));`,
    suggestedPlaygroundQuery: `SELECT current_database(), current_user, NOW() AS db_time;`,
    quiz: {
      title: 'Kuis Pertemuan 8: Arsitektur Web & Koneksi DB',
      questions: [
        {
          id: 'q8_1',
          type: 'mc',
          question: 'Mengapa aplikasi frontend di browser tidak boleh terhubung langsung ke database tanpa melalui backend API?',
          options: [
            'Browser tidak memiliki layar yang cukup lebar untuk menampilkan database',
            'Kredensial database (username/password) akan terekspos ke publik di inspect element dan memicu risiko keamanan fatal',
            'Database hanya dapat menerima data bertipe teks kapital',
            'Koneksi internet browser tidak mendukung kabel LAN'
          ],
          correct: 1,
          explanation: 'Jika browser langsung mengakses database, seluruh kredensial dan hak akses tersimpan di file JavaScript client yang bisa dibaca siapa pun via DevTools, memungkinkan penyerang memanipulasi atau menghapus seluruh basis data.'
        },
        {
          id: 'q8_2',
          type: 'mc',
          question: 'Apa fungsi utama mekanisme Connection Pool pada backend server Node.js?',
          options: [
            'Menghapus baris duplikat di tabel secara otomatis',
            'Membuat backup database setiap 5 menit',
            'Menggunakan kembali koneksi yang sudah terbuka sehingga server tidak membuang waktu membuka koneksi TCP baru pada setiap request pengguna',
            'Mengubah format SQL menjadi file Microsoft Word'
          ],
          correct: 2,
          explanation: 'Connection pool menyimpan sekumpulan koneksi database aktif yang siap dipakai dan dikembalikan oleh request HTTP secara berulang, menghemat beban handshake TCP yang berat.'
        }
      ]
    },
    assignment: {
      id: 'asg_8',
      title: 'Tugas 8: Setup Backend Server & Uji Pool Koneksi',
      deadline: '15 November 2026',
      instructions: 'Inisialisasi proyek Node.js dengan npm, pasang dependensi express, pg (atau mysql2), dotenv, dan cors. Buat modul pool koneksi terisolasi dan buat endpoint GET /api/health yang mengembalikan status koneksi database beserta waktu server!'
    }
  },

  {
    id: 9,
    title: 'Operasi READ — REST API Endpoint & UI Data Rendering',
    subtitle: 'Mengambil Data dengan SQL SELECT, Menangani Endpoint GET, Query Parameters (Filter & Search), dan Render Tabel Dinamis di Browser',
    duration: '150 Menit',
    objectives: [
      'Membangun endpoint GET /api/mahasiswa untuk mengambil sekumpulan baris data dari database',
      'Menerapkan fitur filtering, searching, dan sorting menggunakan Query Parameters (req.query)',
      'Mengirimkan response berstandar JSON (200 OK) beserta struktur metadata',
      'Menggunakan Fetch API di sisi client untuk mengambil data asinkron dan merender tabel HTML dinamis'
    ],
    content: `
      <h3>1. Alur Siklus Operasi READ pada Aplikasi Web</h3>
      <p>Operasi <strong>READ</strong> adalah operasi yang paling sering terjadi (rata-rata 80% dari total lalu lintas web). Siklus lengkapnya:</p>
      <ol>
        <li>Pengguna membuka halaman aplikasi atau mengetikkan kata kunci di kotak pencarian.</li>
        <li>JavaScript Frontend memicu <code>fetch('/api/mahasiswa?search=Budi&prodi=IF')</code>.</li>
        <li>Backend Express membaca query parameter pada <code>req.query</code> dan menyusun query SQL <code>SELECT</code> terparameterisasi.</li>
        <li>Database mengeksekusi query dan mengembalikan array of records.</li>
        <li>Backend mengirimkan respons berstatus <code>200 OK</code> berupa data JSON.</li>
        <li>Frontend merender data tersebut menjadi elemen-elemen baris tabel <code>&lt;tr&gt;</code> secara dinamis ke dalam DOM.</li>
      </ol>

      <h3>2. Standar Struktur Respons REST API</h3>
      <p>Respons API yang baik selalu membungkus data dalam struktur objek yang konsisten agar mudah dikonsumsi frontend:</p>
      <pre style="background: #0f172a; color: #a5f3fc; padding: 14px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;"><code>{
  "success": true,
  "message": "Data mahasiswa berhasil dimuat",
  "total": 3,
  "data": [
    { "nim": "152022001", "nama": "Budi Santoso", "prodi": "Informatika", "angkatan": 2022 },
    ...
  ]
}</code></pre>

      <h3>3. State Handling di Frontend: Loading, Empty, & Error</h3>
      <p>Frontend wajib mengelola 3 kondisi saat memuat data:
      <strong>Loading state</strong> (animasi spinner saat jaringan memproses),
      <strong>Empty state</strong> (pesan bersahabat bila tidak ada data yang cocok dengan pencarian), dan
      <strong>Error state</strong> (notifikasi jelas jika koneksi server terputus).</p>
    `,
    codeSnippet: `// ==========================================
// 1. Backend Route: routes/mahasiswa.js (GET)
// ==========================================
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/mahasiswa', async (req, res) => {
  const { search, prodi } = req.query;
  try {
    let sql = 'SELECT nim, nama, prodi, angkatan FROM mahasiswa WHERE 1=1';
    const params = [];

    // Filter dinamis terparameterisasi
    if (search) {
      params.push(\`%\${search}%\`);
      sql += \` AND (nama ILIKE $\${params.length} OR nim ILIKE $\${params.length})\`;
    }

    if (prodi) {
      params.push(prodi);
      sql += \` AND prodi = $\${params.length}\`;
    }

    sql += ' ORDER BY nim ASC';

    const result = await db.query(sql, params);
    res.status(200).json({
      success: true,
      total: result.rowCount,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 2. Frontend Client: public/js/app.js (Fetch & Render)
// ==========================================
async function loadMahasiswa(filterSearch = '') {
  const tableBody = document.getElementById('mhsTableBody');
  tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Memuat data...</td></tr>';

  try {
    const res = await fetch(\`/api/mahasiswa?search=\${encodeURIComponent(filterSearch)}\`);
    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Tidak ada data ditemukan.</td></tr>';
      return;
    }

    tableBody.innerHTML = json.data.map((m, idx) => \`
      <tr>
        <td>\${idx + 1}</td>
        <td><strong>\${m.nim}</strong></td>
        <td>\${m.nama}</td>
        <td><span class="badge">\${m.prodi}</span></td>
        <td>\${m.angkatan}</td>
      </tr>
    \`).join('');
  } catch (err) {
    tableBody.innerHTML = \`<tr><td colspan="5" style="color:red;">Gagal memuat: \${err.message}</td></tr>\`;
  }
}`,
    suggestedPlaygroundQuery: `SELECT nim, nama, prodi, angkatan FROM mahasiswa WHERE prodi = 'Informatika' ORDER BY angkatan DESC;`,
    quiz: {
      title: 'Kuis Pertemuan 9: Operasi READ & REST API',
      questions: [
        {
          id: 'q9_1',
          type: 'mc',
          question: 'HTTP Method dan status response standar apakah yang digunakan untuk operasi membaca sekumpulan data pada REST API?',
          options: [
            'Method POST dengan response status 201 Created',
            'Method GET dengan response status 200 OK',
            'Method DELETE dengan response status 404 Not Found',
            'Method PUT dengan response status 500 Internal Server Error'
          ],
          correct: 1,
          explanation: 'Method GET digunakan untuk operasi pengambilan/pembacaan data (idempotent), dan kode status standar keberhasilannya adalah 200 OK.'
        }
      ]
    },
    assignment: {
      id: 'asg_9',
      title: 'Tugas 9: Membangun Endpoint READ & Antarmuka Tabel Dinamis',
      deadline: '22 November 2026',
      instructions: 'Buatlah endpoint GET /api/mahasiswa yang mendukung filter nama dan program studi. Rancang halaman web frontend dengan HTML tabel yang memanggil endpoint tersebut menggunakan Fetch API dan merender hasil pencarian secara real-time.'
    }
  },

  {
    id: 10,
    title: 'Operasi CREATE — Form Handling & Prepared Statements',
    subtitle: 'Menerima Input Pengguna, Validasi Server-Side, SQL INSERT Terparameterisasi, dan Mencegah Kerentanan SQL Injection',
    duration: '150 Menit',
    objectives: [
      'Merancang antarmuka form input data web dengan validasi client-side (HTML5 validation)',
      'Menangani HTTP POST request dengan parsing JSON body (express.json)',
      'Melakukan validasi integritas data di sisi server sebelum mengeksekusi query database',
      'Menggunakan SQL INSERT dengan Prepared Statement / Parameterized Query untuk mencegah SQL Injection',
      'Mengembalikan HTTP Status Code 201 Created dan memberikan toast feedback ke pengguna'
    ],
    content: `
      <h3>1. Alur Siklus Operasi CREATE (Insert Data)</h3>
      <p>Operasi <strong>CREATE</strong> menambahkan record baru ke dalam tabel basis data. Alur standarnya meliputi:</p>
      <ol>
        <li>Pengguna mengisikan data pada Form Input web (NIM, Nama, Prodi, Angkatan).</li>
        <li>Event <code>form.addEventListener('submit', ...)</code> mencegat reload halaman default dengan <code>e.preventDefault()</code>.</li>
        <li>Data dibungkus dalam payload JSON dan dikirim via <code>fetch('/api/mahasiswa', { method: 'POST', body: JSON.stringify(...) })</code>.</li>
        <li>Backend menerima request, menjalankan validasi kelengkapan field dan keunikan Primary Key (NIM).</li>
        <li>Backend mengeksekusi perintah SQL <code>INSERT INTO mahasiswa ... VALUES ($1, $2, $3, $4)</code> secara terparameterisasi.</li>
        <li>Jika berhasil, backend merespons dengan <code>201 Created</code> dan mengembalikan record yang baru dibuat.</li>
        <li>Frontend menutup modal form, menampilkan notifikasi sukses, dan memperbarui tabel secara reaktif tanpa refresh halaman.</li>
      </ol>

      <h3>2. Mengapa Prepared Statement Wajib untuk INSERT?</h3>
      <p>Jika backend menggabungkan input pengguna langsung menggunakan string concatenation (misal: <code>"INSERT INTO mhs VALUES ('" + req.body.nim + "')"</code>), penyerang dapat menyuntikkan query jahat (<em>SQL Injection</em>). Dengan <strong>Prepared Statement</strong> (placeholder <code>$1, $2</code> atau <code>?</code>), database memperlakukan nilai masukan murni sebagai data literal yang aman.</p>
    `,
    codeSnippet: `// ==========================================
// 1. Backend Route: routes/mahasiswa.js (POST)
// ==========================================
router.post('/mahasiswa', async (req, res) => {
  const { nim, nama, prodi, angkatan } = req.body;

  // 1. Validasi server-side
  if (!nim || !nama || !prodi || !angkatan) {
    return res.status(400).json({
      success: false,
      message: 'Semua kolom (NIM, Nama, Prodi, Angkatan) wajib diisi!'
    });
  }

  try {
    // 2. Query terparameterisasi (Prepared Statement)
    const sql = \`
      INSERT INTO mahasiswa (nim, nama, prodi, angkatan)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    \`;
    const values = [nim.trim(), nama.trim(), prodi, parseInt(angkatan, 10)];

    const result = await db.query(sql, values);

    // 3. Response 201 Created
    res.status(201).json({
      success: true,
      message: 'Data mahasiswa berhasil ditambahkan!',
      data: result.rows[0]
    });
  } catch (err) {
    // Tangani duplikasi Primary Key (kode PostgreSQL: 23505)
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        message: \`NIM '\${nim}' sudah terdaftar dalam sistem!\`
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 2. Frontend Client: Form Submit Handler
// ==========================================
async function submitTambahMahasiswa(event) {
  event.preventDefault();
  const form = event.target;
  const payload = {
    nim: form.nim.value,
    nama: form.nama.value,
    prodi: form.prodi.value,
    angkatan: form.angkatan.value
  };

  const response = await fetch('/api/mahasiswa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  if (response.ok) {
    alert('Sukses: ' + result.message);
    form.reset();
    loadMahasiswa(); // Segarkan tampilan tabel
  } else {
    alert('Gagal: ' + result.message);
  }
}`,
    suggestedPlaygroundQuery: `INSERT INTO mahasiswa (nim, nama, prodi, angkatan) VALUES ('152022099', 'Fajar Ramadhan', 'Informatika', 2023);`,
    quiz: {
      title: 'Kuis Pertemuan 10: Operasi CREATE & Prepared Statements',
      questions: [
        {
          id: 'q10_1',
          type: 'mc',
          question: 'Status HTTP code standar manakah yang dikembalikan oleh REST API ketika sebuah data record baru berhasil disimpan di database?',
          options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
          correct: 1,
          explanation: 'HTTP 201 Created adalah status standar spesifikasi HTTP/REST yang mengindikasikan bahwa request berhasil dan menghasilkan pembuatan resource baru di server.'
        },
        {
          id: 'q10_2',
          type: 'mc',
          question: 'Mengapa penggunaan Prepared Statement ($1, $2, ...) dapat mencegah serangan SQL Injection?',
          options: [
            'Karena database mengenkripsi seluruh harddisk',
            'Karena query SQL dikompilasi terlebih dahulu, sehingga parameter input hanya diperlakukan sebagai nilai data mentah dan tidak akan pernah dieksekusi sebagai sintaks SQL',
            'Karena prepared statement melarang angka genap',
            'Karena prepared statement secara otomatis mematikan jaringan internet'
          ],
          correct: 1,
          explanation: 'Prepared Statement memisahkan struktur instruksi query dari data input, sehingga karakter berbahaya seperti kutip tunggal tidak dapat memanipulasi klausa query.'
        }
      ]
    },
    assignment: {
      id: 'asg_10',
      title: 'Tugas 10: Form Web & Endpoint CREATE Mahasiswa',
      deadline: '29 November 2026',
      instructions: 'Rancang form modal Tambah Data Mahasiswa di antarmuka web. Buat endpoint POST /api/mahasiswa dengan validasi server-side dan handling error duplikasi NIM (Primary Key violation).'
    }
  },

  {
    id: 11,
    title: 'Operasi UPDATE & DELETE — Modifikasi Data & Integritas Referensial',
    subtitle: 'Implementasi Edit Modal, Endpoint PUT/PATCH, Query UPDATE Terparameterisasi, Penghapusan Data (DELETE), dan Dialog Konfirmasi Aman',
    duration: '150 Menit',
    objectives: [
      'Membuat alur edit data: Memuat data terpilih ke form modal, mengedit field, dan mengirim request PUT /api/mahasiswa/:nim',
      'Mengeksekusi query SQL UPDATE dengan klausa WHERE spesifik dan parameter sanitasi',
      'Membangun endpoint DELETE /api/mahasiswa/:nim dengan modal konfirmasi dialog aman',
      'Memahami integritas referensial Foreign Key (ON DELETE RESTRICT vs ON DELETE CASCADE) dan konsep Soft Delete'
    ],
    content: `
      <h3>1. Alur Operasi UPDATE Data</h3>
      <p>Mengubah data yang sudah ada membutuhkan alur dua tahap:</p>
      <ul>
        <li><strong>Tahap 1 (Fetch Single Data):</strong> Pengguna menekan tombol "Edit" pada salah satu baris tabel. Data baris tersebut diisikan ke field-field Form Modal Edit (dengan field Primary Key NIM dibuat <code>readonly</code>).</li>
        <li><strong>Tahap 2 (Submit Update):</strong> Pengguna mengubah data (misal: nama atau prodi) dan mengklik "Simpan Perubahan". Client mengirimkan <code>PUT /api/mahasiswa/:nim</code>.</li>
        <li><strong>Tahap 3 (Backend Processing):</strong> Backend mengeksekusi <code>UPDATE mahasiswa SET nama = $1, prodi = $2, angkatan = $3 WHERE nim = $4</code>. Jika <code>rowCount === 0</code>, kembalikan <code>404 Not Found</code>.</li>
      </ul>

      <h3>2. Alur Operasi DELETE & Pertimbangan Integritas Data</h3>
      <p>Operasi hapus sangat berisiko (<em>destructive action</em>). Aturan wajib pengembangan aplikasi basis data:</p>
      <ul>
        <li><strong>Wajib Dialog Konfirmasi:</strong> Jangan pernah menghapus data seketika saat tombol ditekan. Selalu tampilkan modal konfirmasi (misal: <em>"Yakin ingin menghapus mahasiswa Budi (152022001)?"</em>).</li>
        <li><strong>Foreign Key Constraint:</strong> Jika data mahasiswa sudah memiliki relasi di tabel lain (misal tabel KRS/Nilai), database dengan <code>ON DELETE RESTRICT</code> akan menolak penghapusan. Backend harus menangani error ini dengan ramah: <em>"Data tidak dapat dihapus karena masih terkait dengan data KRS aktif!"</em></li>
        <li><strong>Hard Delete vs Soft Delete:</strong> Pada sistem enterprise, data sering kali tidak dihapus fisik, melainkan ditandai dengan kolom status: <code>UPDATE mahasiswa SET is_deleted = TRUE WHERE nim = $1</code>.</li>
      </ul>
    `,
    codeSnippet: `// ==========================================
// 1. Backend Routes: routes/mahasiswa.js (PUT & DELETE)
// ==========================================

// Endpoint UPDATE
router.put('/mahasiswa/:nim', async (req, res) => {
  const { nim } = req.params;
  const { nama, prodi, angkatan } = req.body;

  try {
    const sql = \`
      UPDATE mahasiswa
      SET nama = $1, prodi = $2, angkatan = $3
      WHERE nim = $4
      RETURNING *
    \`;
    const result = await db.query(sql, [nama, prodi, angkatan, nim]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
    }

    res.json({ success: true, message: 'Data berhasil diperbarui', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint DELETE
router.delete('/mahasiswa/:nim', async (req, res) => {
  const { nim } = req.params;

  try {
    const sql = 'DELETE FROM mahasiswa WHERE nim = $1 RETURNING *';
    const result = await db.query(sql, [nim]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
    }

    res.json({ success: true, message: \`Mahasiswa \${nim} berhasil dihapus\` });
  } catch (err) {
    // Tangani Foreign Key Violation (PostgreSQL code 23503)
    if (err.code === '23503') {
      return res.status(409).json({
        success: false,
        message: 'Gagal menghapus: Mahasiswa masih memiliki relasi data nilai/KRS!'
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 2. Frontend Client: Delete Confirmation
// ==========================================
async function deleteMahasiswa(nim, nama) {
  const yakin = confirm(\`Apakah Anda yakin ingin menghapus mahasiswa \${nama} (\${nim})?\`);
  if (!yakin) return;

  const res = await fetch(\`/api/mahasiswa/\${nim}\`, { method: 'DELETE' });
  const result = await res.json();

  if (res.ok) {
    alert(result.message);
    loadMahasiswa(); // Segarkan tampilan tabel
  } else {
    alert('Error: ' + result.message);
  }
}`,
    suggestedPlaygroundQuery: `UPDATE mahasiswa SET prodi = 'Sistem Informasi' WHERE nim = '152022001';`,
    quiz: {
      title: 'Kuis Pertemuan 11: Operasi UPDATE, DELETE & Integritas FK',
      questions: [
        {
          id: 'q11_1',
          type: 'mc',
          question: 'Apa bahaya terbesar mengeksekusi query UPDATE atau DELETE tanpa menyertakan klausa WHERE?',
          options: [
            'Database akan otomatis restart sendiri',
            'Seluruh baris data pada tabel akan terubah atau terhapus total tanpa terkecuali',
            'Kecepatan internet kampus akan melambat',
            'Query akan otomatis dialihkan ke Google'
          ],
          correct: 1,
          explanation: 'Klausa WHERE menentukan target baris mana yang akan dimodifikasi atau dihapus. Tanpa WHERE, DBMS akan menerapkan aksi tersebut pada seluruh baris di dalam tabel.'
        }
      ]
    },
    assignment: {
      id: 'asg_11',
      title: 'Tugas 11: Implementasi Modal Edit & Aksi Hapus Aman',
      deadline: '6 Desember 2026',
      instructions: 'Lengkapi aplikasi CRUD Anda dengan tombol Edit dan Hapus pada tiap baris data tabel. Buat modal form edit yang memicu PUT /api/mahasiswa/:nim, dan dialog konfirmasi sebelum memanggil DELETE /api/mahasiswa/:nim.'
    }
  },

  {
    id: 12,
    title: 'Relational CRUD — Operasi Multi-Tabel & Foreign Keys',
    subtitle: 'Menghubungkan Data Berelasi (Master-Detail), Dropdown Pilihan Berdasarkan Foreign Key, Query Multi-Table JOIN di Backend, dan Transaksi ACID',
    duration: '150 Menit',
    objectives: [
      'Merancang antarmuka CRUD yang melibatkan relasi 1-to-Many (Master Mahasiswa & Detail KRS / Transaksi)',
      'Menyediakan elemen dropdown select pada form web yang memuat data secara dinamis dari tabel master Foreign Key',
      'Menulis query backend dengan multi-table JOIN (INNER / LEFT JOIN) untuk menyajikan laporan komposit',
      'Menerapkan transaksi database atomik (BEGIN, COMMIT, ROLLBACK) pada operasi multi-tabel di Express.js'
    ],
    content: `
      <h3>1. Pola Relational CRUD (Master-Detail)</h3>
      <p>Aplikasi dunia nyata jarang hanya memiliki satu tabel tunggal. Biasanya terdapat relasi antar entitas:</p>
      <ul>
        <li><strong>Tabel Master:</strong> <code>mahasiswa</code> (NIM, Nama) dan <code>mata_kuliah</code> (Kode MK, Nama MK, SKS).</li>
        <li><strong>Tabel Transaksi / Junction:</strong> <code>krs</code> (ID KRS, NIM sebagai FK, Kode MK sebagai FK, Nilai Huruf).</li>
      </ul>

      <h3>2. Dropdown Foreign Key Dinamis di Form</h3>
      <p>Saat pengguna ingin mendaftarkan mata kuliah untuk mahasiswa, form tidak meminta pengguna mengetik manual kode mata kuliah. Form web memuat opsi pilihan dari <code>GET /api/matakuliah</code> ke dalam tag <code>&lt;select&gt;</code>, menjamin bahwa foreign key yang dikirim selalu valid sesuai data yang ada di database.</p>

      <h3>3. Query JOIN di Sisi Backend</h3>
      <p>Endpoint <code>GET /api/krs</code> tidak sekadar mengembalikan ID numerik mentah, melainkan melakukan <code>INNER JOIN</code> agar frontend menerima nama lengkap mahasiswa dan judul mata kuliah siap saji untuk tabel antarmuka.</p>

      <h3>4. Menjaga Integritas dengan Transaksi ACID</h3>
      <p>Jika satu aksi pengguna melibatkan perubahan pada lebih dari satu tabel (misal: mendaftar mahasiswa baru sekaligus otomatis membuatkan rekam data akademik awal), kedua query harus dibungkus dalam <code>BEGIN ... COMMIT</code>. Jika salah satu gagal, lakukan <code>ROLLBACK</code> untuk menghindari data korup atau setengah tersimpan.</p>
    `,
    codeSnippet: `// ==========================================
// 1. Backend Route: routes/krs.js (JOIN & Transaction)
// ==========================================
router.get('/krs', async (req, res) => {
  try {
    // Query multi-table JOIN
    const sql = \`
      SELECT 
        k.id_krs,
        k.nim,
        m.nama AS nama_mahasiswa,
        k.kode_mk,
        mk.nama_mk,
        mk.sks,
        k.nilai_huruf
      FROM krs k
      JOIN mahasiswa m ON k.nim = m.nim
      JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk
      ORDER BY k.id_krs DESC
    \`;
    const result = await db.query(sql);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Contoh Transaksi ACID saat pendaftaran KRS
router.post('/krs/daftar-paket', async (req, res) => {
  const { nim, daftar_kode_mk } = req.body;
  const client = await db.connect(); // Ambil 1 client dedicated dari pool

  try {
    await client.query('BEGIN'); // Mulai transaksi

    for (const kode_mk of daftar_kode_mk) {
      await client.query(
        'INSERT INTO krs (nim, kode_mk) VALUES ($1, $2)',
        [nim, kode_mk]
      );
    }

    await client.query('COMMIT'); // Simpan seluruh data jika semua sukses
    res.status(201).json({ success: true, message: 'Seluruh mata kuliah berhasil diambil!' });
  } catch (err) {
    await client.query('ROLLBACK'); // Batalkan semua jika ada 1 saja yang gagal
    res.status(500).json({ success: false, message: 'Pendaftaran gagal: ' + err.message });
  } finally {
    client.release(); // Kembalikan client ke pool
  }
});`,
    suggestedPlaygroundQuery: `SELECT k.id_krs, m.nama, mk.nama_mk, mk.sks, k.nilai_huruf FROM krs k JOIN mahasiswa m ON k.nim = m.nim JOIN mata_kuliah mk ON k.kode_mk = mk.kode_mk;`,
    quiz: {
      title: 'Kuis Pertemuan 12: Relational CRUD & Transaksi ACID',
      questions: [
        {
          id: 'q12_1',
          type: 'mc',
          question: 'Mengapa operasi INSERT multi-baris yang saling bergantung wajib dibungkus dalam blok BEGIN dan COMMIT (Database Transaction)?',
          options: [
            'Agar server database tidak boros baterai',
            'Untuk menjamin prinsip Atomicity: jika salah satu query gagal, seluruh operasi dibatalkan (ROLLBACK) sehingga tidak ada data setengah tersimpan yang korup',
            'Agar query bisa dibaca oleh Microsoft Excel',
            'Untuk mengganti nama tabel secara acak'
          ],
          correct: 1,
          explanation: 'Transaksi ACID menjamin sifat Atomicity (All-or-Nothing), mencegah kondisi di mana sebagian data tersimpan sementara sisanya gagal sehingga merusak konsistensi data relasional.'
        }
      ]
    },
    assignment: {
      id: 'asg_12',
      title: 'Tugas 12: CRUD Multi-Tabel dengan Dropdown Foreign Key',
      deadline: '13 Desember 2026',
      instructions: 'Buatlah modul CRUD untuk entitas yang berelasi Foreign Key (misalnya entitas KRS yang menghubungkan Mahasiswa dan Mata Kuliah). Pastikan form penambahan data menggunakan dropdown pilihan dinamis dan tabel menampilkan hasil multi-table JOIN.'
    }
  },

  {
    id: 13,
    title: 'Keamanan, Validasi & Optimasi Performa CRUD',
    subtitle: 'Pencegahan SQL Injection Lanjutan, Sanitasi Input, Optimasi Query dengan Indeks B-Tree, dan Server-Side Pagination',
    duration: '150 Menit',
    objectives: [
      'Mengaudit potensi celah keamanan SQL Injection dan XSS pada seluruh endpoint REST API',
      'Menerapkan skema validasi dan sanitasi input ketat di backend (misal express-validator)',
      'Memahami cara kerja Indexing B-Tree dan mengoptimalkan kolom pencarian (CREATE INDEX)',
      'Mengimplementasikan Server-Side Pagination (LIMIT & OFFSET) untuk efisiensi beban memori'
    ],
    content: `
      <h3>1. Audit Keamanan & Pencegahan Celah SQL Injection</h3>
      <p>Banyak pengembang pemula mengamankan klausa <code>WHERE</code> tetapi lalai pada klausa <code>ORDER BY</code> atau nama kolom dinamis. Karena nama kolom tidak bisa menggunakan placeholder <code>$1</code>, gunakan teknik <strong>Whitelist Validation</strong>:</p>
      <pre style="background: #0f172a; color: #fde047; padding: 14px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;"><code>// Cek whitelist kolom sebelum dimasukkan ke query
const ALLOWED_COLUMNS = ['nim', 'nama', 'angkatan'];
const sortBy = ALLOWED_COLUMNS.includes(req.query.sort) ? req.query.sort : 'nim';
const order = req.query.order === 'DESC' ? 'DESC' : 'ASC';
const query = \`SELECT * FROM mahasiswa ORDER BY \${sortBy} \${order}\`;</code></pre>

      <h3>2. Optimasi Kecepatan dengan Indexing B-Tree</h3>
      <p>Tanpa indeks, pencarian data pada tabel dengan 500.000 baris akan melakukan <strong>Sequential Scan (Full Table Scan)</strong> dengan kompleksitas waktu <em>O(N)</em>. Dengan membuat indeks:</p>
      <pre style="background: #0f172a; color: #38bdf8; padding: 14px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;"><code>CREATE INDEX idx_mahasiswa_nama ON mahasiswa(nama);
CREATE INDEX idx_krs_nim ON krs(nim);</code></pre>
      <p>Database membentuk pohon seimbang (B-Tree) dengan kompleksitas <em>O(log N)</em>, mempercepat waktu pencarian dari ratusan milidetik menjadi kurang dari 1 milidetik.</p>

      <h3>3. Server-Side Pagination (LIMIT & OFFSET)</h3>
      <p>Mengambil 100.000 baris sekaligus ke frontend akan membuat browser freeze dan membebani transfer data jaringan. Gunakan pagination server:</p>
      <pre style="background: #0f172a; color: #a5f3fc; padding: 14px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;"><code>const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const offset = (page - 1) * limit;

const dataQuery = 'SELECT * FROM mahasiswa ORDER BY nim LIMIT $1 OFFSET $2';
const countQuery = 'SELECT COUNT(*) FROM mahasiswa';</code></pre>
    `,
    codeSnippet: `// ==========================================
// routes/mahasiswa.js — Paginated & Indexed Endpoint
// ==========================================
router.get('/mahasiswa/paginated', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = req.query.search ? \`%\${req.query.search}%\` : null;

    let countSql = 'SELECT COUNT(*) FROM mahasiswa';
    let dataSql = 'SELECT nim, nama, prodi, angkatan FROM mahasiswa';
    const params = [];

    if (search) {
      params.push(search);
      countSql += ' WHERE nama ILIKE $1 OR nim ILIKE $1';
      dataSql += ' WHERE nama ILIKE $1 OR nim ILIKE $1';
    }

    // Hitung total baris
    const countResult = await db.query(countSql, params);
    const totalRows = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRows / limit);

    // Ambil data halaman aktif
    const dataParams = [...params, limit, offset];
    dataSql += \` ORDER BY nim ASC LIMIT $\${dataParams.length - 1} OFFSET $\${dataParams.length}\`;
    
    const dataResult = await db.query(dataSql, dataParams);

    res.json({
      success: true,
      pagination: {
        page,
        limit,
        totalRows,
        totalPages
      },
      data: dataResult.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});`,
    suggestedPlaygroundQuery: `EXPLAIN SELECT * FROM mahasiswa WHERE nama LIKE '%Diash%';`,
    quiz: {
      title: 'Kuis Pertemuan 13: Keamanan & Optimasi CRUD',
      questions: [
        {
          id: 'q13_1',
          type: 'mc',
          question: 'Bagaimana cara aman menangani parameter nama kolom pada klausa ORDER BY dinamis yang tidak dapat menggunakan placeholder $1?',
          options: [
            'Menggabungkan langsung string dari req.query tanpa pemeriksaan',
            'Menggunakan Whitelist Validation: mencocokkan input dengan daftar nama kolom yang diizinkan sebelum menyusun query',
            'Menonaktifkan klausa ORDER BY selamanya',
            'Mengubah seluruh data menjadi format JSON'
          ],
          correct: 1,
          explanation: 'Whitelist validation memastikan bahwa hanya nilai yang telah didaftarkan secara eksplisit (seperti ["nim", "nama", "angkatan"]) yang dapat disisipkan ke query, menggagalkan segala upaya injeksi SQL.'
        }
      ]
    },
    assignment: {
      id: 'asg_13',
      title: 'Tugas 13: Pagination Server-Side & Uji Performa Index',
      deadline: '20 Desember 2026',
      instructions: 'Terapkan fitur pagination (tombol Next, Prev, dan nomor halaman) pada antarmuka web CRUD Anda. Buat index B-Tree pada kolom pencarian database dan uji perbedaan performa menggunakan perintah EXPLAIN.'
    }
  },

  {
    id: 14,
    title: 'Final Project Showcase, Deployment & Evaluasi Sistem CRUD',
    subtitle: 'Integrasi Akhir Sistem Web Fullstack CRUD, Panduan Deployment Cloud, Pengujian Endpoint API, dan Rubrik Penilaian Proyek',
    duration: '150 Menit',
    objectives: [
      'Mengintegrasikan seluruh komponen arsitektur web fullstack (Frontend UI, Express REST API, Database Relasional) secara utuh',
      'Memenuhi kriteria proyek: Minimal 5 tabel berelasi, operasi CRUD lengkap, validasi keamanan, dan penanganan transaksi',
      'Men-deploy aplikasi dan database ke platform cloud publik (Vercel, Render, Railway, Supabase/Neon)',
      'Menyusun dokumentasi teknis API dan mempresentasikan demo sistem di hadapan penguji'
    ],
    content: `
      <h3>1. Arsitektur Siap Rilis (Production Ready)</h3>
      <p>Sebelum aplikasi web CRUD dirilis ke publik (<em>deployment</em>), pastikan checklist berikut terpenuhi:</p>
      <ul>
        <li><strong>Konfigurasi CORS Terbatas:</strong> Izinkan hanya domain frontend produksi Anda untuk memanggil API backend (bukan <code>origin: '*'</code>).</li>
        <li><strong>Environment Variables Cloud:</strong> Pastikan string koneksi database produksi disimpan di Environment Variable platform hosting (bukan di repository git).</li>
        <li><strong>Global Error Handler:</strong> Jangan biarkan server crash akibat unhandled error; gunakan Express global error middleware.</li>
      </ul>

      <h3>2. Panduan Deployment Stack Modern</h3>
      <ol>
        <li><strong>Database Relasional:</strong> Buat instance PostgreSQL cloud gratis di <a href="https://neon.tech" target="_blank">Neon.tech</a> atau <a href="https://supabase.com" target="_blank">Supabase</a>. Eksekusi script DDL skema tabel Anda.</li>
        <li><strong>Backend Node.js API:</strong> Hubungkan repositori GitHub Anda ke <a href="https://render.com" target="_blank">Render</a> atau <a href="https://railway.app" target="_blank">Railway</a>, masukkan environment variable <code>DATABASE_URL</code>, dan deploy service.</li>
        <li><strong>Frontend Web:</strong> Deploy antarmuka pengguna ke <a href="https://vercel.com" target="_blank">Vercel</a> atau GitHub Pages dengan URL API mengarah ke backend Render Anda.</li>
      </ol>

      <h3>3. Rubrik Penilaian Proyek Akhir CRUD ITENAS</h3>
      <table class="table-sql my-4" style="width: 100%; font-size: 0.85rem;">
        <thead>
          <tr>
            <th>Komponen Penilaian</th>
            <th>Bobot</th>
            <th>Kriteria Keberhasilan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Desain Database & Relasi</strong></td>
            <td>25%</td>
            <td>Minimal 5 tabel ternormalisasi (3NF), Foreign Key konsisten, integritas referensial terjaga.</td>
          </tr>
          <tr>
            <td><strong>Fungsionalitas CRUD Fullstack</strong></td>
            <td>30%</td>
            <td>Operasi Create, Read, Update, Delete berjalan lancar di browser tanpa error console, form terhubung ke API.</td>
          </tr>
          <tr>
            <td><strong>Keamanan & Prepared Statements</strong></td>
            <td>20%</td>
            <td>Seluruh query SQL terparameterisasi, bebas dari celah SQL Injection, ada validasi server-side.</td>
          </tr>
          <tr>
            <td><strong>Kualitas UI / UX & Desain</strong></td>
            <td>15%</td>
            <td>Antarmuka responsif, modern, memiliki indikator loading, pesan validasi ramah, dan modal konfirmasi.</td>
          </tr>
          <tr>
            <td><strong>Presentasi & Demo Sistem</strong></td>
            <td>10%</td>
            <td>Kelancaran menjelaskan alur data dari form HTML hingga tabel database dan tanya jawab teknis.</td>
          </tr>
        </tbody>
      </table>
    `,
    codeSnippet: `// ==========================================
// server.js — Konfigurasi Production & Global Error Handler
// ==========================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Konfigurasi CORS produksi
const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:3000',
  process.env.FRONTEND_PRODUCTION_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Akses ditolak oleh kebijakan CORS'));
    }
  }
}));

app.use(express.json());

// Routes API
app.use('/api/mahasiswa', require('./routes/mahasiswa'));
app.use('/api/matakuliah', require('./routes/matakuliah'));
app.use('/api/krs', require('./routes/krs'));

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Terjadi kesalahan pada server' 
      : err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`🚀 Production Server berjalan di port \${PORT}\`));`,
    suggestedPlaygroundQuery: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`,
    quiz: {
      title: 'Kuis Evaluasi Akhir: Komprehensif Fullstack Web CRUD',
      questions: [
        {
          id: 'q14_1',
          type: 'mc',
          question: 'Mengapa connection string database produksi (seperti DATABASE_URL dengan password) tidak boleh pernah di-commit ke repositori publik GitHub?',
          options: [
            'Dapat dibaca oleh penyerang di internet yang akan membobol, mencuri, atau menghapus seluruh basis data aplikasi Anda',
            'Membuat ukuran repositori git menjadi terlalu berat untuk di-download',
            'Menghapus format markdown di README',
            'Mengubah bahasa pemrograman Node.js menjadi Python'
          ],
          correct: 0,
          explanation: 'Kredensial database di repository publik adalah penyebab insiden keamanan siber paling umum. Kredensial wajib disimpan di Environment Variables server hosting.'
        }
      ]
    },
    assignment: {
      id: 'asg_14',
      title: 'Pengumpulan Proyek Akhir Fullstack CRUD & Laporan Teknis',
      deadline: '27 Desember 2026',
      instructions: 'Kumpulkan tautan repositori GitHub dan tautan URL aplikasi yang sudah ter-deploy live. Sertakan berkas skema SQL (DDL + dummy data), dokumentasi endpoint API (Markdown/Postman), dan tangkapan layar demo operasi CRUD.'
    }
  }
];
