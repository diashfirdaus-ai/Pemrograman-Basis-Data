// SimLab DB — Premium Interactive Database Laboratory (DBLearn ITENAS)
// White & ITENAS Orange Design — Full Visual Query Simulator

import { state } from '../state.js';
import { sqlEngine } from '../sqlEngine.js';

// ======================== Lab Exercises ========================
export const LAB_EXERCISES = [
  { id: 1,  title: "Tampilkan Semua Mahasiswa", desc: "Tampilkan seluruh data dari tabel mahasiswa.", hint: "Gunakan SELECT * FROM mahasiswa", expected: "SELECT * FROM mahasiswa", level: "Mudah", tags: ["SELECT", "FROM"] },
  { id: 2,  title: "Nama & IPK Informatika > 3.5", desc: "Tampilkan nama dan IPK mahasiswa jurusan Informatika dengan IPK di atas 3.5.", hint: "Gabungkan WHERE jurusan='Informatika' AND ipk > 3.5", expected: "SELECT nama, ipk FROM mahasiswa WHERE jurusan='Informatika' AND ipk > 3.5", level: "Mudah", tags: ["WHERE", "AND"] },
  { id: 3,  title: "Urutkan IPK Tertinggi", desc: "Urutkan seluruh mahasiswa berdasarkan IPK dari yang tertinggi ke terendah.", hint: "Tambahkan ORDER BY ipk DESC di akhir query", expected: "SELECT * FROM mahasiswa ORDER BY ipk DESC", level: "Mudah", tags: ["ORDER BY"] },
  { id: 4,  title: "Jumlah Mahasiswa per Jurusan", desc: "Hitung jumlah mahasiswa untuk setiap jurusan menggunakan agregasi.", hint: "Gunakan GROUP BY jurusan dengan COUNT(*) AS jumlah", expected: "SELECT jurusan, COUNT(*) AS jumlah FROM mahasiswa GROUP BY jurusan", level: "Menengah", tags: ["GROUP BY", "COUNT"] },
  { id: 5,  title: "IPK di Atas Rata-rata", desc: "Tampilkan mahasiswa yang IPK-nya melebihi rata-rata IPK keseluruhan.", hint: "Subquery: WHERE ipk > (SELECT AVG(ipk) FROM mahasiswa)", expected: "SELECT * FROM mahasiswa WHERE ipk > (SELECT AVG(ipk) FROM mahasiswa)", level: "Menengah", tags: ["Subquery", "AVG"] },
  { id: 6,  title: "JOIN Nilai IF101", desc: "Tampilkan nama mahasiswa dan nilai huruf untuk matakuliah IF101.", hint: "JOIN mahasiswa dan nilai berdasarkan nim", expected: "SELECT mahasiswa.nama, nilai.nilai_huruf FROM mahasiswa JOIN nilai ON mahasiswa.nim = nilai.nim WHERE nilai.kode_mk = 'IF101'", level: "Menengah", tags: ["JOIN", "WHERE"] },
  { id: 7,  title: "Nama Mahasiswa + MK + Nilai", desc: "Tampilkan nama mahasiswa, nama matakuliah, dan nilai — gabungkan 3 tabel.", hint: "JOIN 3 tabel: mahasiswa → nilai → matakuliah", expected: "SELECT m.nama, mk.nama_mk, n.nilai_huruf FROM mahasiswa m JOIN nilai n ON m.nim = n.nim JOIN matakuliah mk ON n.kode_mk = mk.kode_mk", level: "Sulit", tags: ["Multi-JOIN"] },
  { id: 8,  title: "Rata-rata Nilai per Matakuliah", desc: "Hitung rata-rata nilai_angka untuk setiap kode_mk.", hint: "AVG(nilai_angka) GROUP BY kode_mk", expected: "SELECT kode_mk, AVG(nilai_angka) AS rata_rata FROM nilai GROUP BY kode_mk", level: "Menengah", tags: ["GROUP BY", "AVG"] },
  { id: 9,  title: "Mahasiswa Belum Ambil MK", desc: "Tampilkan mahasiswa yang belum mengambil matakuliah apapun.", hint: "LEFT JOIN nilai, filter WHERE n.nim IS NULL", expected: "SELECT m.nama FROM mahasiswa m LEFT JOIN nilai n ON m.nim=n.nim WHERE n.nim IS NULL", level: "Sulit", tags: ["LEFT JOIN", "NULL"] },
  { id: 10, title: "Top 5 IPK Tertinggi", desc: "Tampilkan 5 mahasiswa dengan IPK tertinggi.", hint: "ORDER BY ipk DESC LIMIT 5", expected: "SELECT * FROM mahasiswa ORDER BY ipk DESC LIMIT 5", level: "Mudah", tags: ["LIMIT"] },
  { id: 11, title: "INSERT Mahasiswa Baru", desc: "Tambahkan mahasiswa baru: NIM IF2024001, Budi Santoso, Informatika, 2024, IPK 3.75.", hint: "INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email) VALUES (...)", expected: "INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email) VALUES ('IF2024001', 'Budi Santoso', 'Informatika', 2024, 3.75, 'budi@kampus.ac.id')", level: "Menengah", tags: ["INSERT", "DML"] },
  { id: 12, title: "CREATE TABLE Presensi", desc: "Buat tabel presensi baru dengan kolom id, nim, tanggal, status.", hint: "CREATE TABLE presensi (id INT, nim VARCHAR, tanggal VARCHAR, status VARCHAR)", expected: "CREATE TABLE presensi (id INT, nim VARCHAR, tanggal VARCHAR, status VARCHAR)", level: "Menengah", tags: ["CREATE", "DDL"] }
];

