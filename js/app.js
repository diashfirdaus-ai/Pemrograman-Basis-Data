// SimLab DB — Master Application Orchestrator (DBLearn ITENAS)
// Premium White & ITENAS Orange Theme with Interactive Visual Pipeline

import { state } from './state.js';
import { sqlEngine } from './sqlEngine.js';
import { renderPlayground, LAB_EXERCISES } from './components/playground.js';
import { renderLanding } from './components/landing.js';
import { renderMeetingView } from './components/meetingView.js';

class AppController {
  constructor() {
    this.lastResult = null;
    this.currentRoute = '';
  }

  init() {
    this.setupRouter();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  setupRouter() {
    window.router = {
      navigate: (path, id = null) => {
        let hash = `#/${path}`;
        if (id) hash += `/${id}`;
        window.location.hash = hash;
      }
    };
  }

  handleRoute() {
    const hash = window.location.hash || '#/landing';
    this.currentRoute = hash;
    this.render();
  }

  render() {
    const mainEl = document.getElementById('mainContentContainer');
    if (!mainEl) return;

    if (this.currentRoute.startsWith('#/playground')) {
      mainEl.innerHTML = renderPlayground(window._lastPlaygroundQuery);
      this.updateLineNumbers();
      setTimeout(() => {
        this.runPlaygroundQuery();
        // Show header badges after render
        const hb = document.getElementById('headerBadges');
        const btnReset = document.getElementById('btnResetHeader');
        const btnResetTb = document.getElementById('btnResetToolbar');
        if (hb) hb.style.display = 'flex';
        if (btnReset) btnReset.style.display = '';
        if (btnResetTb) btnResetTb.style.display = '';
      }, 80);
    } else if (this.currentRoute.startsWith('#/meeting')) {
      const id = this.currentRoute.split('/')[2];
      mainEl.innerHTML = this.wrapWithNavbar(renderMeetingView(id));
      window.scrollTo(0, 0);
    } else {
      mainEl.innerHTML = this.wrapWithNavbar(renderLanding());
      window.scrollTo(0, 0);
    }
  }

  wrapWithNavbar(content) {
    return `
      <header class="simlab-header" style="position: sticky; top: 0; z-index: 100;">
        <div class="header-brand" style="cursor:pointer;" onclick="window.router.navigate('landing')">
          <img src="logo.png" alt="ITENAS" class="header-brand-logo">
          <div class="brand-divider"></div>
          <div>
            <div class="header-title">SIMLAB <span>DB</span></div>
            <div class="header-subtitle">Laboratorium Basis Data Interaktif</div>
          </div>
        </div>
        <div class="header-actions">
          <button onclick="window.router.navigate('landing')" class="btn btn-ghost btn-sm">Beranda</button>
          <button onclick="window.router.navigate('playground')" class="btn btn-primary btn-sm" style="box-shadow: 0 4px 12px rgba(234,88,12,0.3);">
            ▶ Simulator Visual
          </button>
        </div>
      </header>
      <main class="simlab-main-wrapper" style="max-width: 1140px; margin: 0 auto; padding: 48px 24px 80px 24px;">
        ${content}
      </main>
    `;
  }

  // ======================== SQL Execution & Visualization ========================
  runPlaygroundQuery() {
    const textarea = document.getElementById('sqlInput');
    if (!textarea) return;

    const query = textarea.value.trim();
    window._lastPlaygroundQuery = query;

    const errorAlert      = document.getElementById('queryErrorAlert');
    const errorMessage    = document.getElementById('queryErrorMessage');
    const visualBox       = document.getElementById('visualPipelineBox');
    const stepsList       = document.getElementById('pipelineStepsList');
    const emptyPlaceholder= document.getElementById('emptyResultPlaceholder');
    const tableContainer  = document.getElementById('activeResultTableContainer');
    const metaStats       = document.getElementById('resultMetaStats');

    if (!query) {
      if (errorAlert && errorMessage) {
        errorAlert.style.display = 'flex';
        errorMessage.innerText = 'Query kosong. Masukkan instruksi SQL Anda.';
      }
      return;
    }

    const res = sqlEngine.execute(query);
    state.addQueryHistory(query);
    this.lastResult = res;

    if (!res.success) {
      if (errorAlert && errorMessage) {
        errorAlert.style.display = 'flex';
        errorMessage.innerText = res.error;
      }
      if (tableContainer) tableContainer.style.display = 'none';
      if (emptyPlaceholder) emptyPlaceholder.style.display = 'block';
      if (stepsList) stepsList.innerHTML = '';
      return;
    }

    // Hide error alert on success
    if (errorAlert) errorAlert.style.display = 'none';

    // 1. Render Visual Pipeline
    if (stepsList && res.viz && res.viz.length > 0) {
      if (visualBox) visualBox.style.display = 'block';
      const stepsHtml = res.viz.map((step, idx) => {
        let typeClass = 'step-table';
        if (step.type === 'output') typeClass = 'step-output';
        else if (step.type === 'filter') typeClass = 'step-filter';
        else if (step.type === 'join') typeClass = 'step-join';
        else if (step.type === 'group') typeClass = 'step-group';

        const badgeLabels = {
          table: 'FROM', filter: 'WHERE', join: 'JOIN', group: 'GROUP BY', output: 'OUTPUT'
        };
        const badgeLabel = badgeLabels[step.type] || step.type.toUpperCase();

        return `
          <div class="pipeline-step ${typeClass}" style="animation-delay:${idx * 0.08}s">
            <span class="step-badge">${badgeLabel}</span>
            <div class="step-title" title="${step.title}">${step.title}</div>
            <div class="step-desc" title="${step.desc}">${step.desc}</div>
            ${step.count ? `<div class="step-count">${step.count}</div>` : ''}
          </div>
          ${idx < res.viz.length - 1 ? `<div class="pipeline-arrow">→</div>` : ''}
        `;
      }).join('');
      stepsList.innerHTML = stepsHtml;
    } else if (visualBox) {
      visualBox.style.display = 'none';
    }

    // 2. Render Output Table
    if (emptyPlaceholder) emptyPlaceholder.style.display = 'none';
    if (tableContainer) {
      tableContainer.style.display = 'block';

      // Non-SELECT (INSERT/UPDATE/DELETE/CREATE/DROP)
      if (res.type && res.type !== 'SELECT') {
        tableContainer.innerHTML = `
          <div class="success-banner">
            <div class="success-banner-title">✓ ${res.message}</div>
            <div class="success-banner-desc">Perubahan disimpan ke database in-memory. Gunakan SELECT untuk melihat data terbaru.</div>
          </div>
        `;
        if (metaStats) metaStats.innerText = `${res.affectedRows} baris terpengaruh · ${res.durationMs}ms`;
        return;
      }

      if (!res.data || res.data.length === 0) {
        tableContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📬</div>
            <div class="empty-title">Hasil kosong — 0 baris</div>
            <div class="empty-desc">Tidak ada data yang cocok dengan kondisi WHERE atau JOIN Anda.</div>
          </div>
        `;
        if (metaStats) metaStats.innerText = `0 baris · ${res.durationMs}ms`;
        return;
      }

      const cols = res.columns;
      const rows = res.data;
      const page = (window._simlabState && window._simlabState.pageNumber) || 0;
      const pageSize = 50;
      const pagedRows = rows.slice(page * pageSize, (page + 1) * pageSize);

      const theadHtml = cols.map(c =>
        `<th>${c}</th>`
      ).join('');

      const tbodyHtml = pagedRows.map((r, rIdx) => `
        <tr>
          ${cols.map(c => {
            const val = r[c];
            const display = (val === null || val === undefined)
              ? `<span class="null-val">NULL</span>`
              : String(val);
            return `<td>${display}</td>`;
          }).join('')}
        </tr>
      `).join('');

      const totalPages = Math.ceil(rows.length / pageSize);

      tableContainer.innerHTML = `
        <div class="result-table-wrapper">
          <table class="table-sql">
            <thead><tr>${theadHtml}</tr></thead>
            <tbody>${tbodyHtml}</tbody>
          </table>
        </div>
        <div class="stats-row">
          <div class="stat-item">📊 <strong>${rows.length}</strong> baris</div>
          <div class="stat-item">📋 <strong>${cols.length}</strong> kolom</div>
          <div class="stat-item">⚡ <strong>${res.durationMs}ms</strong></div>
          ${totalPages > 1 ? `<div class="stat-item">Halaman <strong>${page + 1}</strong> / ${totalPages}</div>` : ''}
          ${totalPages > 1 ? `
            <div style="margin-left:auto; display:flex; gap:6px;">
              <button ${page === 0 ? 'disabled' : ''} onclick="window.app.changePage(${page - 1})" class="btn btn-secondary btn-xs" ${page === 0 ? 'style="opacity:0.4;"' : ''}>← Prev</button>
              <button ${(page + 1) * pageSize >= rows.length ? 'disabled' : ''} onclick="window.app.changePage(${page + 1})" class="btn btn-secondary btn-xs" ${(page + 1) * pageSize >= rows.length ? 'style="opacity:0.4;"' : ''}>Next →</button>
            </div>
          ` : ''}
        </div>
      `;

      if (metaStats) {
        metaStats.innerText = `${rows.length} baris × ${cols.length} kolom · ${res.durationMs}ms`;
      }
    }
  }

  changePage(newPage) {
    window._simlabState.pageNumber = Math.max(0, newPage);
    this.runPlaygroundQuery();
  }

  formatQuery() {
    const textarea = document.getElementById('sqlInput');
    if (!textarea) return;
    let v = textarea.value;
    const keywords = [
      "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
      "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", "AND", "OR",
      "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM",
      "CREATE TABLE", "DROP TABLE", "UNION", "BETWEEN", "IN", "LIKE", "IS NULL", "IS NOT NULL"
    ];
    keywords.forEach(k => {
      const reg = new RegExp(`\\b${k.replace(' ', '\\s+')}\\b`, 'gi');
      v = v.replace(reg, k);
    });
    textarea.value = v;
    window._lastPlaygroundQuery = v;
    this.updateLineNumbers();
  }

  clearPlaygroundEditor() {
    const textarea = document.getElementById('sqlInput');
    if (textarea) textarea.value = '';
    window._lastPlaygroundQuery = '';
    this.updateLineNumbers();

    const emptyPlaceholder   = document.getElementById('emptyResultPlaceholder');
    const tableContainer     = document.getElementById('activeResultTableContainer');
    const stepsList          = document.getElementById('pipelineStepsList');
    const visualBox          = document.getElementById('visualPipelineBox');
    const errorAlert         = document.getElementById('queryErrorAlert');

    if (emptyPlaceholder)  emptyPlaceholder.style.display  = 'block';
    if (tableContainer)    tableContainer.style.display    = 'none';
    if (stepsList)         stepsList.innerHTML              = '';
    if (visualBox)         visualBox.style.display         = 'block';
    if (errorAlert)        errorAlert.style.display        = 'none';
  }

  setEditorValue(sql) {
    const textarea = document.getElementById('sqlInput');
    if (textarea) {
      textarea.value = sql;
      window._lastPlaygroundQuery = sql;
      this.updateLineNumbers();
      // Switch to hasil tab
      window._simlabState.activeTab = 'hasil';
      this.render();
      this.runPlaygroundQuery();
    }
  }

  runQuickQuery(sql) {
    const textarea = document.getElementById('sqlInput');
    if (textarea) {
      textarea.value = sql;
      window._lastPlaygroundQuery = sql;
      this.updateLineNumbers();
    }
    window._simlabState.activeTab = 'hasil';
    this.render();
    this.runPlaygroundQuery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateLineNumbers() {
    const textarea   = document.getElementById('sqlInput');
    const lineGutter = document.getElementById('editorLineNumbers');
    if (!textarea || !lineGutter) return;
    const lineCount = textarea.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= Math.max(lineCount, 5); i++) {
      html += `${i}<br>`;
    }
    lineGutter.innerHTML = html;
  }

  // ======================== Tabs ========================
  switchSimlabTab(tabName) {
    window._simlabState.activeTab = tabName;
    window._simlabState.pageNumber = 0;
    this.render();
    if (tabName === 'hasil') {
      this.runPlaygroundQuery();
    }
  }

  toggleModule(moduleId) {
    if (!window._simlabState.expandedModules) window._simlabState.expandedModules = {};
    window._simlabState.expandedModules[moduleId] = !window._simlabState.expandedModules[moduleId];
    this.render();
    if (window._simlabState.activeTab === 'hasil') {
      this.runPlaygroundQuery();
    }
  }

  toggleLecturerMode() {
    window._simlabState.isLecturerMode = !window._simlabState.isLecturerMode;
    this.render();
    if (window._simlabState.activeTab === 'hasil') {
      this.runPlaygroundQuery();
    }
  }

  resetCurrentDb() {
    if (confirm('Kembalikan database ke data awal? Semua perubahan akan hilang.')) {
      state.resetDatabases();
      window._simlabState.exercises = LAB_EXERCISES.map(e => ({ ...e, status: 'belum' }));
      this.render();
      this.runPlaygroundQuery();
    }
  }

  // ======================== Table Modal ========================
  openTableModal(tableName) {
    const currentDbName = state.getActiveDb() || 'akademik';
    const dbs = state.getDatabases();
    const currentDb = dbs[currentDbName] || dbs.akademik;
    const tbl = currentDb.tables[tableName];
    if (!tbl) return;

    const cols = tbl.schema || tbl.columns;
    const rows = tbl.rows;
    const container = document.getElementById('simlabModalsContainer');
    if (!container) return;

    const schemaHtml = cols.map(c => `
      <div class="schema-pill">
        <span class="schema-pill-name">${c.name}</span>
        <span class="schema-pill-type">${c.type}</span>
        ${c.pk ? `<span class="badge-pk">PK</span>` : ''}
        ${c.fk ? `<span class="badge-fk">FK→${c.fk.table}.${c.fk.column}</span>` : ''}
      </div>
    `).join('');

    const previewRows = rows.slice(0, 15);
    const theadHtml = cols.map(c => `<th>${c.name}${c.pk ? ' <span class="badge-pk">PK</span>' : ''}${c.fk ? ` <span class="badge-fk">FK</span>` : ''}</th>`).join('');
    const tbodyHtml = previewRows.map((r, rIdx) => `
      <tr>
        ${cols.map(c => {
          const val = r[c.name];
          return `<td>${val === null || val === undefined ? '<span class="null-val">NULL</span>' : String(val)}</td>`;
        }).join('')}
      </tr>
    `).join('');

    const fkCols = cols.filter(c => c.fk);

    container.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target===this) window.app.closeSimlabModal()">
        <div class="modal-box" style="max-width:900px;">
          <div class="modal-head">
            <div>
              <div class="modal-title">⊞ ${tbl.name}</div>
              <div class="modal-subtitle">${rows.length} baris · ${cols.length} kolom${fkCols.length > 0 ? ` · ${fkCols.length} FK` : ''}</div>
            </div>
            <button onclick="window.app.closeSimlabModal()" class="modal-close">✕</button>
          </div>
          <div class="modal-body">

            <!-- Schema -->
            <div style="margin-bottom:20px;">
              <div style="font-size:10.5px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-500); margin-bottom:10px;">Schema Tabel</div>
              <div style="display:flex; flex-wrap:wrap;">${schemaHtml}</div>
            </div>

            ${fkCols.length > 0 ? `
              <div style="margin-bottom:20px; padding:12px 14px; background:var(--blue-50); border:1px solid var(--blue-200); border-radius:var(--r-lg);">
                <div style="font-size:11px; font-weight:700; color:var(--blue-600); margin-bottom:6px;">🔗 Foreign Key Relationships</div>
                ${fkCols.map(c => `
                  <div style="font-size:12px; color:var(--text-700); margin-bottom:3px;">
                    <code style="background:white; padding:1px 5px; border-radius:4px; border:1px solid var(--border-base);">${tableName}.${c.name}</code>
                    <span style="color:var(--blue-600); margin:0 6px;">→</span>
                    <code style="background:white; padding:1px 5px; border-radius:4px; border:1px solid var(--border-base);">${c.fk.table}.${c.fk.column}</code>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Quick Query -->
            <div style="margin-bottom:16px; display:flex; flex-wrap:wrap; gap:8px;">
              <button onclick="window.app.runQuickQuery('SELECT * FROM ${tableName}'); window.app.closeSimlabModal();" class="btn btn-run btn-sm">
                ▶ SELECT * FROM ${tableName}
              </button>
              <button onclick="window.app.runQuickQuery('SELECT * FROM ${tableName} LIMIT 5'); window.app.closeSimlabModal();" class="btn btn-secondary btn-sm">
                LIMIT 5
              </button>
              ${fkCols.map(c => `
                <button onclick="window.app.runQuickQuery('SELECT * FROM ${tableName} JOIN ${c.fk.table} ON ${tableName}.${c.name} = ${c.fk.table}.${c.fk.column} LIMIT 10'); window.app.closeSimlabModal();" class="btn btn-secondary btn-sm">
                  JOIN ${c.fk.table}
                </button>
              `).join('')}
            </div>

            <!-- Data Preview -->
            <div>
              <div style="font-size:10.5px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-500); margin-bottom:10px;">
                Data Preview (${Math.min(15, rows.length)} dari ${rows.length} baris)
              </div>
              <div style="overflow:auto; border:1px solid var(--border-base); border-radius:var(--r-lg); max-height:340px;">
                <table class="table-sql" style="min-width:500px;">
                  <thead><tr>${theadHtml}</tr></thead>
                  <tbody>${tbodyHtml}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ======================== ER Diagram Modal ========================
  openErDiagramModal() {
    const container = document.getElementById('simlabModalsContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target===this) window.app.closeSimlabModal()">
        <div class="modal-box" style="max-width:760px;">
          <div class="modal-head">
            <div>
              <div class="modal-title">🔗 ER Diagram — Relasi Antar Tabel</div>
              <div class="modal-subtitle">Database Akademik ITENAS</div>
            </div>
            <button onclick="window.app.closeSimlabModal()" class="modal-close">✕</button>
          </div>
          <div class="modal-body">

            <!-- ER Diagram SVG -->
            <div style="position:relative; height:300px; background:linear-gradient(135deg,#f8fafc,var(--orange-50)); border-radius:var(--r-xl); border:1px solid var(--border-base); overflow:hidden; margin-bottom:20px;">
              <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
                <!-- mahasiswa → nilai -->
                <line x1="27%" y1="50%" x2="43%" y2="50%" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 4"/>
                <!-- matakuliah → nilai -->
                <line x1="73%" y1="50%" x2="57%" y2="50%" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 4"/>
                <!-- dosen label top -->
                <text x="12%" y="18%" font-size="10" fill="#64748b" font-weight="600" text-anchor="middle">dosen</text>

                <text x="35%" y="42%" font-size="10" fill="#ea580c" font-weight="800" text-anchor="middle">1</text>
                <text x="35%" y="60%" font-size="10" fill="#ea580c" font-weight="800" text-anchor="middle">N</text>
                <text x="65%" y="42%" font-size="10" fill="#ea580c" font-weight="800" text-anchor="middle">N</text>
                <text x="65%" y="60%" font-size="10" fill="#ea580c" font-weight="800" text-anchor="middle">1</text>
              </svg>

              <!-- mahasiswa box -->
              <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);width:22%;">
                <div style="background:white;border:2px solid #0f172a;border-radius:14px;padding:12px 14px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <div style="font-weight:800;font-size:13px;color:#0f172a;">mahasiswa</div>
                  <div style="font-size:10px;color:var(--primary);font-weight:700;margin-top:2px;">PK: nim</div>
                  <div style="margin-top:8px;font-size:11px;color:#64748b;">18 baris<br>6 kolom</div>
                </div>
              </div>

              <!-- nilai box (center, highlighted) -->
              <div style="position:absolute;left:38%;top:50%;transform:translateY(-50%);width:24%;">
                <div style="background:var(--orange-50);border:2px solid var(--primary);border-radius:14px;padding:12px 14px;box-shadow:0 4px 16px rgba(234,88,12,0.15);">
                  <div style="font-weight:800;font-size:13px;color:var(--orange-800);">nilai</div>
                  <div style="font-size:10px;color:var(--primary);font-weight:700;margin-top:2px;">PK: id</div>
                  <div style="margin-top:8px;font-size:10px;color:var(--orange-700);">
                    20 baris · 7 kolom<br>
                    FK: nim → mahasiswa<br>
                    FK: kode_mk → matakuliah
                  </div>
                </div>
              </div>

              <!-- matakuliah box -->
              <div style="position:absolute;left:68%;top:50%;transform:translateY(-50%);width:24%;">
                <div style="background:white;border:2px solid #0f172a;border-radius:14px;padding:12px 14px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <div style="font-weight:800;font-size:13px;color:#0f172a;">matakuliah</div>
                  <div style="font-size:10px;color:var(--primary);font-weight:700;margin-top:2px;">PK: kode_mk</div>
                  <div style="margin-top:8px;font-size:11px;color:#64748b;">12 baris<br>5 kolom</div>
                </div>
              </div>

              <!-- dosen small -->
              <div style="position:absolute;left:5%;top:10%;">
                <div style="background:white;border:1px solid var(--border-base);border-radius:10px;padding:7px 12px;box-shadow:var(--shadow-xs);font-size:11px;">
                  <span style="font-weight:700;color:#0f172a;">dosen</span>
                  <span style="color:#94a3b8;font-size:10px;"> · 6 baris</span>
                </div>
              </div>
            </div>

            <!-- Explanation -->
            <div style="font-size:13px; color:var(--text-500); line-height:1.7; margin-bottom:20px;">
              Diagram ini menunjukkan alur relasi database akademik ITENAS:
              <strong>mahasiswa</strong> (1) berelasi ke <strong>nilai</strong> (N) melalui FK <code>nim</code>,
              dan <strong>nilai</strong> (N) ke <strong>matakuliah</strong> (1) via FK <code>kode_mk</code>.
              Anda bisa JOIN ketiga tabel untuk mendapatkan output seperti Nama + Matakuliah + Nilai Huruf.
            </div>

            <!-- Quick JOIN queries -->
            <div style="font-size:11px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--text-500); margin-bottom:10px;">Coba Query JOIN:</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              <button onclick="window.app.runQuickQuery('SELECT mahasiswa.nama, nilai.nilai_huruf FROM mahasiswa JOIN nilai ON mahasiswa.nim = nilai.nim LIMIT 10'); window.app.closeSimlabModal();" class="btn btn-secondary btn-sm">
                Mahasiswa JOIN Nilai
              </button>
              <button onclick="window.app.runQuickQuery('SELECT m.nama, mk.nama_mk, n.nilai_huruf FROM mahasiswa m JOIN nilai n ON m.nim = n.nim JOIN matakuliah mk ON n.kode_mk = mk.kode_mk'); window.app.closeSimlabModal();" class="btn btn-run btn-sm">
                ▶ JOIN 3 Tabel
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  closeSimlabModal() {
    const container = document.getElementById('simlabModalsContainer');
    if (container) container.innerHTML = '';
  }

  // ======================== Exercise Checker ========================
  checkExerciseAnswer(exId, expectedSql) {
    const idNum = parseInt(exId, 10);
    const ex = window._simlabState.exercises.find(e => e.id === idNum) ||
               window._simlabState.customQuestions.find(e => e.id === idNum);
    if (!ex) return;

    try {
      const expRes = sqlEngine.execute(expectedSql);
      const userRes = this.lastResult;

      let status = 'salah';
      if (!userRes || !userRes.success) {
        status = 'salah';
      } else if (ex.id === 11) {
        const currentDb = sqlEngine.getActiveDatabase().db;
        const hasRow = currentDb.tables.mahasiswa?.rows.some(r => r.nim === 'IF2024001');
        status = hasRow ? 'benar' : 'salah';
      } else if (ex.id === 12) {
        const currentDb = sqlEngine.getActiveDatabase().db;
        const hasTbl = !!currentDb.tables.presensi;
        status = hasTbl ? 'benar' : 'salah';
      } else {
        const normalize = rows => rows.map(r => {
          const sorted = {};
          Object.keys(r).sort().forEach(k => sorted[k] = r[k]);
          return sorted;
        }).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

        const userNorm = normalize(userRes.data || []);
        const expNorm  = normalize(expRes.data || []);

        if (JSON.stringify(userNorm) === JSON.stringify(expNorm)) {
          status = 'benar';
        } else if (userNorm.length === expNorm.length) {
          status = 'hampir';
        } else {
          status = 'salah';
        }
      }

      ex.status = status;
      this.render();
      if (window._simlabState.activeTab === 'latihan') {
        // Re-open latihan tab after render
        const tabLatihan = document.getElementById('tabContentLatihan');
        const tabHasil   = document.getElementById('tabContentHasil');
        if (tabLatihan) tabLatihan.style.display = 'block';
        if (tabHasil)   tabHasil.style.display   = 'none';
      } else {
        this.runPlaygroundQuery();
      }

      if (status === 'benar') {
        this.launchConfetti();
        setTimeout(() => alert(`🎉 Jawaban Benar! Soal #${ex.id} selesai.`), 100);
      } else if (status === 'hampir') {
        alert(`Jumlah baris sudah tepat (${userRes.data.length}), tapi isi nilai belum persis sama. Periksa urutan atau kolom yang dipilih.`);
      } else {
        alert(`Jawaban belum sesuai. Coba klik "Lihat Solusi" untuk melihat query yang diharapkan.`);
      }
    } catch (err) {
      alert(`Error saat memeriksa: ${err.message}`);
    }
  }

  showExerciseAnswer(exId, expectedSql) {
    const textarea = document.getElementById('sqlInput');
    if (textarea) {
      textarea.value = expectedSql;
      window._lastPlaygroundQuery = expectedSql;
      this.updateLineNumbers();
    }
    window._simlabState.activeTab = 'hasil';
    this.render();
    this.runPlaygroundQuery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ======================== Custom Table Builder ========================
  addCustomTableColumn() {
    if (!window._simlabState.customTableColumns) {
      window._simlabState.customTableColumns = [];
    }
    window._simlabState.customTableColumns.push({ name: '', type: 'VARCHAR', pk: false, notNull: false });
    this.render();
    if (window._simlabState.activeTab === 'buat-tabel') {
        const tabBuatTabel = document.getElementById('tabContentBuatTabel');
        const tabHasil     = document.getElementById('tabContentHasil');
        const tabLatihan   = document.getElementById('tabContentLatihan');
        if (tabBuatTabel) tabBuatTabel.style.display = 'block';
        if (tabHasil)     tabHasil.style.display     = 'none';
        if (tabLatihan)   tabLatihan.style.display   = 'none';
    }
  }

  removeCustomTableColumn(idx) {
    if (!window._simlabState.customTableColumns) return;
    window._simlabState.customTableColumns.splice(idx, 1);
    this.render();
    if (window._simlabState.activeTab === 'buat-tabel') {
        const tabBuatTabel = document.getElementById('tabContentBuatTabel');
        const tabHasil     = document.getElementById('tabContentHasil');
        const tabLatihan   = document.getElementById('tabContentLatihan');
        if (tabBuatTabel) tabBuatTabel.style.display = 'block';
        if (tabHasil)     tabHasil.style.display     = 'none';
        if (tabLatihan)   tabLatihan.style.display   = 'none';
    }
  }

  updateCustomTableColumn(idx, field, value) {
    if (!window._simlabState.customTableColumns) return;
    window._simlabState.customTableColumns[idx][field] = value;
  }
  
  updateCustomTableName(value) {
     window._simlabState.customTableName = value;
  }

  generateCustomTableSql() {
    const tableName = window._simlabState.customTableName || '';
    if (!tableName.trim()) {
      alert("Nama tabel tidak boleh kosong!");
      return;
    }
    
    const columns = window._simlabState.customTableColumns || [];
    if (columns.length === 0) {
      alert("Tambahkan minimal 1 kolom!");
      return;
    }

    let colDefs = [];
    for (const col of columns) {
      if (!col.name.trim()) {
        alert("Semua kolom harus memiliki nama!");
        return;
      }
      let def = `${col.name} ${col.type}`;
      if (col.pk) def += " PRIMARY KEY";
      if (col.notNull && !col.pk) def += " NOT NULL";
      colDefs.push(def);
    }

    const sql = `CREATE TABLE ${tableName.trim()} (\n  ${colDefs.join(',\n  ')}\n);`;
    
    this.setEditorValue(sql);
  }

  // ======================== Lecturer Features ========================
  addCustomQuestion() {
    const titleInput    = document.getElementById('customQuestionTitle');
    const expectedInput = document.getElementById('customQuestionExpected');
    if (!titleInput || !expectedInput) return;
    const title    = titleInput.value.trim();
    const expected = expectedInput.value.trim();
    if (!title || !expected) {
      alert('Isi deskripsi soal dan Expected SQL terlebih dahulu.');
      return;
    }

    const nextId = window._simlabState.exercises.length + window._simlabState.customQuestions.length + 1;
    window._simlabState.customQuestions.push({
      id: nextId, title, desc: title,
      hint: 'Soal dari Dosen.', expected,
      level: 'Custom', status: 'belum', tags: ['Custom']
    });

    titleInput.value    = '';
    expectedInput.value = '';
    this.render();
    if (window._simlabState.activeTab === 'hasil') this.runPlaygroundQuery();
  }

  exportDatabaseJson() {
    const dbs  = state.getDatabases();
    const blob = new Blob([JSON.stringify(dbs, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `simlab-db-itenas-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importDatabaseJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        state.saveDatabases(parsed);
        alert('Database berhasil di-import!');
        this.render();
        this.runPlaygroundQuery();
      } catch {
        alert('Format file JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  }

  changeInsertTable(tblName) {
    window._simlabState.selectedInsertTable = tblName;
    const currentDb = sqlEngine.getActiveDatabase().db;
    const tbl = currentDb.tables[tblName];
    const grid = document.getElementById('insertInputsGrid');
    if (grid && tbl) {
      const cols = tbl.schema || tbl.columns;
      grid.innerHTML = cols.map(c => `
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
  }

  submitInsertRow() {
    const tblName  = window._simlabState.selectedInsertTable;
    const currentDb = sqlEngine.getActiveDatabase().db;
    const tbl = currentDb.tables[tblName];
    if (!tbl) return;

    const cols = tbl.schema || tbl.columns;
    const row  = {};
    cols.forEach(c => {
      const inp = document.getElementById(`insertCol_${c.name}`);
      const val = inp ? inp.value.trim() : '';
      if (!val) row[c.name] = null;
      else if (/^-?\d+(\.\d+)?$/.test(val)) row[c.name] = Number(val);
      else row[c.name] = val;
    });

    const idCol = cols.find(c => c.name.toLowerCase() === 'id');
    if (idCol && !row[idCol.name]) {
      row[idCol.name] = Math.max(0, ...tbl.rows.map(r => Number(r[idCol.name]) || 0)) + 1;
    }

    tbl.rows.push(row);
    sqlEngine.saveDatabase(state.getActiveDb(), currentDb);
    alert(`✓ 1 baris berhasil ditambahkan ke tabel '${tblName}'!`);
    this.render();
    this.runPlaygroundQuery();
  }

  // ======================== Export / Copy ========================
  exportResultCsv() {
    if (!this.lastResult || !this.lastResult.data || this.lastResult.data.length === 0) {
      alert('Tidak ada data hasil query untuk di-export.');
      return;
    }
    const cols    = this.lastResult.columns;
    const csvRows = [cols.join(',')];
    this.lastResult.data.forEach(r => {
      const vals = cols.map(c => `"${String(r[c] !== null && r[c] !== undefined ? r[c] : '').replace(/"/g, '""')}"`);
      csvRows.push(vals.join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `hasil_query_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async copyResultJson() {
    if (!this.lastResult) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(this.lastResult.data || [], null, 2));
      alert('✓ Hasil query disalin ke clipboard!');
    } catch {
      alert('Gagal menyalin. Coba lagi.');
    }
  }

  // ======================== Confetti ========================
  launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ea580c', '#f97316', '#fb923c', '#059669', '#0284c7', '#d97706', '#9333ea'];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x:        Math.random() * canvas.width,
        y:        Math.random() * canvas.height - canvas.height,
        size:     Math.random() * 9 + 4,
        speed:    Math.random() * 4 + 2,
        color:    colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape:    Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    let frames = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frames / 140);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();
        p.y        += p.speed;
        p.rotation += 3;
      });
      frames++;
      if (frames < 160) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  // ======================== Stubs for Meeting Features ========================
  toggleMeeting(id) {
    alert("Fitur progress tracking segera hadir!");
  }
  openQuizModal(id) {
    alert("Fitur kuis dalam tahap pembaruan. Silakan lanjutkan pembelajaran!");
  }
  openAssignmentModal(id) {
    alert("Fitur pengumpulan tugas dalam tahap pembaruan.");
  }
  openQueryInPlayground(sql) {
    window._lastPlaygroundQuery = sql;
    window.router.navigate('playground');
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
  window.app.init();
});
