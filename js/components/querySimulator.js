// Visual Query Simulator for DBLearn
// Provides step-by-step visual animation and explanation of what SQL queries do to tables.

import { sqlEngine } from '../sqlEngine.js';

export class QuerySimulator {
  /**
   * Generates step-by-step visual simulation of a query execution
   * @param {string} rawSql
   * @param {object} currentDb
   * @returns {object} Simulation details including HTML steps and result table
   */
  static simulate(rawSql, currentDb) {
    const cleaned = (rawSql || '').trim().replace(/;+$/, '').trim();
    if (!cleaned) {
      return {
        success: false,
        error: 'Masukkan query SQL terlebih dahulu untuk melihat simulasi visual.'
      };
    }

    const firstWord = cleaned.split(/\s+/)[0].toUpperCase();
    if (firstWord !== 'SELECT' && firstWord !== 'INSERT' && firstWord !== 'UPDATE' && firstWord !== 'DELETE') {
      return {
        success: false,
        error: `Simulasi visual saat ini mendukung SELECT, INSERT, UPDATE, dan DELETE.`
      };
    }

    // Execute query using real engine to verify validity and get actual result
    const execResult = sqlEngine.execute(cleaned);
    if (!execResult.success) {
      return {
        success: false,
        error: execResult.error
      };
    }

    const steps = [];

    if (firstWord === 'SELECT') {
      this.simulateSelect(cleaned, currentDb, execResult, steps);
    } else if (firstWord === 'INSERT') {
      this.simulateInsert(cleaned, currentDb, execResult, steps);
    } else if (firstWord === 'UPDATE') {
      this.simulateUpdate(cleaned, currentDb, execResult, steps);
    } else if (firstWord === 'DELETE') {
      this.simulateDelete(cleaned, currentDb, execResult, steps);
    }

    return {
      success: true,
      query: cleaned,
      steps,
      resultData: execResult.data,
      resultColumns: execResult.columns,
      affectedRows: execResult.affectedRows,
      durationMs: execResult.durationMs
    };
  }