// ======================== Lab Modules ========================
export const LAB_MODULES = [
  {
    id: "M1", title: "M1 · SELECT Dasar",
    desc: "Mengambil kolom dari tabel. Pondasi semua query SQL.",
    color: "orange",
    queries: [
      { label: "Semua data mahasiswa",  sql: "SELECT * FROM mahasiswa" },
      { label: "Hanya nama & IPK",      sql: "SELECT nama, ipk FROM mahasiswa" },
      { label: "Semua matakuliah",      sql: "SELECT * FROM matakuliah" },
    ]
  },
  {
    id: "M2", title: "M2 · WHERE & Filter",
    desc: "Menyaring baris: =, >, <, LIKE, IN, BETWEEN, AND, OR.",
    color: "blue",
    queries: [
      { label: "Informatika & IPK > 3.5",       sql: "SELECT * FROM mahasiswa WHERE jurusan = 'Informatika' AND ipk > 3.5" },
      { label: "Angkatan 2023–2024",             sql: "SELECT nim, nama, angkatan FROM mahasiswa WHERE angkatan BETWEEN 2023 AND 2024" },
      { label: "Email pakai domain kampus",      sql: "SELECT nama, email FROM mahasiswa WHERE email LIKE '%kampus.ac.id'" },
    ]
  },
  {
    id: "M3", title: "M3 · ORDER BY, LIMIT, DISTINCT",
    desc: "Mengurutkan hasil, membatasi jumlah, dan menghilangkan duplikat.",
    color: "purple",
    queries: [
      { label: "IPK tertinggi (Top 5)", sql: "SELECT nama, ipk FROM mahasiswa ORDER BY ipk DESC LIMIT 5" },
      { label: "Jurusan unik",           sql: "SELECT DISTINCT jurusan FROM mahasiswa" },
      { label: "IPK terendah (Top 3)",   sql: "SELECT nama, ipk FROM mahasiswa ORDER BY ipk ASC LIMIT 3" },
    ]
  },
  {
    id: "M4", title: "M4 · JOIN Antar Tabel",
    desc: "Menggabungkan data dari 2–3 tabel melalui Foreign Key.",
    color: "green",
    queries: [
      { label: "Mahasiswa + Nilai IF101",    sql: "SELECT mahasiswa.nama, nilai.nilai_huruf FROM mahasiswa JOIN nilai ON mahasiswa.nim = nilai.nim WHERE nilai.kode_mk = 'IF101'" },
      { label: "Nama, MK & Nilai (3 tabel)", sql: "SELECT m.nama, mk.nama_mk, n.nilai_huruf FROM mahasiswa m JOIN nilai n ON m.nim = n.nim JOIN matakuliah mk ON n.kode_mk = mk.kode_mk" },
      { label: "LEFT JOIN: belum ambil MK",  sql: "SELECT m.nama FROM mahasiswa m LEFT JOIN nilai n ON m.nim=n.nim WHERE n.nim IS NULL" },
    ]
  },
  {
    id: "M5", title: "M5 · GROUP BY & Agregasi",
    desc: "Mengelompokkan data: COUNT, SUM, AVG, MIN, MAX.",
    color: "amber",
    queries: [
      { label: "Jumlah per jurusan",       sql: "SELECT jurusan, COUNT(*) AS jumlah FROM mahasiswa GROUP BY jurusan" },
      { label: "Rata-rata nilai per MK",   sql: "SELECT kode_mk, AVG(nilai_angka) AS rata_rata FROM nilai GROUP BY kode_mk" },
      { label: "IPK rata-rata per jurusan",sql: "SELECT jurusan, ROUND(AVG(ipk),2) AS ipk_rata FROM mahasiswa GROUP BY jurusan" },
    ]
  },
  {
    id: "M6", title: "M6 · Subquery & UNION",
    desc: "Query dalam query dan menggabungkan hasil dari dua query.",
    color: "red",
    queries: [
      { label: "IPK di atas rata-rata", sql: "SELECT * FROM mahasiswa WHERE ipk > (SELECT AVG(ipk) FROM mahasiswa)" },
      { label: "UNION jurusan",         sql: "SELECT jurusan FROM mahasiswa UNION SELECT jurusan FROM matakuliah" },
    ]
  },
  {
    id: "M7", title: "M7 · DML & DDL",
    desc: "Mengubah data (INSERT, UPDATE, DELETE) dan struktur (CREATE, DROP).",
    color: "slate",
    queries: [
      { label: "INSERT mahasiswa",     sql: "INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email) VALUES ('2024999', 'Rudi Hartono', 'Informatika', 2024, 3.6, 'rudi@student.ac.id')" },
      { label: "UPDATE IPK",           sql: "UPDATE mahasiswa SET ipk = 3.99 WHERE nim = '2024001'" },
      { label: "CREATE TABLE presensi",sql: "CREATE TABLE presensi (id INT, nim VARCHAR, tanggal VARCHAR, status VARCHAR)" },
    ]
  }
];

