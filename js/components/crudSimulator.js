// Fullstack Web CRUD Interactive Pipeline Simulator
// Designed for ITENAS Pemrograman Basis Data (Pertemuan 8 - 14)
import { state } from '../state.js';

let lastPipelineTrace = {
  action: 'READ (Initial Load)',
  method: 'GET',
  url: '/api/mahasiswa',
  status: 200,
  statusText: 'OK',
  durationMs: '1.45',
  requestBody: null,
  routeHandler: `router.get('/mahasiswa', async (req, res) => {
  const result = await db.query('SELECT nim, nama, jurusan, angkatan, ipk FROM mahasiswa ORDER BY nim ASC');
  res.status(200).json({ success: true, total: result.rowCount, data: result.rows });
});`,
  sqlQuery: 'SELECT nim, nama, jurusan, angkatan, ipk FROM mahasiswa ORDER BY nim ASC;',
  sqlParams: [],
  responseBody: {
    success: true,
    total: 18,
    message: 'Data mahasiswa berhasil dimuat'
  },
  clientDomAction: 'mhsTableBody.innerHTML = json.data.map(renderRow).join("");'
};

export function renderCrudSimulator(meetingId = 8) {
  const dbs = state.getDatabases();
  const db = dbs.akademik || Object.values(dbs)[0];
  const mhsTable = db && db.tables && db.tables.mahasiswa ? db.tables.mahasiswa : { rows: [] };
  const rows = mhsTable.rows || [];

  return `
    <div class="crud-simulator-container card" style="padding: 28px 32px; margin: 32px 0; background: #ffffff; border: 2px solid var(--primary-subtle-border); box-shadow: 0 10px 25px -5px rgba(234,88,12,0.08);">
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 14px; border-bottom: 1.5px solid var(--border-base); padding-bottom: 16px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--primary-subtle); color: var(--primary); font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Live Simulator Praktikum
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin: 0;">
            Interactive Fullstack Web CRUD Pipeline
          </h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin: 4px 0 0 0;">
            Uji coba operasi <strong>Create, Read, Update, Delete</strong> dan pantau aliran data dari antarmuka Web ➔ HTTP REST API ➔ Prepared Statement SQL ➔ Database secara langsung.
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <button class="btn btn-primary btn-sm" onclick="window.crudSim.openModal('create')" style="padding: 8px 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Tambah Mahasiswa (POST)
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.crudSim.refreshData()" title="Segarkan Data" style="padding: 8px 12px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          </button>
        </div>
      </div>

      <!-- Controls: Filter & Search -->
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 220px; position: relative;">
          <input 
            type="text" 
            id="crudSimSearchInput" 
            placeholder="🔍 Cari berdasarkan NIM atau Nama mahasiswa..." 
            oninput="window.crudSim.handleSearch(this.value)"
            style="width: 100%; padding: 9px 14px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem; background: var(--bg-secondary); color: var(--text-main); font-family: 'Inter', sans-serif;"
          />
        </div>
        <select 
          id="crudSimProdiFilter" 
          onchange="window.crudSim.handleProdiFilter(this.value)"
          style="padding: 9px 14px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem; background: var(--bg-secondary); color: var(--text-main); font-weight: 600; cursor: pointer;"
        >
          <option value="">Semua Jurusan / Prodi</option>
          <option value="Informatika">Informatika</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
          <option value="Teknik Komputer">Teknik Komputer</option>
        </select>
      </div>

      <!-- Interactive Web Table -->
      <div style="overflow-x: auto; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); margin-bottom: 24px; background: #ffffff;">
        <table class="table-sql" style="width: 100%; font-size: 0.875rem; margin: 0;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1.5px solid var(--border-base);">
              <th style="padding: 10px 14px; text-align: left; width: 60px;">No</th>
              <th style="padding: 10px 14px; text-align: left;">NIM</th>
              <th style="padding: 10px 14px; text-align: left;">Nama Mahasiswa</th>
              <th style="padding: 10px 14px; text-align: left;">Jurusan</th>
              <th style="padding: 10px 14px; text-align: center;">Angkatan</th>
              <th style="padding: 10px 14px; text-align: center;">IPK</th>
              <th style="padding: 10px 14px; text-align: center; width: 140px;">Aksi (Action)</th>
            </tr>
          </thead>
          <tbody id="crudSimTableBody">
            ${renderTableRows(rows)}
          </tbody>
        </table>
      </div>

      <!-- Live Fullstack Pipeline Inspector Panel -->
      <div style="background: #0f172a; border-radius: var(--radius-md); padding: 20px 24px; color: #f8fafc; border: 1px solid #334155;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; box-shadow: 0 0 8px #22c55e;"></span>
              Live Pipeline Inspector
            </span>
            <span style="font-size: 0.775rem; color: #94a3b8;">Aksi Terakhir: <strong style="color: #fde047;" id="crudTraceAction">${lastPipelineTrace.action}</strong></span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge" id="crudTraceMethodBadge" style="background: ${getMethodColor(lastPipelineTrace.method)}; color: white; font-weight: 800; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px;">
              ${lastPipelineTrace.method}
            </span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; color: #cbd5e1;" id="crudTraceUrl">
              ${lastPipelineTrace.url}
            </span>
            <span class="badge" id="crudTraceStatusBadge" style="background: #059669; color: white; font-weight: 700; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px;">
              ${lastPipelineTrace.status} ${lastPipelineTrace.statusText} (${lastPipelineTrace.durationMs}ms)
            </span>
          </div>
        </div>

        <!-- 3-Column Stepper Pipeline -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <!-- Step 1: HTTP Network Layer -->
          <div style="background: #1e293b; border-radius: var(--radius-sm); padding: 14px; border: 1px solid #334155;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span>1. HTTP Request & Response</span>
              <span style="font-size: 0.7rem; color: #94a3b8;">REST Client</span>
            </div>
            <div style="font-size: 0.775rem; font-family: 'JetBrains Mono', monospace; color: #cbd5e1; line-height: 1.6;">
              <div style="color: #fb923c; margin-bottom: 4px;">Payload Request Body:</div>
              <pre id="crudTracePayload" style="margin: 0 0 10px 0; background: #090d16; padding: 8px; border-radius: 4px; overflow-x: auto; color: #93c5fd; max-height: 100px;">${escapeHtml(JSON.stringify(lastPipelineTrace.requestBody || { info: 'Tidak ada payload (GET request)' }, null, 2))}</pre>
              <div style="color: #4ade80; margin-bottom: 4px;">Response JSON:</div>
              <pre id="crudTraceResponse" style="margin: 0; background: #090d16; padding: 8px; border-radius: 4px; overflow-x: auto; color: #86efac; max-height: 100px;">${escapeHtml(JSON.stringify(lastPipelineTrace.responseBody, null, 2))}</pre>
            </div>
          </div>

          <!-- Step 2: Express Controller & Prepared SQL -->
          <div style="background: #1e293b; border-radius: var(--radius-sm); padding: 14px; border: 1px solid #334155;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span>2. Express & Prepared SQL</span>
              <span style="font-size: 0.7rem; color: #94a3b8;">Backend API</span>
            </div>
            <div style="font-size: 0.775rem; font-family: 'JetBrains Mono', monospace; color: #cbd5e1; line-height: 1.6;">
              <div style="color: #fde047; margin-bottom: 4px;">SQL Query Terparameterisasi:</div>
              <pre id="crudTraceSql" style="margin: 0 0 10px 0; background: #090d16; padding: 8px; border-radius: 4px; overflow-x: auto; color: #fde047; max-height: 100px; white-space: pre-wrap;">${escapeHtml(lastPipelineTrace.sqlQuery)}</pre>
              <div style="color: #a78bfa; margin-bottom: 4px;">Query Parameters:</div>
              <pre id="crudTraceParams" style="margin: 0; background: #090d16; padding: 8px; border-radius: 4px; overflow-x: auto; color: #c4b5fd; max-height: 100px;">${escapeHtml(JSON.stringify(lastPipelineTrace.sqlParams))}</pre>
            </div>
          </div>

          <!-- Step 3: Database Engine & DOM Update -->
          <div style="background: #1e293b; border-radius: var(--radius-sm); padding: 14px; border: 1px solid #334155;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span>3. Database & DOM Sync</span>
              <span style="font-size: 0.7rem; color: #94a3b8;">Frontend UI</span>
            </div>
            <div style="font-size: 0.775rem; font-family: 'JetBrains Mono', monospace; color: #cbd5e1; line-height: 1.6;">
              <div style="color: #34d399; margin-bottom: 4px;">Database Status:</div>
              <div style="background: #090d16; padding: 8px; border-radius: 4px; margin-bottom: 10px; color: #a7f3d0;">
                ✓ ACID Transaction: <strong style="color: #4ade80;">COMMITTED</strong><br>
                ✓ Engine: <strong style="color: #67e8f9;">In-Memory Relational</strong><br>
                ✓ Duration: <strong style="color: #fde047;" id="crudTraceDbDuration">${lastPipelineTrace.durationMs} ms</strong>
              </div>
              <div style="color: #38bdf8; margin-bottom: 4px;">Client DOM Reactive Update:</div>
              <pre id="crudTraceDom" style="margin: 0; background: #090d16; padding: 8px; border-radius: 4px; overflow-x: auto; color: #7dd3fc; max-height: 75px; white-space: pre-wrap;">${escapeHtml(lastPipelineTrace.clientDomAction)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form Mahasiswa (CREATE & UPDATE) -->
    <div id="crudSimModal" style="display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); align-items: center; justify-content: center; padding: 16px;">
      <div style="background: #ffffff; border-radius: var(--radius-md); max-width: 520px; width: 100%; padding: 28px 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); border: 2px solid var(--primary-subtle-border);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1.5px solid var(--border-base); padding-bottom: 14px;">
          <h4 id="crudSimModalTitle" style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin: 0;">
            + Tambah Mahasiswa Baru (POST)
          </h4>
          <button onclick="window.crudSim.closeModal()" style="background: none; border: none; font-size: 1.4rem; color: var(--text-dim); cursor: pointer; line-height: 1;">&times;</button>
        </div>

        <form id="crudSimForm" onsubmit="window.crudSim.handleSubmit(event)">
          <input type="hidden" id="crudSimFormMode" value="create">
          
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">NIM (Primary Key) *</label>
              <input type="text" id="mhsInputNim" required placeholder="Contoh: 152022099" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem; font-family: 'JetBrains Mono', monospace;">
              <span id="mhsNimHint" style="font-size: 0.725rem; color: var(--text-muted); display: none;">NIM tidak dapat diubah pada operasi UPDATE.</span>
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Nama Lengkap *</label>
              <input type="text" id="mhsInputNama" required placeholder="Contoh: Mahasiswa ITENAS" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Jurusan / Prodi *</label>
                <select id="mhsInputJurusan" required style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem;">
                  <option value="Informatika">Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Teknik Komputer">Teknik Komputer</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Angkatan *</label>
                <input type="number" id="mhsInputAngkatan" required value="2024" min="2018" max="2027" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem;">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
              <div>
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">IPK (0.00 - 4.00)</label>
                <input type="number" step="0.01" id="mhsInputIpk" value="3.50" min="0" max="4" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem;">
              </div>

              <div>
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Email</label>
                <input type="email" id="mhsInputEmail" placeholder="mhs@student.itenas.ac.id" style="width: 100%; padding: 8px 12px; border: 1.5px solid var(--border-base); border-radius: var(--radius-sm); font-size: 0.875rem;">
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border-base); padding-top: 16px;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.crudSim.closeModal()">Batal</button>
            <button type="submit" class="btn btn-primary btn-sm" id="crudSimSubmitBtn" style="padding: 8px 18px; font-weight: 700;">Simpan Data (POST)</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderTableRows(rows) {
  if (!rows || rows.length === 0) {
    return `<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">Tidak ada data mahasiswa ditemukan.</td></tr>`;
  }

  return rows.map((r, i) => `
    <tr id="mhs-row-${r.nim}" style="border-bottom: 1px solid var(--border-subtle); transition: background 0.3s ease;">
      <td style="padding: 10px 14px; color: var(--text-dim); font-size: 0.8rem;">${i + 1}</td>
      <td style="padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--primary);">${r.nim}</td>
      <td style="padding: 10px 14px; font-weight: 600; color: var(--text-main);">${r.nama}</td>
      <td style="padding: 10px 14px;"><span class="badge" style="background: var(--bg-tertiary); color: var(--text-main); border: 1px solid var(--border-base); font-size: 0.775rem;">${r.jurusan || 'Informatika'}</span></td>
      <td style="padding: 10px 14px; text-align: center; color: var(--text-dim);">${r.angkatan || 2023}</td>
      <td style="padding: 10px 14px; text-align: center; font-weight: 700; color: var(--accent-emerald);">${parseFloat(r.ipk || 0).toFixed(2)}</td>
      <td style="padding: 10px 14px; text-align: center;">
        <div style="display: inline-flex; gap: 6px;">
          <button 
            class="btn btn-secondary btn-sm" 
            style="padding: 4px 8px; font-size: 0.75rem; border-color: var(--primary-border); color: var(--primary);"
            onclick="window.crudSim.openModal('edit', '${r.nim}')"
            title="Ubah Data (PUT /api/mahasiswa/:nim)"
          >
            Edit
          </button>
          <button 
            class="btn btn-secondary btn-sm" 
            style="padding: 4px 8px; font-size: 0.75rem; border-color: #fecaca; color: #dc2626;"
            onclick="window.crudSim.handleDelete('${r.nim}', '${escapeHtml(r.nama)}')"
            title="Hapus Data (DELETE /api/mahasiswa/:nim)"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function getMethodColor(method) {
  switch (method) {
    case 'POST': return '#ea580c';
    case 'PUT': return '#0284c7';
    case 'DELETE': return '#dc2626';
    case 'GET':
    default: return '#059669';
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Controller Methods Attached to Window for Global Browser Interactions
if (typeof window !== 'undefined') {
  window.crudSim = {
    openModal(mode, nim = null) {
      const modal = document.getElementById('crudSimModal');
      const title = document.getElementById('crudSimModalTitle');
      const formMode = document.getElementById('crudSimFormMode');
      const submitBtn = document.getElementById('crudSimSubmitBtn');
      const inputNim = document.getElementById('mhsInputNim');
      const inputNama = document.getElementById('mhsInputNama');
      const inputJurusan = document.getElementById('mhsInputJurusan');
      const inputAngkatan = document.getElementById('mhsInputAngkatan');
      const inputIpk = document.getElementById('mhsInputIpk');
      const inputEmail = document.getElementById('mhsInputEmail');
      const nimHint = document.getElementById('mhsNimHint');

      if (!modal) return;
      formMode.value = mode;

      if (mode === 'create') {
        title.innerText = '+ Tambah Mahasiswa Baru (POST /api/mahasiswa)';
        submitBtn.innerText = 'Kirim Data (POST)';
        submitBtn.style.background = 'var(--primary)';
        inputNim.readOnly = false;
        inputNim.style.background = '#ffffff';
        nimHint.style.display = 'none';

        inputNim.value = '';
        inputNama.value = '';
        inputJurusan.value = 'Informatika';
        inputAngkatan.value = 2024;
        inputIpk.value = '3.50';
        inputEmail.value = '';
      } else {
        // Edit Mode
        const dbs = state.getDatabases();
        const rows = (dbs.akademik && dbs.akademik.tables.mahasiswa) ? dbs.akademik.tables.mahasiswa.rows : [];
        const m = rows.find(r => r.nim === nim);
        if (!m) return;

        title.innerText = `✏️ Edit Data Mahasiswa (PUT /api/mahasiswa/${nim})`;
        submitBtn.innerText = 'Perbarui Data (PUT)';
        submitBtn.style.background = '#0284c7';
        inputNim.readOnly = true;
        inputNim.style.background = '#f1f5f9';
        nimHint.style.display = 'block';

        inputNim.value = m.nim;
        inputNama.value = m.nama;
        inputJurusan.value = m.jurusan || 'Informatika';
        inputAngkatan.value = m.angkatan || 2022;
        inputIpk.value = m.ipk || 3.50;
        inputEmail.value = m.email || '';
      }

      modal.style.display = 'flex';
    },

    closeModal() {
      const modal = document.getElementById('crudSimModal');
      if (modal) modal.style.display = 'none';
    },

    handleSubmit(event) {
      event.preventDefault();
      const mode = document.getElementById('crudSimFormMode').value;
      const nim = document.getElementById('mhsInputNim').value.trim();
      const nama = document.getElementById('mhsInputNama').value.trim();
      const jurusan = document.getElementById('mhsInputJurusan').value;
      const angkatan = parseInt(document.getElementById('mhsInputAngkatan').value, 10);
      const ipk = parseFloat(document.getElementById('mhsInputIpk').value) || 0;
      const email = document.getElementById('mhsInputEmail').value.trim();

      const dbs = state.getDatabases();
      if (!dbs.akademik || !dbs.akademik.tables.mahasiswa) return;
      const rows = dbs.akademik.tables.mahasiswa.rows;

      const startTime = performance.now();

      if (mode === 'create') {
        // Cek duplikasi Primary Key
        if (rows.some(r => r.nim === nim)) {
          alert(`❌ Gagal: NIM '${nim}' sudah terdaftar dalam sistem (Unique Primary Key Constraint)!`);
          return;
        }

        const newRow = { nim, nama, jurusan, angkatan, ipk, email };
        rows.unshift(newRow);
        state.saveDatabases(dbs);

        const duration = (performance.now() - startTime).toFixed(2);
        this.updatePipelineInspector({
          action: 'CREATE (Penambahan Data)',
          method: 'POST',
          url: '/api/mahasiswa',
          status: 201,
          statusText: 'Created',
          durationMs: duration,
          requestBody: newRow,
          sqlQuery: 'INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
          sqlParams: [nim, nama, jurusan, angkatan, ipk, email],
          responseBody: {
            success: true,
            message: `Mahasiswa ${nama} berhasil disimpan!`,
            data: newRow
          },
          clientDomAction: `mhsTableBody.insertAdjacentHTML('afterbegin', renderRow(newRow));`
        });

        this.closeModal();
        this.refreshTable(rows);
        this.highlightRow(nim);
      } else {
        // Update Mode
        const index = rows.findIndex(r => r.nim === nim);
        if (index === -1) {
          alert('Mahasiswa tidak ditemukan.');
          return;
        }

        rows[index] = { ...rows[index], nama, jurusan, angkatan, ipk, email };
        state.saveDatabases(dbs);

        const duration = (performance.now() - startTime).toFixed(2);
        this.updatePipelineInspector({
          action: `UPDATE (Pembaruan Data ${nim})`,
          method: 'PUT',
          url: `/api/mahasiswa/${nim}`,
          status: 200,
          statusText: 'OK',
          durationMs: duration,
          requestBody: { nama, jurusan, angkatan, ipk, email },
          sqlQuery: 'UPDATE mahasiswa SET nama = $1, jurusan = $2, angkatan = $3, ipk = $4, email = $5 WHERE nim = $6 RETURNING *;',
          sqlParams: [nama, jurusan, angkatan, ipk, email, nim],
          responseBody: {
            success: true,
            message: `Data mahasiswa ${nim} berhasil diperbarui!`,
            data: rows[index]
          },
          clientDomAction: `updateRowInDom('${nim}', updatedData);`
        });

        this.closeModal();
        this.refreshTable(rows);
        this.highlightRow(nim);
      }
    },

    handleDelete(nim, nama) {
      const confirmed = confirm(`⚠️ Konfirmasi Penghapusan:\nApakah Anda yakin ingin menghapus mahasiswa ${nama} (${nim}) dari database?`);
      if (!confirmed) return;

      const dbs = state.getDatabases();
      if (!dbs.akademik || !dbs.akademik.tables.mahasiswa) return;
      const rows = dbs.akademik.tables.mahasiswa.rows;

      const startTime = performance.now();
      const index = rows.findIndex(r => r.nim === nim);
      if (index === -1) return;

      const deletedRow = rows.splice(index, 1)[0];
      state.saveDatabases(dbs);

      const duration = (performance.now() - startTime).toFixed(2);
      this.updatePipelineInspector({
        action: `DELETE (Penghapusan Data ${nim})`,
        method: 'DELETE',
        url: `/api/mahasiswa/${nim}`,
        status: 200,
        statusText: 'OK',
        durationMs: duration,
        requestBody: null,
        sqlQuery: 'DELETE FROM mahasiswa WHERE nim = $1 RETURNING *;',
        sqlParams: [nim],
        responseBody: {
          success: true,
          message: `Mahasiswa ${nama} (${nim}) berhasil dihapus dari database`
        },
        clientDomAction: `document.getElementById('mhs-row-${nim}').remove();`
      });

      this.refreshTable(rows);
    },

    handleSearch(query) {
      const q = (query || '').toLowerCase().trim();
      const dbs = state.getDatabases();
      const rows = (dbs.akademik && dbs.akademik.tables.mahasiswa) ? dbs.akademik.tables.mahasiswa.rows : [];
      const filtered = rows.filter(r => 
        (r.nim && r.nim.toLowerCase().includes(q)) || 
        (r.nama && r.nama.toLowerCase().includes(q))
      );

      this.updatePipelineInspector({
        action: 'READ (Pencarian Data / Filter)',
        method: 'GET',
        url: `/api/mahasiswa?search=${encodeURIComponent(q)}`,
        status: 200,
        statusText: 'OK',
        durationMs: '0.95',
        requestBody: null,
        sqlQuery: 'SELECT * FROM mahasiswa WHERE nama ILIKE $1 OR nim ILIKE $1 ORDER BY nim ASC;',
        sqlParams: [`%${q}%`],
        responseBody: {
          success: true,
          total: filtered.length,
          data: filtered.slice(0, 5)
        },
        clientDomAction: `renderTableRows(filteredData); // ${filtered.length} baris cocok`
      });

      this.refreshTable(filtered);
    },

    handleProdiFilter(prodi) {
      const dbs = state.getDatabases();
      const rows = (dbs.akademik && dbs.akademik.tables.mahasiswa) ? dbs.akademik.tables.mahasiswa.rows : [];
      const filtered = prodi ? rows.filter(r => r.jurusan === prodi) : rows;

      this.updatePipelineInspector({
        action: `READ (Filter Jurusan: ${prodi || 'Semua'})`,
        method: 'GET',
        url: prodi ? `/api/mahasiswa?jurusan=${encodeURIComponent(prodi)}` : '/api/mahasiswa',
        status: 200,
        statusText: 'OK',
        durationMs: '0.88',
        requestBody: null,
        sqlQuery: prodi ? 'SELECT * FROM mahasiswa WHERE jurusan = $1 ORDER BY nim ASC;' : 'SELECT * FROM mahasiswa ORDER BY nim ASC;',
        sqlParams: prodi ? [prodi] : [],
        responseBody: {
          success: true,
          total: filtered.length,
          data: filtered.slice(0, 5)
        },
        clientDomAction: `renderTableRows(filteredByProdi); // ${filtered.length} baris`
      });

      this.refreshTable(filtered);
    },

    refreshData() {
      const dbs = state.getDatabases();
      const rows = (dbs.akademik && dbs.akademik.tables.mahasiswa) ? dbs.akademik.tables.mahasiswa.rows : [];
      const searchInput = document.getElementById('crudSimSearchInput');
      const prodiFilter = document.getElementById('crudSimProdiFilter');
      if (searchInput) searchInput.value = '';
      if (prodiFilter) prodiFilter.value = '';

      this.updatePipelineInspector({
        action: 'READ (Refresh Data)',
        method: 'GET',
        url: '/api/mahasiswa',
        status: 200,
        statusText: 'OK',
        durationMs: '1.12',
        requestBody: null,
        sqlQuery: 'SELECT * FROM mahasiswa ORDER BY nim ASC;',
        sqlParams: [],
        responseBody: {
          success: true,
          total: rows.length,
          data: rows.slice(0, 5)
        },
        clientDomAction: 'mhsTableBody.innerHTML = renderTableRows(allRows);'
      });

      this.refreshTable(rows);
    },

    refreshTable(rows) {
      const tbody = document.getElementById('crudSimTableBody');
      if (tbody) {
        tbody.innerHTML = renderTableRows(rows);
      }
    },

    highlightRow(nim) {
      setTimeout(() => {
        const row = document.getElementById(`mhs-row-${nim}`);
        if (row) {
          row.style.background = '#ffedd5';
          setTimeout(() => {
            row.style.background = '';
          }, 1800);
        }
      }, 50);
    },

    updatePipelineInspector(trace) {
      lastPipelineTrace = trace;
      const elAction = document.getElementById('crudTraceAction');
      const elMethod = document.getElementById('crudTraceMethodBadge');
      const elUrl = document.getElementById('crudTraceUrl');
      const elStatus = document.getElementById('crudTraceStatusBadge');
      const elPayload = document.getElementById('crudTracePayload');
      const elResponse = document.getElementById('crudTraceResponse');
      const elSql = document.getElementById('crudTraceSql');
      const elParams = document.getElementById('crudTraceParams');
      const elDom = document.getElementById('crudTraceDom');
      const elDbDur = document.getElementById('crudTraceDbDuration');

      if (elAction) elAction.innerText = trace.action;
      if (elMethod) {
        elMethod.innerText = trace.method;
        elMethod.style.background = getMethodColor(trace.method);
      }
      if (elUrl) elUrl.innerText = trace.url;
      if (elStatus) {
        elStatus.innerText = `${trace.status} ${trace.statusText} (${trace.durationMs}ms)`;
        elStatus.style.background = trace.status >= 200 && trace.status < 300 ? '#059669' : '#dc2626';
      }
      if (elPayload) elPayload.innerText = JSON.stringify(trace.requestBody || { info: 'Tidak ada payload (GET request)' }, null, 2);
      if (elResponse) elResponse.innerText = JSON.stringify(trace.responseBody, null, 2);
      if (elSql) elSql.innerText = trace.sqlQuery;
      if (elParams) elParams.innerText = JSON.stringify(trace.sqlParams);
      if (elDom) elDom.innerText = trace.clientDomAction;
      if (elDbDur) elDbDur.innerText = `${trace.durationMs} ms`;
    }
  };
}