  // --- Simulate SELECT ---
  static simulateSelect(sql, currentDb, execResult, steps) {
    // 1. FROM clause
    const fromMatch = sql.match(/FROM\s+([a-zA-Z0-9_]+)(?:\s+AS\s+([a-zA-Z0-9_]+)|\s+([a-zA-Z0-9_]+))?/i);
    const tableName = fromMatch ? fromMatch[1].toLowerCase() : null;
    const tableDef = tableName && currentDb.tables[tableName] ? currentDb.tables[tableName] : null;

    if (!tableName || !tableDef) {
      steps.push({
        title: 'Eksekusi Ekspresi SELECT Tanpa Tabel',
        badge: 'SELECT',
        badgeClass: 'badge-select',
        desc: 'Query ini mengevaluasi ekspresi nilai langsung tanpa membaca tabel fisik dari database.',
        html: `<div style="padding: 12px; background: #f8fafc; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">${sql}</div>`
      });
      return;
    }

    // STEP 1: FROM
    const sourceRows = tableDef.rows;
    const sourceCols = tableDef.columns;

    steps.push({
      title: `1. Membaca Tabel Sumber: '${tableName}'`,
      badge: 'FROM',
      badgeClass: 'badge-from',
      desc: `Database membuka tabel <strong>${tableName}</strong> dan memuat seluruh <strong>${sourceRows.length} baris</strong> data fisik ke memori kerja (RAM).`,
      html: this.renderTablePreview(sourceCols, sourceRows, tableName)
    });

    // STEP 2: JOIN (if present)
    const joinMatches = [...sql.matchAll(/(INNER\s+JOIN|LEFT\s+JOIN|JOIN)\s+([a-zA-Z0-9_]+)(?:\s+AS\s+([a-zA-Z0-9_]+)|\s+([a-zA-Z0-9_]+))?\s+ON\s+([a-zA-Z0-9_\.]+)\s*=\s*([a-zA-Z0-9_\.]+)/gi)];
    if (joinMatches.length > 0) {
      joinMatches.forEach((jm, idx) => {
        const joinTable = jm[2].toLowerCase();
        const joinCondition = `${jm[5]} = ${jm[6]}`;
        const joinedDef = currentDb.tables[joinTable];
        if (joinedDef) {
          steps.push({
            title: `${2 + idx}. Menghubungkan Tabel (JOIN): '${tableName}' 🔗 '${joinTable}'`,
            badge: 'JOIN',
            badgeClass: 'badge-join',
            desc: `Database mencocokkan setiap baris tabel <strong>${tableName}</strong> dengan tabel <strong>${joinTable}</strong> berdasarkan relasi Foreign Key: <code>${joinCondition}</code>.`,
            html: `
              <div style="margin-bottom: 10px; font-size: 0.825rem; color: #475569;">
                Tabel pasangan <strong>${joinTable}</strong> memiliki <strong>${joinedDef.rows.length} baris</strong>.
              </div>
              ${this.renderTablePreview(joinedDef.columns, joinedDef.rows, joinTable)}
            `
          });
        }
      });
    }

    // STEP 3: WHERE Filter
    const whereMatch = sql.match(/WHERE\s+([\s\S]+?)(?:\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) {
      const conditionStr = whereMatch[1].trim();
      const evaluatedRowsHtml = this.renderWhereEvaluation(tableDef, conditionStr, execResult.data);

      steps.push({
        title: `${steps.length + 1}. Penyaringan Baris Data (WHERE Filtering)`,
        badge: 'WHERE',
        badgeClass: 'badge-where',
        desc: `Kondisi filter: <code>${conditionStr}</code>. Database menguji setiap baris satu per satu. Baris yang memenuhi kriteria ditandai dengan <strong style="color: #059669;">✓ Lolos Filter</strong>, sedangkan baris lainnya diabaikan.`,
        html: evaluatedRowsHtml
      });
    }

    // STEP 4: GROUP BY (if present)
    const groupByMatch = sql.match(/GROUP\s+BY\s+([a-zA-Z0-9_\,\s]+?)(?:\s+HAVING|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (groupByMatch) {
      const groupCol = groupByMatch[1].trim();
      steps.push({
        title: `${steps.length + 1}. Pengelompokan Data (GROUP BY '${groupCol}')`,
        badge: 'GROUP BY',
        badgeClass: 'badge-join',
        desc: `Database mengelompokkan baris-baris data ke dalam 'ember kategori' (buckets) berdasarkan nilai kolom <strong>${groupCol}</strong> dan menghitung fungsi agregasi (COUNT, SUM, AVG, MIN, MAX).`,
        html: `
          <div style="padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px dashed var(--border-subtle); font-size: 0.85rem;">
            📊 Baris yang memiliki nilai <strong>${groupCol}</strong> yang sama disatukan menjadi 1 baris rangkuman per kategori.
          </div>
        `
      });
    }

    // STEP 5: SELECT Projection
    const selectColsMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
    const selectColsStr = selectColsMatch ? selectColsMatch[1].trim() : '*';

    steps.push({
      title: `${steps.length + 1}. Pemilihan Kolom & Format Hasil (SELECT Projection)`,
      badge: 'SELECT',
      badgeClass: 'badge-select',
      desc: `Database memproyeksikan hanya kolom-kolom yang diminta: <code>${selectColsStr}</code> untuk disajikan ke pengguna.`,
      html: `
        <div style="padding: 12px 16px; background: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0; color: #065f46; font-size: 0.85rem; font-weight: 600;">
          ✓ Berhasil menyusun <strong>${execResult.data ? execResult.data.length : 0} baris</strong> dan <strong>${execResult.columns ? execResult.columns.length : 0} kolom</strong> hasil query.
        </div>
      `
    });
  }

  // --- Simulate INSERT ---
  static simulateInsert(sql, currentDb, execResult, steps) {
    const insertMatch = sql.match(/INSERT\s+INTO\s+([a-zA-Z0-9_]+)/i);
    const tableName = insertMatch ? insertMatch[1].toLowerCase() : 'tabel';

    steps.push({
      title: `1. Menyiapkan Penambahan Baris Baru ke '${tableName}'`,
      badge: 'INSERT',
      badgeClass: 'badge-from',
      desc: `Database memeriksa struktur tabel <strong>${tableName}</strong>, validasi tipe data kolom, dan memastikan tidak ada duplikasi Primary Key.`,
      html: `<div style="padding: 12px; background: #fff7ed; border-left: 4px solid #ea580c; border-radius: 6px; font-size: 0.85rem;">${sql}</div>`
    });

    steps.push({
      title: `2. Menyimpan Data Baru Secara Permanen`,
      badge: 'COMMIT',
      badgeClass: 'badge-output',
      desc: `Satu baris baru berhasil ditambahkan ke dalam tabel <strong>${tableName}</strong>!`,
      html: `
        <div style="padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; color: #065f46; font-size: 0.85rem;">
          ✓ Sukses: 1 baris data baru ditambahkan ke tabel <strong>${tableName}</strong>.
        </div>
      `
    });
  }

  // --- Simulate UPDATE ---
  static simulateUpdate(sql, currentDb, execResult, steps) {
    const updateMatch = sql.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    const tableName = updateMatch ? updateMatch[1].toLowerCase() : 'tabel';
    const setClause = updateMatch ? updateMatch[2] : '';
    const whereClause = updateMatch && updateMatch[3] ? updateMatch[3] : 'SEMUA BARIS';

    steps.push({
      title: `1. Mencari Baris yang Memenuhi Kriteria UPDATE pada '${tableName}'`,
      badge: 'UPDATE',
      badgeClass: 'badge-where',
      desc: `Database memindai baris pada tabel <strong>${tableName}</strong> yang cocok dengan kondisi: <code>${whereClause}</code>.`,
      html: `<div style="padding: 12px; background: #fff7ed; border-left: 4px solid #ea580c; border-radius: 6px; font-size: 0.85rem;">${sql}</div>`
    });

    steps.push({
      title: `2. Memodifikasi Nilai Kolom (${setClause})`,
      badge: 'SET',
      badgeClass: 'badge-output',
      desc: `Database memperbarui nilai kolom sesuai perintah SET. Sebanyak <strong>${execResult.affectedRows} baris</strong> berhasil diubah nilainya.`,
      html: `
        <div style="padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; color: #065f46; font-size: 0.85rem;">
          ✓ Sukses: ${execResult.affectedRows} baris diperbarui pada tabel <strong>${tableName}</strong>.
        </div>
      `
    });
  }

  // --- Simulate DELETE ---
  static simulateDelete(sql, currentDb, execResult, steps) {
    const deleteMatch = sql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    const tableName = deleteMatch ? deleteMatch[1].toLowerCase() : 'tabel';
    const whereClause = deleteMatch && deleteMatch[2] ? deleteMatch[2] : 'SEMUA BARIS';

    steps.push({
      title: `1. Identifikasi Baris yang Dihapus pada '${tableName}'`,
      badge: 'DELETE',
      badgeClass: 'badge-where',
      desc: `Database mencari baris yang memenuhi kondisi: <code>${whereClause}</code>.`,
      html: `<div style="padding: 12px; background: #fef2f2; border-left: 4px solid #dc2626; border-radius: 6px; font-size: 0.85rem;">${sql}</div>`
    });

    steps.push({
      title: `2. Menghapus Baris dari Database`,
      badge: 'PURGE',
      badgeClass: 'badge-output',
      desc: `Sebanyak <strong>${execResult.affectedRows} baris</strong> telah dihapus dari tabel <strong>${tableName}</strong>.`,
      html: `
        <div style="padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; color: #065f46; font-size: 0.85rem;">
          ✓ Sukses: ${execResult.affectedRows} baris dihapus dari tabel <strong>${tableName}</strong>.
        </div>
      `
    });
  }

  // --- Helper: Render Table Preview ---
  static renderTablePreview(cols, rows, tableName) {
    if (!cols || !rows) return '';
    const thead = cols.map(c => `
      <th>
        ${c.name}
        ${c.pk ? ' <span class="badge-pk">🔑 PK</span>' : ''}
        ${c.fk ? ` <span class="badge-fk">🔗 FK</span>` : ''}
      </th>
    `).join('');

    const tbody = rows.map(r => `
      <tr>
        ${cols.map(c => `<td>${r[c.name] !== undefined ? r[c.name] : ''}</td>`).join('')}
      </tr>
    `).join('');

    return `
      <div style="overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: 8px; margin-top: 8px;">
        <table class="table-sql">
          <thead><tr>${thead}</tr></thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
  }

  // --- Helper: Render WHERE Row-by-row Evaluation ---
  static renderWhereEvaluation(tableDef, conditionStr, matchedRows) {
    const cols = tableDef.columns;
    const allRows = tableDef.rows;

    // Determine matching rows by checking primary key or identity
    const pkCol = (cols.find(c => c.pk) || cols[0]).name;
    const matchedKeys = new Set((matchedRows || []).map(r => String(r[pkCol])));

    const thead = `
      <th>Status Filter</th>
      ${cols.map(c => `<th>${c.name}</th>`).join('')}
    `;

    const tbody = allRows.map(r => {
      const isMatched = matchedKeys.has(String(r[pkCol]));
      const rowClass = isMatched ? 'row-match' : 'row-discard';
      const badgeHtml = isMatched
        ? `<span class="tag-match">✓ Lolos Filter</span>`
        : `<span class="tag-discard">✗ Tereliminasi</span>`;

      return `
        <tr class="${rowClass}">
          <td style="font-weight: 700;">${badgeHtml}</td>
          ${cols.map(c => `<td>${r[c.name] !== undefined ? r[c.name] : ''}</td>`).join('')}
        </tr>
      `;
    }).join('');

    return `
      <div style="overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: 8px; margin-top: 8px;">
        <table class="table-sql">
          <thead><tr>${thead}</tr></thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
  }
}