const MODULE_COLORS = {
  orange: { bg: 'var(--orange-50)',  border: 'var(--orange-200)',  dot: 'var(--primary)' },
  blue:   { bg: 'var(--blue-50)',    border: 'var(--blue-200)',    dot: 'var(--blue-600)' },
  purple: { bg: 'var(--purple-50)',  border: 'var(--purple-200)',  dot: 'var(--purple-600)' },
  green:  { bg: 'var(--green-50)',   border: 'var(--green-200)',   dot: 'var(--green-600)' },
  amber:  { bg: 'var(--amber-50)',   border: 'var(--amber-200)',   dot: 'var(--amber-600)' },
  red:    { bg: 'var(--red-50)',     border: 'var(--red-200)',     dot: 'var(--red-600)' },
  slate:  { bg: '#f8f9fb',           border: '#d1d5db',            dot: '#374151' },
};

// ======================== Main Render ========================
export function renderPlayground(initialQuery) {
  const currentDbName = state.getActiveDb() || 'akademik';
  const dbs = state.getDatabases();
  const currentDb = dbs[currentDbName] || dbs.akademik;
  const tables = currentDb.tables;

  window._simlabState = window._simlabState || {
    activeTab: 'hasil',
    isLecturerMode: false,
    expandedModules: { M1: true },
    pageNumber: 0,
    exercises: LAB_EXERCISES.map(e => ({ ...e, status: 'belum' })),
    customQuestions: [],
    selectedInsertTable: 'mahasiswa',
    customTableColumns: [{ name: 'id', type: 'INT', pk: true, notNull: true }],
    customTableName: '',
  };

  const simState = window._simlabState;
  const defaultQuery = initialQuery || window._lastPlaygroundQuery || "SELECT * FROM mahasiswa";

  const tableCount = Object.keys(tables).length;
  const totalRows = Object.values(tables).reduce((s, t) => s + t.rows.length, 0);
  const totalCols = Object.values(tables).reduce((s, t) => s + (t.schema || t.columns).length, 0);

  return `
    <div class="simlab-container">
      <!-- ====== TOP HEADER ====== -->
      <header class="simlab-header">
        <div class="header-brand" style="cursor:pointer;" onclick="window.router.navigate('landing')">
          <img src="logo.png" alt="ITENAS" class="header-brand-logo">
          <div class="brand-divider"></div>
          <div>
            <div class="header-title">SIMLAB <span>DB</span></div>
            <div class="header-subtitle">Laboratorium Basis Data Interaktif</div>
          </div>
          <div class="header-badges" style="display:none;" id="headerBadges">
            <span class="badge badge-live"><span class="live-dot"></span> Live</span>
            <span class="badge badge-orange">Offline Ready</span>
            <span class="badge badge-amber" style="display:none;" id="headerLecturerBadge">Mode Dosen Aktif</span>
          </div>
        </div>

        <div class="header-actions">
          <button onclick="window.app.resetCurrentDb()" class="btn btn-secondary btn-sm" style="display:none;" id="btnResetHeader">
            ↺ Reset DB
          </button>
          <button
            onclick="window.app.toggleLecturerMode()"
            id="btnLecturerToggle"
            class="btn btn-sm ${simState.isLecturerMode ? 'btn-run' : 'btn-secondary'}"
          >
            ${simState.isLecturerMode ? '✓ Mode Dosen' : '👨‍🏫 Mode Dosen'}
          </button>
        </div>
      </header>

      <!-- ====== BODY ====== -->
      <div class="simlab-body">
        <!-- ====== LEFT SIDEBAR ====== -->
        <aside class="simlab-sidebar">

          <!-- Sidebar: Tables -->
          <div class="sidebar-section">
            <div class="sidebar-heading">
              <span class="sidebar-heading-text">Daftar Tabel</span>
              <button onclick="window.app.openErDiagramModal()" class="btn btn-ghost btn-xs" style="color: var(--primary); font-size:11px;">
                ER Diagram →
              </button>
            </div>
            ${Object.values(tables).map(tbl => {
              const cols = tbl.schema || tbl.columns;
              const hasPk = cols.some(c => c.pk);
              const hasFk = cols.some(c => c.fk);
              return `
                <button onclick="window.app.openTableModal('${tbl.name}')" class="table-item">
                  <div class="table-item-icon">⊞</div>
                  <div style="flex:1; min-width:0;">
                    <div class="table-item-name">${tbl.name}</div>
                    <div class="table-item-meta">${tbl.rows.length} baris · ${cols.length} kolom${hasFk ? ' · FK' : ''}</div>
                  </div>
                  <span class="table-item-badge ${hasPk ? 'has-pk' : 'no-pk'}">${hasPk ? 'PK' : 'DATA'}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Sidebar: Modules -->
          <div class="sidebar-section">
            <div class="sidebar-heading">
              <span class="sidebar-heading-text">Modul Praktikum</span>
            </div>
            ${LAB_MODULES.map(m => {
              const isExpanded = !!simState.expandedModules[m.id];
              const colors = MODULE_COLORS[m.color] || MODULE_COLORS.orange;
              return `
                <div class="module-item" style="${isExpanded ? `border-color: ${colors.border};` : ''}">
                  <button class="module-toggle" onclick="window.app.toggleModule('${m.id}')">
                    <span class="module-toggle-title" style="display:flex;align-items:center;gap:7px;">
                      <span style="width:7px;height:7px;border-radius:50%;background:${colors.dot};flex-shrink:0;"></span>
                      ${m.title}
                    </span>
                    <span class="module-toggle-arrow ${isExpanded ? 'open' : ''}">▼</span>
                  </button>
                  ${isExpanded ? `
                    <div class="module-content">
                      <p class="module-desc">${m.desc}</p>
                      ${m.queries.map(q => `
                        <button onclick="window.app.runQuickQuery(\`${q.sql.replace(/`/g, '\\`')}\`)" class="query-snippet">
                          <span class="query-snippet-label">${q.label}:</span> ${q.sql}
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Sidebar: Lecturer Panel -->
          ${simState.isLecturerMode ? `
            <div class="sidebar-section">
              <div class="lecturer-panel" style="margin:0; border-radius: var(--r-lg);">
                <div class="lecturer-panel-title">👨‍🏫 Panel Dosen</div>
                <div style="margin-bottom:12px;">
                  <div class="insert-field-label">Tambah Soal Custom</div>
                  <input id="customQuestionTitle" class="form-input" style="margin-bottom:6px;" placeholder="Deskripsi soal..." >
                  <input id="customQuestionExpected" class="form-input mono" style="margin-bottom:8px;" placeholder="Expected SQL...">
                  <button onclick="window.app.addCustomQuestion()" class="btn w-full" style="background:var(--amber-600);color:white;border-color:var(--amber-600);">Tambah Soal</button>
                </div>
                <div style="border-top:1px solid var(--amber-200); padding-top:12px;">
                  <div class="insert-field-label" style="margin-bottom:8px;">Export / Import Database</div>
                  <div style="display:flex;gap:6px;">
                    <button onclick="window.app.exportDatabaseJson()" class="btn btn-secondary btn-sm" style="flex:1;">⬇ Export</button>
                    <label class="btn btn-sm" style="flex:1; background:#0f172a; color:white; cursor:pointer;">
                      ⬆ Import <input type="file" accept=".json" hidden onchange="window.app.importDatabaseJson(event)">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
        </aside>

        <!-- ====== MAIN AREA ====== -->
        <main class="simlab-main">

          <!-- Hero Intro Bar -->
          <div class="page-intro">
            <div class="page-intro-title">🧪 SQL Simulator Interaktif</div>
            <div class="page-intro-desc">
              Tulis query SQL → lihat visualisasi langkah demi langkah bagaimana database memproses data Anda.
              Tabel A + Query X = Output Z.
            </div>
            <div class="page-intro-stat-grid">
              <div class="intro-stat">
                <div class="intro-stat-icon">🗄</div>
                <div>
                  <div class="intro-stat-label">Tabel Aktif</div>
                  <div class="intro-stat-value">${tableCount} Tabel</div>
                </div>
              </div>
              <div class="intro-stat">
                <div class="intro-stat-icon">📊</div>
                <div>
                  <div class="intro-stat-label">Total Data</div>
                  <div class="intro-stat-value">${totalRows} Baris</div>
                </div>
              </div>
              <div class="intro-stat">
                <div class="intro-stat-icon">📋</div>
                <div>
                  <div class="intro-stat-label">Total Kolom</div>
                  <div class="intro-stat-value">${totalCols} Kolom</div>
                </div>
              </div>
              <div class="intro-stat">
                <div class="intro-stat-icon">🏆</div>
                <div>
                  <div class="intro-stat-label">Soal Latihan</div>
                  <div class="intro-stat-value">${simState.exercises.length} Soal</div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-pad">

            <!-- ====== SQL EDITOR CARD ====== -->
            <div class="editor-card">
              <!-- Toolbar -->
              <div class="editor-toolbar">
                <button
                  onclick="window.app.runPlaygroundQuery()"
                  class="btn btn-run"
                  title="Ctrl+Enter"
                >
                  ▶ Jalankan Query
                </button>
                <button onclick="window.app.formatQuery()" class="btn btn-secondary btn-sm">Format</button>
                <button onclick="window.app.clearPlaygroundEditor()" class="btn btn-secondary btn-sm">Bersihkan</button>
                <button onclick="window.app.resetCurrentDb()" class="btn btn-secondary btn-sm" style="display:none;" id="btnResetToolbar">↺ Reset DB</button>

                <div style="margin-left:auto; display:flex; align-items:center; gap:6px;">
                  <select
                    onchange="if(this.value){ window.app.setEditorValue(this.value); this.value=''; }"
                    class="form-select"
                    style="font-size:11.5px; padding:6px 28px 6px 10px; max-width:200px;"
                  >
                    <option value="">📋 Riwayat Query</option>
                    ${state.getQueryHistory().slice(0, 15).map(q =>
                      `<option value="${q.replace(/"/g, '&quot;')}">${q.slice(0, 60)}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>

              <!-- Editor Area -->
              <div class="editor-area">
                <div class="line-numbers" id="editorLineNumbers">1<br>2<br>3<br>4<br>5</div>
                <textarea
                  id="sqlInput"
                  spellcheck="false"
                  autocomplete="off"
                  placeholder="-- Tulis query SQL di sini...
-- Contoh: SELECT * FROM mahasiswa WHERE ipk > 3.5 ORDER BY ipk DESC"
                  oninput="window.app.updateLineNumbers()"
                  onkeydown="if((event.ctrlKey||event.metaKey) && event.key==='Enter'){event.preventDefault();window.app.runPlaygroundQuery();}"
                >${defaultQuery}</textarea>
              </div>

              <!-- Quick Chips -->
              <div class="editor-chips-bar">
                <span class="chip-label">Coba:</span>
                ${[
                  { l: "SELECT *",      sql: "SELECT * FROM mahasiswa" },
                  { l: "WHERE + IPK",   sql: "SELECT nama, ipk FROM mahasiswa WHERE jurusan='Informatika' ORDER BY ipk DESC" },
                  { l: "GROUP BY",      sql: "SELECT jurusan, COUNT(*) AS total FROM mahasiswa GROUP BY jurusan" },
                  { l: "JOIN 3 Tabel",  sql: "SELECT m.nama, mk.nama_mk, n.nilai_huruf FROM mahasiswa m JOIN nilai n ON m.nim=n.nim JOIN matakuliah mk ON n.kode_mk=mk.kode_mk LIMIT 10" },
                  { l: "AVG Subquery",  sql: "SELECT * FROM mahasiswa WHERE ipk > (SELECT AVG(ipk) FROM mahasiswa)" },
                ].map(c => `
                  <button onclick="window.app.runQuickQuery(\`${c.sql.replace(/`/g, '\\`')}\`)" class="chip" title="${c.sql}">
                    ${c.l}
                  </button>
                `).join('')}
              </div>
            </div>
            <!-- END SQL Editor Card -->

            <!-- ====== ERROR ALERT ====== -->
            <div id="queryErrorAlert" style="display:none; margin-bottom:14px;" class="alert alert-error">
              <div class="alert-icon">⚠</div>
              <div>
                <div class="alert-title">Error SQL</div>
                <div class="alert-body" id="queryErrorMessage"></div>
              </div>
            </div>

            <!-- ====== RESULTS + VISUALIZER CARD ====== -->
            <div class="card">

              <!-- Tabs Bar -->
              <div class="tabs-bar">
                <button
                  onclick="window.app.switchSimlabTab('hasil')"
                  class="tab-btn ${simState.activeTab === 'hasil' ? 'active' : ''}"
                >
                  📊 Hasil Query
                </button>
                <button
                  onclick="window.app.switchSimlabTab('latihan')"
                  class="tab-btn ${simState.activeTab === 'latihan' ? 'active' : ''}"
                >
                  🎯 Latihan Soal
                  <span style="margin-left:5px; background:${simState.activeTab === 'latihan' ? 'rgba(255,255,255,0.3)' : 'var(--primary-subtle)'}; color: ${simState.activeTab === 'latihan' ? 'white' : 'var(--primary)'}; border-radius:var(--r-full); padding: 1px 7px; font-size:10.5px; font-weight:800;">
                    ${simState.exercises.length + simState.customQuestions.length}
                  </span>
                </button>
                <button
                  onclick="window.app.switchSimlabTab('buat-tabel')"
                  class="tab-btn ${simState.activeTab === 'buat-tabel' ? 'active' : ''}"
                >
                  ➕ Buat Tabel
                </button>

                <div class="tabs-meta">
                  <span id="resultMetaStats" style="font-size:11.5px; color:var(--text-500);"></span>
                  <button onclick="window.app.exportResultCsv()" class="btn btn-secondary btn-xs">⬇ CSV</button>
                  <button onclick="window.app.copyResultJson()" class="btn btn-secondary btn-xs">⎘ Salin</button>
                </div>
              </div>

              <!-- TAB: Hasil Query -->
              <div id="tabContentHasil" style="${simState.activeTab === 'hasil' ? 'display:block;' : 'display:none;'}">

                <!-- Visual Pipeline -->
                <div id="visualPipelineBox" class="pipeline-section">
                  <div class="pipeline-label">
                    ⚡ Visualisasi Alur Query · Tabel A + Query X = Output Z
                  </div>
                  <div class="pipeline-scroll">
                    <div id="pipelineStepsList" class="pipeline-track">
                      <!-- populated by JS -->
                    </div>
                  </div>
                </div>

                <!-- Result table or empty state -->
                <div id="emptyResultPlaceholder" class="empty-state">
                  <div class="empty-icon">🔍</div>
                  <div class="empty-title">Belum ada hasil</div>
                  <div class="empty-desc">Tulis query SQL di atas lalu tekan <strong>▶ Jalankan Query</strong> untuk melihat Output Z.</div>
                </div>

                <div id="activeResultTableContainer" style="display:none;"></div>

              </div>
              <!-- END TAB Hasil -->

              <!-- TAB: Latihan Soal -->
              <div id="tabContentLatihan" style="${simState.activeTab === 'latihan' ? 'display:block;' : 'display:none;'}">
                <div style="padding: 14px 16px; border-bottom: 1px solid var(--border-base); background: var(--bg-muted); display:flex; align-items:center; justify-content:space-between;">
                  <div>
                    <div style="font-weight:700; font-size:14px; color:var(--text-900);">🎯 Latihan SQL</div>
                    <div style="font-size:12px; color:var(--text-500); margin-top:2px;">Klik <strong>Salin ke Editor</strong> untuk mencoba, lalu jalankan dan <strong>Cek Jawaban</strong>.</div>
                  </div>
                  <div style="font-size:12px; color:var(--text-500);">
                    ${simState.exercises.filter(e => e.status === 'benar').length} / ${simState.exercises.length} selesai
                    <div style="margin-top:4px; height:6px; width:120px; background:var(--border-base); border-radius:99px; overflow:hidden;">
                      <div style="height:100%; width:${Math.round(simState.exercises.filter(e => e.status === 'benar').length / simState.exercises.length * 100)}%; background: var(--green-600); border-radius:99px; transition: width 0.6s ease;"></div>
                    </div>
                  </div>
                </div>
                <div class="exercise-grid">
                  ${renderExercisesHtml([...simState.exercises, ...simState.customQuestions])}
                </div>
              </div>
              <!-- END TAB Latihan -->

              <!-- TAB: Buat Tabel -->
              <div id="tabContentBuatTabel" style="${simState.activeTab === 'buat-tabel' ? 'display:block;' : 'display:none;'}">
                <div style="padding: 14px 16px; border-bottom: 1px solid var(--border-base); background: var(--bg-muted);">
                  <div style="font-weight:700; font-size:14px; color:var(--text-900);">➕ Buat Tabel Baru</div>
                  <div style="font-size:12px; color:var(--text-500); margin-top:2px;">Desain tabel custom Anda secara visual. Kami akan buatkan query CREATE TABLE-nya.</div>
                </div>
                
                <div style="padding: 16px;">
                  <div style="margin-bottom: 16px;">
                    <div class="insert-field-label">Nama Tabel</div>
                    <input id="customTableName" class="form-input" style="max-width:300px;" placeholder="contoh: perpustakaan" value="${simState.customTableName || ''}" onchange="window.app.updateCustomTableName(this.value)">
                  </div>

                  <div style="font-size:12px; font-weight:700; color:var(--text-700); margin-bottom:8px;">Kolom Tabel:</div>
                  <div id="customTableColumnsContainer" style="display:flex; flex-direction:column; gap:8px; margin-bottom: 16px;">
                    ${renderCustomTableColumnsHtml(simState.customTableColumns)}
                  </div>

                  <button onclick="window.app.addCustomTableColumn()" class="btn btn-secondary btn-sm" style="margin-bottom:24px;">
                    + Tambah Kolom
                  </button>

                  <div style="border-top:1px solid var(--border-base); padding-top:16px; display:flex; gap:12px;">
                    <button onclick="window.app.generateCustomTableSql()" class="btn btn-run">
                      ✨ Generate & Jalankan SQL
                    </button>
                  </div>
                </div>
              </div>
              <!-- END TAB Buat Tabel -->

              <!-- Lecturer Quick Insert Form -->
              ${simState.isLecturerMode ? `
                <div class="insert-form">
                  <div class="insert-form-title">📥 Tambah Data ke Tabel (Mode Dosen)</div>
                  <div style="display:flex; gap:8px; align-items:center; margin-bottom:12px; flex-wrap:wrap;">
                    <span style="font-size:12px; font-weight:600; color:var(--amber-800);">Tabel:</span>
                    <select id="selectInsertTable" onchange="window.app.changeInsertTable(this.value)" class="form-select">
                      ${Object.keys(tables).map(t => `<option value="${t}" ${t === simState.selectedInsertTable ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                  </div>
                  <div class="insert-grid" id="insertInputsGrid">
                    ${renderInsertInputs(tables[simState.selectedInsertTable])}
                  </div>
                  <button onclick="window.app.submitInsertRow()" class="btn mt-3" style="background:#0f172a; color:white; border-color:#0f172a;">
                    + Tambah Baris
                  </button>
                </div>
              ` : ''}

            </div>
            <!-- END Results Card -->

          </div>
          <!-- END main-pad -->
        </main>
      </div>

      <!-- Modals Container -->
      <div id="simlabModalsContainer"></div>
    </div>
  `;
}

// ======================== Helper: Render Exercises ========================
function renderExercisesHtml(exercises) {
  const levelColors = {
    'Mudah':    { bg: 'var(--green-50)',  color: 'var(--green-700)',  border: 'var(--green-200)' },
    'Menengah': { bg: 'var(--amber-50)',  color: 'var(--amber-800)', border: 'var(--amber-200)' },
    'Sulit':    { bg: 'var(--red-50)',    color: 'var(--red-600)',   border: 'var(--red-200)' },
    'Custom':   { bg: 'var(--purple-50)', color: 'var(--purple-600)', border: 'var(--purple-200)' },
  };

  return exercises.map((ex, idx) => {
    const lc = levelColors[ex.level] || levelColors['Custom'];
    const statusClass = ex.status === 'benar' ? 'status-benar' : ex.status === 'salah' ? 'status-salah' : ex.status === 'hampir' ? 'status-hampir' : '';

    const statusBadge = {
      benar:  `<span class="badge" style="background:var(--green-50);color:var(--green-700);border:1px solid var(--green-200);">✓ Benar</span>`,
      salah:  `<span class="badge" style="background:var(--red-50);color:var(--red-600);border:1px solid var(--red-200);">✗ Salah</span>`,
      hampir: `<span class="badge" style="background:var(--amber-50);color:var(--amber-800);border:1px solid var(--amber-200);">~ Hampir</span>`,
      belum:  `<span class="badge" style="background:var(--bg-muted);color:var(--text-500);border:1px solid var(--border-base);">— Belum</span>`,
    }[ex.status] || '';

    const tags = (ex.tags || []).map(t =>
      `<span style="font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:4px; background:rgba(234,88,12,0.08); color:var(--primary);">${t}</span>`
    ).join('');

    return `
      <div class="exercise-card ${statusClass}" id="exerciseCard_${ex.id}" style="animation-delay:${idx * 0.04}s">
        <div class="exercise-header">
          <div>
            <div class="exercise-badges">
              <span style="font-size:9px; font-weight:800; padding:2px 7px; border-radius:4px; background:#0f172a; color:white;">#${ex.id}</span>
              <span style="font-size:9.5px; font-weight:700; padding:2px 7px; border-radius:4px; background:${lc.bg}; color:${lc.color}; border:1px solid ${lc.border};">${ex.level}</span>
              <span id="exBadge_${ex.id}">${statusBadge}</span>
            </div>
          </div>
        </div>

        <div class="exercise-title">${ex.title}</div>
        <div class="exercise-desc">${ex.desc}</div>
        ${tags ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;">${tags}</div>` : ''}
        <div class="exercise-hint"><strong>💡 Hint:</strong> ${ex.hint}</div>
        <div class="exercise-actions">
          <button onclick="window.app.setEditorValue(\`${ex.expected.replace(/`/g, '\\`')}\`)" class="btn btn-secondary btn-sm">
            📋 Salin ke Editor
          </button>
          <button onclick="window.app.checkExerciseAnswer('${ex.id}', \`${ex.expected.replace(/`/g, '\\`')}\`)" class="btn btn-sm" style="background:var(--primary);color:white;border-color:var(--primary);">
            ✓ Cek Jawaban
          </button>
          <button onclick="window.app.showExerciseAnswer('${ex.id}', \`${ex.expected.replace(/`/g, '\\`')}\`)" class="btn btn-ghost btn-sm">
            Lihat Solusi
          </button>
        </div>
        <div class="exercise-expected">${ex.expected}</div>
      </div>
    `;
  }).join('');
}

// ======================== Helper: Render Insert Inputs ========================
function renderInsertInputs(tbl) {
  if (!tbl) return '';
  const cols = tbl.schema || tbl.columns;
  return cols.map(c => `
    <div>
      <div class="insert-field-label">
        ${c.name}
        ${c.pk ? ' <span style="color:var(--primary);">(PK)</span>' : ''}
        ${c.fk ? ` <span style="color:var(--blue-600);">(FK→${c.fk.table})</span>` : ''}
      </div>
      <input id="insertCol_${c.name}" class="form-input" placeholder="${c.type}">
    </div>
  `).join('');
}

function renderCustomTableColumnsHtml(columns) {
  if (!columns || columns.length === 0) return `<div style="font-size:12px;color:var(--text-500);font-style:italic;">Belum ada kolom. Tambahkan kolom pertama.</div>`;
  
  return columns.map((col, idx) => `
    <div style="display:flex; gap:10px; align-items:center; background:var(--bg-muted); padding:10px; border-radius:var(--r-md); border:1px solid var(--border-base);">
      <div style="flex:1;">
        <div style="font-size:10px; font-weight:600; color:var(--text-500); margin-bottom:4px;">NAMA KOLOM</div>
        <input class="form-input" style="padding:6px; font-size:12px;" value="${col.name}" onchange="window.app.updateCustomTableColumn(${idx}, 'name', this.value)" placeholder="nama_kolom">
      </div>
      <div style="width:120px;">
        <div style="font-size:10px; font-weight:600; color:var(--text-500); margin-bottom:4px;">TIPE DATA</div>
        <select class="form-select" style="padding:6px; font-size:12px;" onchange="window.app.updateCustomTableColumn(${idx}, 'type', this.value)">
          <option value="INT" ${col.type === 'INT' ? 'selected' : ''}>INT</option>
          <option value="VARCHAR" ${col.type === 'VARCHAR' ? 'selected' : ''}>VARCHAR</option>
          <option value="TEXT" ${col.type === 'TEXT' ? 'selected' : ''}>TEXT</option>
          <option value="FLOAT" ${col.type === 'FLOAT' ? 'selected' : ''}>FLOAT</option>
          <option value="DATE" ${col.type === 'DATE' ? 'selected' : ''}>DATE</option>
        </select>
      </div>
      <div style="width:50px; text-align:center;">
        <div style="font-size:10px; font-weight:600; color:var(--text-500); margin-bottom:4px;">PK</div>
        <input type="checkbox" ${col.pk ? 'checked' : ''} onchange="window.app.updateCustomTableColumn(${idx}, 'pk', this.checked)">
      </div>
      <div style="width:70px; text-align:center;">
        <div style="font-size:10px; font-weight:600; color:var(--text-500); margin-bottom:4px;">NOT NULL</div>
        <input type="checkbox" ${col.notNull ? 'checked' : ''} onchange="window.app.updateCustomTableColumn(${idx}, 'notNull', this.checked)">
      </div>
      <button onclick="window.app.removeCustomTableColumn(${idx})" class="btn btn-ghost btn-xs" style="color:var(--red-600); align-self:flex-end; margin-bottom:2px;" title="Hapus Kolom">✕</button>
    </div>
  `).join('');
}
